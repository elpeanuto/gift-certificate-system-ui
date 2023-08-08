import { expect } from 'chai';
import { towerHanoi } from '../js_practical_task.mjs';

describe('towerHanoi', () => {
    it('should return the number of moves needed to solve the Tower of Hanoi problem for 1 disk', () => {
        expect(towerHanoi(1)).to.equal(1);
    });

    it('should return the number of moves needed to solve the Tower of Hanoi problem for 2 disks', () => {
        expect(towerHanoi(2)).to.equal(3);
    });

    it('should return the number of moves needed to solve the Tower of Hanoi problem for 3 disks', () => {
        expect(towerHanoi(3)).to.equal(7);
    });

    it('should return the number of moves needed to solve the Tower of Hanoi problem for 4 disks', () => {
        expect(towerHanoi(4)).to.equal(15);
    });

    it('should throw an error when the input is not a number', () => {
        expect(() => towerHanoi('abc')).to.throw('The input must be a non-negative integer number.');
    });

    it('should throw an error when the input is not an integer', () => {
        expect(() => towerHanoi(3.5)).to.throw('The input must be a non-negative integer number.');
    });

    it('should throw an error when the input is a negative number', () => {
        expect(() => towerHanoi(-5)).to.throw('The input must be a non-negative integer number.');
    });
});
