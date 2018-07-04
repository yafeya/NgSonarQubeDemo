import { NgModule } from "@angular/core";
import * as Services from './Services/index';
import { CommonModule } from '@angular/common';

const components = [];

const directives = [];
const exportItems = [];

const providers = [
    {provide: Services.ICalculateServiceToken, useClass: Services.CalculateService}
]

@NgModule({
    declarations: [directives, components],
    imports: [CommonModule],
    providers: [providers],
    exports: [exportItems]
})
export class CalculatorModule {

}