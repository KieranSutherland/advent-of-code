import fs from 'fs';
import path from 'path';

export function readFile(fileName: string): string[] {
    const relativePath = path.join(__dirname, '..', '..', 'day-5', fileName);
    try {
        return fs.readFileSync(relativePath, 'utf8').split('\r\n');
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}

function isNumber(string: string) {
    return !isNaN(parseInt(string));
}

interface SeedRange {
    start: number;
    end: number;
}

function parseSeeds(line: string): SeedRange[] {
    let rawSeedNums = [];
    for (const potentialNum of line.split(':')[1].split(' ')) {
        if (isNumber(potentialNum)) {
            rawSeedNums.push(parseInt(potentialNum));
        }
    }
    const seeds = [];
    for (let i = 0; i < rawSeedNums.length - 1; i = i + 2) {
        seeds.push({
            start: rawSeedNums[i],
            end: rawSeedNums[i] + rawSeedNums[i + 1] - 1
        })
    }
    return seeds;
}

function findLowestLocation(seed: number, maps: MapRange[][]) {
    let currentKey = seed;
    for (const map of maps) {
        let findMatch = false;
        for (const range of map) {
            const { source, destination, length } = range;
            const sourceStart = source;
            const sourceEnd = source + length - 1;
            if (currentKey >= sourceStart && currentKey <= sourceEnd) {
                const diff = destination - source;
                currentKey = currentKey + diff;
                findMatch = true;
                break;
            }
        }
    }
    return currentKey;
}

interface MapRange {
    destination: number;
    source: number;
    length: number;
}

function convertMapLine(line: string): MapRange {
    const nums = line.split(' ');
    return {
        destination: parseInt(nums[0]),
        source: parseInt(nums[1]),
        length: parseInt(nums[2])
    }
}

function resolveMaps(lines: string[]) {
    const maps: MapRange[][] = [];
    let traversingMap = false;
    let currentMapIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i];
        const isMapIndex = isNumber(currentLine.charAt(0));
        if (!traversingMap && isMapIndex) {
            traversingMap = true;
            currentMapIndex++;
            maps.push([])
        }
        if (traversingMap) {
            if (!isMapIndex) {
                traversingMap = false;
                continue;
            }
            const mapRange = convertMapLine(currentLine);
            maps[currentMapIndex].push(mapRange);
        }
    }

    return maps;
}

function solve() {
    const lines = readFile('data.txt');
    const seeds = parseSeeds(lines[0]);
    const maps = resolveMaps(lines.slice(2));
    let lowestLocation = null;

    for (const seed of seeds) {
        const { start, end } = seed;
        for (let i = start; i <= end; i++) {
            const lowest = findLowestLocation(i, maps);
            if (lowestLocation > lowest || lowestLocation === null) {
                lowestLocation = lowest;
            }
        }
    }

    console.log(lowestLocation);
}

solve();