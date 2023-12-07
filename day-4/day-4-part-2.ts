import fs from 'fs';
import path from 'path';

export function readFile(filePath: string,): string[] {
    const relativePath = path.join(__dirname, '..', '..', 'day-4', filePath);
    try {
        return fs.readFileSync(relativePath, 'utf8').split('\r\n');
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}

function isNumber(string: string) {
    return !isNaN(parseInt(string));
}

function parseNumbers(numLine: string) {
    return numLine.split(' ').filter(num => isNumber(num)).map(num => parseInt(num))
}

function countMatches(winningNumbers: number[], playerNumbers: number[]) {
    let matches = 0;
    for (const winningNumber of winningNumbers) {
        if (playerNumbers.includes(winningNumber)) {
            matches++;
        }
    }
    return matches;
}


let cardToMatches = new Map<number, number>();

function processNumOfMatches(lines: string[], lineIndex: number) {
    if (lines.length - 1 < lineIndex) {
        return 0;
    }
    const cardNum = parseInt(lines[lineIndex].split(':')[0].split('Card ')[1]);
    cardToMatches.set(cardNum, (cardToMatches.get(cardNum) || 0) + 1);
    const numSplit = lines[lineIndex].split(':')[1].split('|');
    const winningNumbers = parseNumbers(numSplit[0]);
    const playerNumbers = parseNumbers(numSplit[1]);
    const matches = countMatches(winningNumbers, playerNumbers);
    if (matches > 0) {
        for (let i = 1; i <= matches; i++) {
            const nextCard = cardToMatches.get(cardNum + i);
            if (nextCard) {
                cardToMatches.set(cardNum + i, nextCard + cardToMatches.get(cardNum));
            } else {
                cardToMatches.set(cardNum + i, cardToMatches.get(cardNum));
            }
        }
    }
}

function solve() {
    const lines = readFile('data.txt');
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
        processNumOfMatches(lines, i);
    }
    for (const num of cardToMatches.values()) {
        total += num;
    }
    console.log(total);
}

solve();