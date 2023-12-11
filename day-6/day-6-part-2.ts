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

function joinNumbers(numbers: number[]) {
    let fullNum = '';
    for (const num of numbers) {
        fullNum += `${num}`;
    }
    return parseInt(fullNum);
}

function getProgressPercentage(currentValue: number, end: number) {
    return Math.round(currentValue / end * 100);
}

function resolveFasterTimes(time: number, record: number): number[] {
    const fasterButtonTimes = [];
    let currentProgress = 0;
    for (const buttonTime of Array.from(Array(time + 1).keys())) {
        const travelDistance = (time - buttonTime) * buttonTime;
        if (travelDistance > record) {
            fasterButtonTimes.push(buttonTime);
        }
        const newProgress = getProgressPercentage(buttonTime, time);
        if (currentProgress < newProgress) {
            currentProgress = newProgress;
            console.log(`${currentProgress}%`);
        }
    }
    return fasterButtonTimes;
}

function solve() {
    const lines = readFile('data.txt');
    const { times, records } = resolveTimeDistanceMaps(lines);
    const joinedTime = joinNumbers(times);
    const joinedRecord = joinNumbers(records);

    const buttonTimes = resolveFasterTimes(joinedTime, joinedRecord);

    console.log(buttonTimes.length);
}

solve();