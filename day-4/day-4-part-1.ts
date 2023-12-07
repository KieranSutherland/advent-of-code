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

function calculatePoints(winningNumbers: number[], playerNumbers: number[]) {
    let points = 0;
    for (const winningNumber of winningNumbers) {
        if (playerNumbers.includes(winningNumber)) {
            points = points === 0 ? 1 : points * 2;
        }
    }
    return points;
}

function getPoints(line: string) {
    const numSplit = line.split(':')[1].split('|');
    const winningNumbers = parseNumbers(numSplit[0]);
    const playerNumbers = parseNumbers(numSplit[1]);
    return calculatePoints(winningNumbers, playerNumbers);
}

function solve() {
    const lines = readFile('data.txt');
    let total = 0;
    for (const line of lines) {
        total += getPoints(line)
    }
    console.log(total);
}

solve();