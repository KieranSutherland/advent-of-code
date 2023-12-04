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

function isNumber(string: string) {
    return !isNaN(parseInt(string));
}

function findDigitsInLine(currentLine: string, indexStart: number, indexEnd: number) {
    let start = indexStart;
    let digits: number[] = [];
    while (true) {
        if (start > indexEnd) {
            return digits;
        }
        if (isNumber(currentLine.charAt(start))) {
            // Find start of digit
            let startIndex = start;
            for (let k = start - 1; k >= 0; k--) {
                if (!isNumber(currentLine.charAt(k))) {
                    startIndex = k + 1;
                    break;
                } else if (k === 0) {
                    startIndex = k;
                    break;
                }
            }
            // Find end of digit
            let endIndex = start;
            for (let k = start + 1; k <= currentLine.length - 1; k++) {
                if (!isNumber(currentLine.charAt(k))) {
                    endIndex = k;
                    break;
                } else if (k === currentLine.length - 1) {
                    endIndex = k + 1;
                    break;
                }
            }
            digits.push(parseInt(currentLine.substring(startIndex, endIndex)));
            start = endIndex + 1
        } else {
            start++;
        }
    }
}

function findSumOfGearParts(lines: string[], lineIndex = 0, sum = 0) {
    const currentLine: string = lines[lineIndex];
    for (let i = 0; i < currentLine.length; i++) {
        if (currentLine.charAt(i) === '*') {
            let adjacentDigits = [];
            // Collect previous line digits
            if (lineIndex !== 0) {
                const previousLine = lines[lineIndex - 1];
                let adjIndexStart: number = i !== 0 ? i - 1 : i;
                const adjIndexEnd: number = previousLine.charAt(i + 1) ? i + 1 : i;
                const digits = findDigitsInLine(previousLine, adjIndexStart, adjIndexEnd);
                adjacentDigits.push(...digits);
            }
            // Collect current line left adjacent char
            if (i !== 0) {
                const digits = findDigitsInLine(currentLine, i - 1, i - 1);
                adjacentDigits.push(...digits);
            }
            // Collect current line right adjacent char
            if (currentLine.charAt(i + 1)) {
                const digits = findDigitsInLine(currentLine, i + 1, i + 1);
                adjacentDigits.push(...digits);
            }
            // Collect next line adjacent chars
            if (lineIndex !== lines.length - 1) {
                const nextLine = lines[lineIndex + 1];
                let adjIndexStart: number = i !== 0 ? i - 1 : i;
                const adjIndexEnd: number = nextLine.charAt(i + 1) ? i + 1 : i;
                const digits = findDigitsInLine(nextLine, adjIndexStart, adjIndexEnd);
                adjacentDigits.push(...digits);
            }
            if (adjacentDigits.length === 2) {
                sum += (adjacentDigits[0] * adjacentDigits[1]);
            }
        }
    }
    if (lineIndex + 1 > lines.length - 1) {
        return sum;
    } else {
        return findSumOfGearParts(lines, lineIndex + 1, sum);
    }
}

function solve() {
    const lines = readFile('data.txt');
    console.log(findSumOfGearParts(lines));
}

solve();