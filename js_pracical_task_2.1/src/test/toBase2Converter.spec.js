import { expect } from 'chai';
import { toBase2Converter } from '../js_practical_task.mjs';

describe('toBase2Converter', () => {
    it('should return "101" when input is 5', () => {
        const result = toBase2Converter(5);
        expect(result).to.equal('101');
    });

    it('should return "1010" when input is 10', () => {
        const result = toBase2Converter(10);
        expect(result).to.equal('1010');
    });

    it('should return "0" when input is 0', () => {
        const result = toBase2Converter(0);
        expect(result).to.equal(0);
    });

    it('should throw an error when input is not a number', () => {
        expect(() => toBase2Converter('abc')).to.throw('Only integer values are allowed.');
    });

    it('should throw an error when input is NaN', () => {
        expect(() => toBase2Converter(NaN)).to.throw('Only integer values are allowed.');
    });

    it('should throw an error when input is not an integer', () => {
        expect(() => toBase2Converter(10.5)).to.throw('Only integer values are allowed.');
    });

    it('should throw an error when input is a negative number', () => {
        expect(() => toBase2Converter(-5)).to.throw('Only non-negative numbers are allowed.');
    });

    it('should throw an error when input is equal to 1024', () => {
        expect(() => toBase2Converter(1024)).to.throw('Input number must be below 1024.');
    });

    it('should throw an error when input is greater than 1024', () => {
        expect(() => toBase2Converter(2000)).to.throw('Input number must be below 1024.');
    });
});
