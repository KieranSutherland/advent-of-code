import fs from 'fs';
import path from 'path';

export function readFile(fileName: string): string[] {
    const relativePath = path.join(__dirname, '..', '..', 'day-6', fileName);
    try {
        return fs.readFileSync(relativePath, 'utf8').split('\r\n');
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}

function isNumber(string: string) {
    return !isNaN(parseInt(string));
}

function resolveTimeDistanceMaps(lines: string[]) {
    const times = [];
    for (const potentialNum of lines[0].split(' ')) {
        if (isNumber(potentialNum)) {
            times.push(parseInt(potentialNum));
        }
    }
    const records = [];
    for (const potentialNum of lines[1].split(' ')) {
        if (isNumber(potentialNum)) {
            records.push(parseInt(potentialNum));
        }
    }
    return { times, records };
}

function resolveFasterTimes(time: number, record: number): number[] {
    const fasterButtonTimes = [];
    for (const buttonTime of Array.from(Array(time + 1).keys())) {
        const travelDistance = (time - buttonTime) * buttonTime;
        if (travelDistance > record) {
            fasterButtonTimes.push(buttonTime);
        }
    }
    return fasterButtonTimes;
}

function solve() {
    const lines = readFile('data.txt');
    const { times, records } = resolveTimeDistanceMaps(lines);
    console.log(times);
    console.log(records);
    let total = 1;

    for (let i = 0; i < records.length; i++) {
        const buttonTimes = resolveFasterTimes(times[i], records[i]);
        console.log(buttonTimes)
        console.log(buttonTimes.length)
        console.log('')
        if (buttonTimes.length !== 0) {
            total *= buttonTimes.length;
        }
    }

    console.log(total);
}

solve();