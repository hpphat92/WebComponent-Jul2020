import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  function addEventListenerForStar() {
    const starRating = starRatingRef.current;
    if (!starRating) {
      return;
    }
    starRating.addEventListener('rated', (e) => {
      const { itemClicked } = e.detail;
      setItemClicked(itemClicked + 1);
    })
  }

  const [maxStar, setMaxStar] = useState(10);
  const [itemClicked, setItemClicked] = useState(0);
  const starRatingRef = React.createRef();

  useEffect(() => {
    addEventListenerForStar();
  });

  return (
    <div className="App">
      Hello This is react App
      <star-rating ref={ starRatingRef } max={ maxStar }></star-rating>
      <h5>You clicked on { itemClicked }</h5>
      <button onClick={ setMaxStar.bind(this, [20]) }>Set to 20</button>
    </div>
  );
}

export default App;
