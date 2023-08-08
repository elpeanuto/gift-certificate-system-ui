import { expect } from 'chai';
import { secondsToDate } from '../js_practical_task.mjs';

describe('secondsToDate', () => {
    it('should return the correct date when input is a positive number', () => {
        const result = secondsToDate(31536000);
        const expectedDate = new Date('2021-06-01T00:00:00.000Z');
        expect(result).to.eql(expectedDate);
    });

    it('should return the base date when input is 0', () => {
        const result = secondsToDate(0);
        const expectedDate = new Date('2020-06-01T00:00:00.000Z');
        expect(result).to.eql(expectedDate);
    });

    it('should handle decimal input by converting to an integer', () => {
        const result = secondsToDate(31536000.567);
        const expectedDate = new Date('2021-06-01T00:00:00.000Z');
        expect(result).to.eql(expectedDate);
    });

    it('should throw an error when input is not a number', () => {
        expect(() => secondsToDate('invalid')).to.throw('seconds must be a valid number.');
    });

    it('should throw an error when input is NaN', () => {
        expect(() => secondsToDate(NaN)).to.throw('seconds must be a valid number.');
    });

    it('should throw an error when input is a negative number', () => {
        expect(() => secondsToDate(-100)).to.throw('econds must be a valid number.');
    });
});
