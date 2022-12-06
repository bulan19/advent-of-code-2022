import { readFileSync } from 'fs'

try {

    let input = readFileSync('./input/day3.txt', 'utf8').split('\n')

    console.log(solve1(input))
    console.log(solve2(input))

} catch (error) {
    console.log(error)
}

function solve1(input) {
    let sum = 0;
    for (let rucksack of input) {
        let compLength = rucksack.length / 2;
        sum += score(duplicate(rucksack.slice(0, compLength), rucksack.slice(compLength)));
    }
    return sum;
}

function solve2(input) {
    let sum = 0;
    for (let group of chunk(input, 3)) {
        sum += score(duplicate(group[0], group[1], group[2]));
    }
    return sum;
}

function duplicate(c1, c2, c3) {
    for (let a of c1) {
        for (let b of c2) {
            if (a === b) {
                if (c3) {
                    for (let c of c3) {
                        if (b === c) {
                            return c;
                        }
                    }
                } else {
                    return a;
                }

            }
        }
    }
}

function chunk(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

function score(c) {
    let points = 0;
    // Using for loop for (a-z):
    for (var i = 97; i <= 122; i++) {
        points++;
        if (c === String.fromCharCode(i)) {
            return points;
        }
    }
    // Using for loop for (A-Z):
    for (i = 65; i <= 90; i++) {
        points++;
        if (c === String.fromCharCode(i)) {
            return points;
        }
    }
}