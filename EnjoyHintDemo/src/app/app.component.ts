import { Component, Inject, OnInit } from '@angular/core';
import * as Services from '../services/index';
import * as Calculate from 'calculator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  private mNumber1: number = 10;
  private mNumber2: number = 20;
  private mResults: string = '';

  constructor(
    @Inject(Services.TourServiceToken) private tourService: Services.ITourService,
    @Inject(Calculate.ICalculateServiceToken) private calculateService: Calculate.ICalculateService
  ) {
  }

  ngOnInit(): void {
    this.tourService.Run([
      { Event: 'next', Selector: '#button1', Description: 'This is button1, test, nothing will happen, if you click.', ShowSkip: true, ShowNext: true },
      { Event: 'next', Selector: '#button2', Description: 'This is button2, test, nothing will happen, if you click.', ShowSkip: true, ShowNext: true },
      { Event: 'next', Selector: '#button3', Description: 'This is button3, test, nothing will happen, if you click.', ShowSkip: false, ShowNext: true },
      { Event: 'click', Selector: '#btn-calculate', Description: 'This is the button the calculate, click it to get the calculation result.', ShowSkip: false }
    ]);
  }

  get Number1(): number {
    return this.mNumber1;
  }

  set Number1(value: number) {
    this.mNumber1 = value;
  }

  get Number2(): number {
    return this.mNumber2;
  }

  set Number2(value: number) {
    this.mNumber2 = value;
  }

  get Results(): string {
    return this.mResults;
  }

  set Results(value: string) {
    this.mResults = value;
  }

  GetCalculateResults() {
    let add = this.calculateService.Add(Number(this.Number1), Number(this.Number2));
    let sub = this.calculateService.Substract(Number(this.Number1), Number(this.Number2));
    let mul = this.calculateService.Multipy(Number(this.Number1), Number(this.Number2));
    let div = this.calculateService.Divide(Number(this.Number1), Number(this.Number2));

    let add_result = `${this.Number1} + ${this.Number2} = ${add}\n`;
    let sub_result = `${this.Number1} - ${this.Number2} = ${sub}\n`;
    let mul_result = `${this.Number1} * ${this.Number2} = ${mul}\n`;
    let div_result = `${this.Number1} / ${this.Number2} = ${div}\n`;
    this.Results = add_result + sub_result + mul_result + div_result;
  }
}
