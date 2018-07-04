import { Injectable, InjectionToken } from '@angular/core';

export const ICalculateServiceToken = new InjectionToken('./ICalculateServiceToken');

export interface ICalculateService {
    Add(a: number, b: number): number;
    Substract(a: number, b: number): number;
    Multipy(a: number, b: number): number;
    Divide(a: number, b: number): number;
}

@Injectable()
export class CalculateService implements ICalculateService {
    Add(a: number, b: number): number {
        return a + b;
    }
    Substract(a: number, b: number): number {
        return a - b;
    }
    Multipy(a: number, b: number): number {
        return a * b;
    }
    Divide(a: number, b: number): number {
        let result = NaN;
        if (b != 0) {
            result = a / b;
        }
        return result;
    }
}