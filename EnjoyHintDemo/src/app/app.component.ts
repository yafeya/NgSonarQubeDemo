import { Component, Inject, OnInit } from '@angular/core';
import * as Services from '../services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    @Inject(Services.TourServiceToken) private tourService: Services.ITourService){

  }

  ngOnInit(): void {
    this.tourService.Run([
      { Event: 'next', Selector: '#button1', Description: 'This is button1, test, nothing will happen, if you click.', ShowSkip: true, ShowNext: true },
      { Event: 'next', Selector: '#button2', Description: 'This is button2, test, nothing will happen, if you click.', ShowSkip: false, ShowNext: true },
      { Event: 'click', Selector: '#button3', Description: 'This is button3, test, nothing will happen, if you click.', ShowSkip: false }
    ])
  }
}
