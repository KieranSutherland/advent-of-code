import fs from 'fs';
import path from 'path';

export function readFile(filePath: string,): string[] {
    const relativePath = path.join(__dirname, '..', '..', 'day-3', filePath);
    try {
        return fs.readFileSync(relativePath, 'utf8').split('\r\n');
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}

const nonDigitRegex = /\D/;
const nonDigitNonPeriod = /[^.\d]/g;

function isNumber(string: string) {
    return !isNaN(parseInt(string));
}

function findSumOfEngineParts(lines: string[], lineIndex = 0, sum = 0) {
    const currentLine: string = lines[lineIndex];
    for (let i = 0; i < currentLine.length; i++) {
        if (isNumber(currentLine.charAt(i))) {
            const digit = currentLine.substring(i).split(nonDigitRegex)[0];
            const digitLastIndexEnd = digit.length + i;
            let adjacentChars = '';
            // Collect previous line adjacent chars
            if (lineIndex !== 0) {
                const previousLine = lines[lineIndex - 1];
                if (i !== 0) {
                    adjacentChars += previousLine.charAt(i - 1)
                }
                adjacentChars += previousLine.substring(i, digitLastIndexEnd)
                const rightAdjacentChar = previousLine.charAt(digitLastIndexEnd)
                if (rightAdjacentChar) {
                    adjacentChars += rightAdjacentChar
                }
            }
            // Collect current line adjacent chars
            if (i !== 0) {
                adjacentChars += currentLine.charAt(i - 1)
            }
            const rightAdjacentChar = currentLine.charAt(digitLastIndexEnd)
            if (rightAdjacentChar) {
                adjacentChars += rightAdjacentChar
            }
            // Collect next line adjacent chars
            if (lineIndex !== lines.length - 1) {
                const nextLine = lines[lineIndex + 1];
                if (i !== 0) {
                    adjacentChars += nextLine.charAt(i - 1)
                }
                adjacentChars += nextLine.substring(i, digitLastIndexEnd)
                const rightAdjacentChar = nextLine.charAt(digitLastIndexEnd)
                if (rightAdjacentChar) {
                    adjacentChars += rightAdjacentChar
                }
            }
            if (adjacentChars.match(nonDigitNonPeriod)) {
                sum += parseInt(digit);
            }
            i += digit.length - 1;
        }
    }
    if (lineIndex + 1 > lines.length - 1) {
        return sum;
    } else {
        return findSumOfEngineParts(lines, lineIndex + 1, sum);
    }
}

function solve() {
    const lines = readFile('data.txt');
    console.log(findSumOfEngineParts(lines));
}

solve();