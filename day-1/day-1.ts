import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    const relativePath = path.join(__dirname, '..', 'day-1', filePath)
    try {
        return fs.readFileSync(relativePath, 'utf8').split('\n');
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}

const wordToDigit = new Map([
    [
        'one',
        '1'
    ],
    [
        'two',
        '2'
    ],
    [
        'three',
        '3'
    ],
    [
        'four',
        '4'
    ],
    [
        'five',
        '5'
    ],
    [
        'six',
        '6'
    ],
    [
        'seven',
        '7'
    ],
    [
        'eight',
        '8'
    ],
    [
        'nine',
        '9'
    ]
]);

interface FoundDigit {
    index: number;
    digit: string;
}

function findFirstAndLastNumber(line: string) {
    let firstDigit: FoundDigit;
    let lastDigit: FoundDigit;
    for (const [ word, digit ] of wordToDigit.entries()) {
        const firstIndexDigit = line.indexOf(digit);
        if (firstIndexDigit !== -1 && (!firstDigit || firstIndexDigit < firstDigit.index)) {
            firstDigit = {
                index: firstIndexDigit,
                digit
            };
        }
        const firstIndexWord = line.indexOf(word);
        if (firstIndexWord !== -1 && (!firstDigit || firstIndexWord < firstDigit.index)) {
            firstDigit = {
                index: firstIndexWord,
                digit
            };
        }

        const lastIndexDigit = line.lastIndexOf(digit);
        if (lastIndexDigit !== -1 && (!lastDigit || lastIndexDigit > lastDigit.index)) {
            lastDigit = {
                index: lastIndexDigit,
                digit
            };
        }
        const lastIndexWord = line.lastIndexOf(word);
        if (lastIndexWord !== -1 && (!lastDigit || lastIndexWord > lastDigit.index)) {
            lastDigit = {
                index: lastIndexWord,
                digit
            };
        }
    }
    if (!firstDigit && !lastDigit) {
        return '0';
    }
    if (!firstDigit) {
        return lastDigit.digit + lastDigit.digit;
    }
    if (!lastDigit) {
        return firstDigit.digit + firstDigit.digit;
    }
    return firstDigit.digit + lastDigit.digit
}

function solve() {
    const lines = readFile('data.txt');
    let total = 0;
    for (const line of lines) {
        const combinedNumber = findFirstAndLastNumber(line);
        total += parseInt(combinedNumber);
    }
    console.log(total);
}

solve();