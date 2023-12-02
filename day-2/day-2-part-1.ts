import fs from 'fs';
import path from 'path';

export function readFile(filePath: string,): string[] {
    const relativePath = path.join(__dirname, '..', '..', 'day-2', filePath)
    try {
        return fs.readFileSync(relativePath, 'utf8').split('\n');
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

function findMaxCubeNumber(line: string, cubeColour: 'red' | 'green' | 'blue') {
    const split = line.split(` ${cubeColour}`);
    let max = 0;
    for (const suffix of split.slice(0, split.length - 1)) {
        const parsedNum = parseInt(suffix.substring(suffix.lastIndexOf(' ')));
        if (parsedNum > max) {
            max = parsedNum;
        }
    }
    return max;
}

interface MaxCubesUsed {
    game: number;
    red: number;
    green: number;
    blue: number;
}

function findMaxCubesUsed(line: string): MaxCubesUsed {
    const game = line.substring(line.indexOf('Game ') + 'Game '.length, line.indexOf(':'))
    const red = findMaxCubeNumber(line, 'red');
    const green = findMaxCubeNumber(line, 'green');
    const blue = findMaxCubeNumber(line, 'blue');
    return {
        game: parseInt(game),
        red,
        green,
        blue
    }
}


function solve() {
    const lines = readFile('data.txt');
    let total = 0;
    for (const line of lines) {
        const { game, red, green, blue } = findMaxCubesUsed(line);
        if (red <= MAX_RED_CUBES && green <= MAX_GREEN_CUBES && blue <= MAX_BLUE_CUBES) {
            total += game;
        }
    }
    console.log(total);
}

solve();