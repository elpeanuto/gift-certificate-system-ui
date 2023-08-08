import { expect } from 'chai';
import { gather } from '../js_practical_task.mjs';

describe('gather', () => {
    it('should return a function that accepts a string and supports continued chaining', () => {
        const result = gather('a')('b')('c').order(0)(1)(2).get();
        expect(result).to.equal('abc');
    });

    it('should handle multiple function calls with order', () => {
        const result1 = gather('a')('b')('c').order(2)(1)(0).get();
        expect(result1).to.equal('cba');

        const result2 = gather('e')('l')('o')('l')('!')('h').order(5)(0)(1)(3)(2)(4).get();
        expect(result2).to.equal('hello!');
    });

    it('should throw an error if the input to gather is not a string', () => {
        expect(() => gather(123)).to.throw('Input must be a string.');
        expect(() => gather(null)).to.throw('Input must be a string.');
        expect(() => gather(undefined)).to.throw('Input must be a string.');
    });

    it('should throw an error if the input to order is not a number or is out of bounds', () => {
        const gatherFn = gather('a')('b')('c');
        expect(() => gatherFn.order('invalid')).to.throw('Invalid index provided.');
        expect(() => gatherFn.order(-1)).to.throw('Invalid index provided.');
        expect(() => gatherFn.order(3)).to.throw('Invalid index provided.');
    });
});
