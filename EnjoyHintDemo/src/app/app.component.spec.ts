import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CalculateService, CalculatorModule } from 'calculator';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import * as Services from '../services/index'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [FormsModule, CalculatorModule, BrowserModule],
      providers: [{provide: Services.TourServiceToken, useClass: Services.TourService}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  it('Number1 Test', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.Number1 = 100;
    expect(app.Number1).toBe(100);
  }));
  it('Number2 Test', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.Number2 = 60;
    expect(app.Number2).toBe(60);
  }));
  it('GetCalculateResults Test', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.Number1 = 100;
    app.Number2 = 50;
    app.GetCalculateResults();
    let calculator = new CalculateService();
    let add = calculator.Add(Number(app.Number1), Number(app.Number2));
    let sub = calculator.Substract(Number(app.Number1), Number(app.Number2));
    let mul = calculator.Multipy(Number(app.Number1), Number(app.Number2));
    let div = calculator.Divide(Number(app.Number1), Number(app.Number2));

    let add_result = `${app.Number1} + ${app.Number2} = ${add}\n`;
    let sub_result = `${app.Number1} - ${app.Number2} = ${sub}\n`;
    let mul_result = `${app.Number1} * ${app.Number2} = ${mul}\n`;
    let div_result = `${app.Number1} / ${app.Number2} = ${div}\n`;
    expect(app.Results).toBe(add_result + sub_result + mul_result + div_result);
  }));
  it('Advanced Divide Test', async(() => {
    let calculator = new CalculateService();
    let result = calculator.Divide(100, 0);
    expect(String(result)).toBe(String(NaN));
  }));
});
