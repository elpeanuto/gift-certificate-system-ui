import { expect } from 'chai';
import { redundant } from '../js_practical_task.mjs';

describe('redundant', () => {
    it('should return a function that returns the original string', () => {
        const f1 = redundant('apple');
        expect(f1()).to.equal('apple');

        const f2 = redundant('pear');
        expect(f2()).to.equal('pear');

        const f3 = redundant('');
        expect(f3()).to.equal('');
    });

    it('should return a function that returns the original string when the input is a number', () => {
        const f4 = redundant(42);
        expect(f4()).to.equal(42);
    });

    it('should return a function that returns the original string when the input is an object', () => {
        const obj = { name: 'John' };
        const f5 = redundant(obj);
        expect(f5()).to.equal(obj);
    });
});
