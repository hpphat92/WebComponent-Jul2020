import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  title = 'This is Angular project using star';
  itemClicked = 0;
  amountStar = 4;

  @ViewChild('starRating', { read: ElementRef, static: false })
  public starRating;

  public onRating({ detail }) {
    this.itemClicked = detail.itemClicked + 1;
  }

  public setRatingAmount(numRatings): void {
    this.amountStar = numRatings;
  }

  public ngAfterViewInit(): void {
  }
}
