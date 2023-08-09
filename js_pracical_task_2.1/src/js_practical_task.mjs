'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        throw new Error('seconds must be a valid number.');
    }

    const baseDate = new Date('2020-06-01T00:00:00.000Z');
    const resultDate = new Date(baseDate.getTime() + ~~seconds * 1000);

    return resultDate;
}

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    if (!Number.isInteger(decimal)) {
        throw new Error('Only integer values are allowed.');
    }

    if (decimal < 0) {
        throw new Error('Only non-negative numbers are allowed.');
    }

    if (decimal >= 1024) {
        throw new Error('Input number must be below 1024.');
    }

    if (decimal === 0){
        return 0;
    }
    
    let result = '';

    while (decimal > 0) {
        result += decimal % 2;
        decimal = ~~(decimal / 2);
    }

    return result.split('').reverse().join('');
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    if (typeof substring !== 'string' || typeof text !== 'string') {
        throw new Error('Both arguments must be strings.');
    }

    if (substring === '' || text === '') {
        return 0;
    }

    let counter = 0;
    const lowercaseSubstring = substring.toLowerCase();
    const lowercaseText = text.toLowerCase();

    let index = lowercaseText.indexOf(lowercaseSubstring);
    while (index !== -1) {
        counter++;
        index = lowercaseText.indexOf(lowercaseSubstring, index + 1);
    }

    return counter;
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    if (typeof string !== 'string') {
        throw new Error('Input must be a string.');
    }

    let result = '';

    string.split('').forEach((e) => {
        result += e;

        if (substringOccurrencesCounter(e, string) <= 1) {
            result += e;
        }
    });

    return result;
}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return () => str
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    if (!Number.isInteger(disks) || disks < 0) {
        throw new Error('The input must be a non-negative integer number.');
    }

    if (disks === 1) {
        return 1;
    } else {
        return towerHanoi(disks - 1) * 2 + 1;
    }
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
        throw new Error('Both inputs must be arrays (matrices).');
    }

    if (!matrix1.length || !matrix2.length || !matrix1[0].length || !matrix2[0].length) {
        throw new Error('Both matrices must be non-empty.');
    }

    if (matrix1[0].length !== matrix2.length) {
        throw new Error('The number of columns in the first matrix must be equal to the number of rows in the second matrix.');
    }

    const result = [];

    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            for (let l = 0; l < matrix1[0].length; l++) {
                sum += matrix1[i][l] * matrix2[l][j];
            }
            result[i][j] = sum;
        }
    }

    return result;
}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string.');
    }

    let args = [str];

    function gatherInner(nextStr) {
        if (typeof nextStr !== 'string') {
            throw new Error('Input must be a string.');
        }
        args.push(nextStr);
        console.log("args: " + args);
        return gatherInner;
    }

    function order(index) {
        if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= args.length) {
            throw new Error('Invalid index provided.');
        }

        let orderedArgs = [];
        orderedArgs.push(args[index]);

        function orderInner(nextIndex) {
            if (typeof nextIndex !== 'number' || !Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= args.length) {
                throw new Error('Invalid index provided.');
            }
            orderedArgs.push(args[nextIndex]);
            return orderInner;
        }

        orderInner.get = function () {
            return orderedArgs.join("");
        };

        return orderInner;
    }

    gatherInner.order = order;
    return gatherInner;
}

export {
    secondsToDate,
    toBase2Converter,
    substringOccurrencesCounter,
    repeatingLitters,
    redundant,
    towerHanoi,
    matrixMultiplication,
    gather
};