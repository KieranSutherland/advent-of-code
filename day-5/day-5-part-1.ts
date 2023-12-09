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

function parseSeeds(line: string): number[] {
    let seeds = [];
    for (const potentialNum of line.split(':')[1].split(' ')) {
        if (isNumber(potentialNum)) {
            seeds.push(parseInt(potentialNum));
        }
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
            // console.log(`sourceStart: ${sourceStart}`)
            // console.log(`sourceEnd: ${sourceEnd}`)
            // console.log(`currentKey: ${currentKey}`)
            if (currentKey >= sourceStart && currentKey <= sourceEnd) {
                const diff = destination - source;
                // console.log(`diff: ${diff}`)
                currentKey = currentKey + diff;
                // console.log(`setting currentKey to ${currentKey}`)
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
    console.log(seeds);
    const maps = resolveMaps(lines.slice(2));
    console.log(maps);
    let lowestLocation = null;

    for (const seed of seeds) {
        console.log(`seed: ${seed}`);
        const lowest = findLowestLocation(seed, maps);
        console.log(lowest);
        if (lowestLocation > lowest || lowestLocation === null) {
            lowestLocation = lowest;
        }
    }

    console.log(lowestLocation);
}

solve();