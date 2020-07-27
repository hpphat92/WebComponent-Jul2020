const template = `
  <template id="StarContainer">
    <svg class="star-item"
        width="255" height="240" viewBox="0 0 51 48">
        <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
    </svg>
</template>  
    <div class="star-rating-container">
    </div>
   <style>
      .star-rating-container {
          display: flex;
      }
      
      .star-rating-container .star {
          width: 20px;
          height: 20px;
      }
      
      
      .star-rating-container .star {
          width: 20px;
          height: 20px;
      }
      .star-rating-container .star.star-rated .star-item {
          fill: blue;
      }
      
      .star-rating-container .star .star-item{
         width: 100%;
         height: 100%;
         stroke: #aaa;
         cursor: pointer;
         fill: none;
      }

  </style>
`;

class StarRating extends HTMLElement {
  constructor() {
    super();
    this.numberOfStar = 5;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['max'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'max':
      this.numberOfStar = +newValue;
      this.render();
      break;
    }
  }

  render() {
    if (!this._shadowRoot) {
      this._shadowRoot = this.attachShadow({ mode: 'open' });
    }
    this._shadowRoot.innerHTML = template;
    this.renderStars(this.numberOfStar);
  }

  renderStars(amountStars) {
    const starContainer = this._shadowRoot.querySelector('.star-rating-container');
    if (!starContainer) {
      return;
    }
    starContainer.innerHTML = '';
    for (let i = 0; i < amountStars; i++) {
      starContainer.appendChild(this.createStar(i));
    }
  }

  createStar(index) {
    const starTemplate = this._shadowRoot.querySelector('#StarContainer');
    if (!starTemplate) {
      return;
    }

    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = starTemplate.innerHTML;
    star.addEventListener('click', () => {
      this.setSelected(index);
      this.dispatchEvent(new CustomEvent('rated', {
        detail: {
          itemClicked: index
        }
      }));
    });
    return star;
  }

  setSelected(index) {
    const STAR_RATED_CLASSNAME = 'star-rated';
    const starRated = this._shadowRoot.querySelectorAll('.star-rated');
    starRated && starRated.forEach(it => it.classList.remove(STAR_RATED_CLASSNAME));

    const starList = this._shadowRoot.querySelectorAll('.star');

    if (starList && starList.length && starList[index]) {
      for (let idx = 0; idx <= index; idx++) {
        starList[idx].classList.add(STAR_RATED_CLASSNAME);
      }
    }
  }
}

customElements.define('star-rating', StarRating);

