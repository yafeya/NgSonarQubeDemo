import { TestBed, async } from '@angular/core/testing';
import { CalculateService } from './CalculateService';

describe('CalculateService', () => { 
    it('add test', async(()=>{
        let calculator = new CalculateService();
        expect(calculator.Add(1,2)).toBe(3);
    }));

    it('substract test', async(()=>{
        let calculator = new CalculateService();
        expect(calculator.Substract(1,2)).toBe(-1);
    }));

    it('multipy test', async(()=>{
        let calculator = new CalculateService();
        expect(calculator.Multipy(1,2)).toBe(2);
    }));

    it('divide test', async(()=>{
        let calculator = new CalculateService();
        expect(calculator.Divide(1,2)).toBe(0.5);
    }));
})