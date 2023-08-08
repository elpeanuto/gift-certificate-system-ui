import { expect } from 'chai';
import { repeatingLitters } from '../js_practical_task.mjs';

describe('repeatingLitters', () => {
    it('should return the string with each character repeated once', () => {
        const result1 = repeatingLitters('Hello');
        expect(result1).to.equal('HHeelloo');

        const result2 = repeatingLitters('Hello world');
        expect(result2).to.equal('HHeello  wworrldd');
    });

    it('should return an empty string when the input string is empty', () => {
        const result = repeatingLitters('');
        expect(result).to.equal('');
    });

    it('should throw an error when the input is not a string', () => {
        expect(() => repeatingLitters(42)).to.throw('Input must be a string.');
        expect(() => repeatingLitters(null)).to.throw('Input must be a string.');
        expect(() => repeatingLitters(undefined)).to.throw('Input must be a string.');
        expect(() => repeatingLitters({})).to.throw('Input must be a string.');
    });
});
