import { expect } from 'chai';
import { substringOccurrencesCounter } from '../js_practical_task.mjs';

describe('substringOccurrencesCounter', () => {
    it('should return 0 when substring is not found in text', () => {
        const result = substringOccurrencesCounter('a', 'test it');
        expect(result).to.equal(0);
    });

    it('should return the correct number of occurrences when substring is found in text', () => {
        const result1 = substringOccurrencesCounter('t', 'test it');
        expect(result1).to.equal(3);

        const result2 = substringOccurrencesCounter('T', 'test it');
        expect(result2).to.equal(3);
    });

    it('should return 0 when either substring or text is an empty string', () => {
        const result1 = substringOccurrencesCounter('', 'test it');
        expect(result1).to.equal(0);

        const result2 = substringOccurrencesCounter('t', '');
        expect(result2).to.equal(0);

        const result3 = substringOccurrencesCounter('', '');
        expect(result3).to.equal(0);
    });

    it('should throw an error when either argument is not a string', () => {
        expect(() => substringOccurrencesCounter(42, 'test it')).to.throw('Both arguments must be strings.');
        expect(() => substringOccurrencesCounter('t', 42)).to.throw('Both arguments must be strings.');
        expect(() => substringOccurrencesCounter(42, 42)).to.throw('Both arguments must be strings.');
    });
});
