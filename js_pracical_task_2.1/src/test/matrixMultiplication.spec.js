import { expect } from 'chai';
import { matrixMultiplication } from '../js_practical_task.mjs';

describe('matrixMultiplication', () => {
    it('should return the correct result for valid inputs', () => {
        const matrix1 = [
            [1, 2],
            [3, 4],
        ];
        const matrix2 = [
            [5, 6],
            [7, 8],
        ];
        const expectedResult = [
            [19, 22],
            [43, 50],
        ];

        const result = matrixMultiplication(matrix1, matrix2);
        expect(result).to.deep.equal(expectedResult);
    });

    it('should throw an error if the inputs are not arrays', () => {
        const invalidMatrix1 = 123;
        const invalidMatrix2 = 'invalid';

        expect(() => matrixMultiplication(invalidMatrix1, invalidMatrix2)).to.throw('Both inputs must be arrays (matrices).');
    });

    it('should throw an error if the matrices are empty', () => {
        const emptyMatrix1 = [];
        const emptyMatrix2 = [[]];

        expect(() => matrixMultiplication(emptyMatrix1, emptyMatrix2)).to.throw('Both matrices must be non-empty.');
    });

    it('should throw an error if matrices have incompatible dimensions', () => {
        const matrix1 = [
            [5, 6, 7],
            [8, 9, 10],
        ];
        const matrix2 = [
            [1, 2],
            [3, 4],
        ];

        expect(() => matrixMultiplication(matrix1, matrix2)).to.throw('The number of columns in the first matrix must be equal to the number of rows in the second matrix.');
    });
});
