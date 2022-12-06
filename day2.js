
import { readFileSync } from 'fs'

// A: rock, B: paper, C: scissors
// win: 6, draw 3

// PART 1
// X: rock, Y: paper, Z: scissors
// PART 2
// X: loose, Y: draw, Z: win

const choose = {
    "A": {
        "X": "C",
        "Y": "A",
        "Z": "B"
    },
    "B": {
        "X": "A",
        "Y": "B",
        "Z": "C"
    },
    "C": {
        "X": "B",
        "Y": "C",
        "Z": "A"
    }
}

const outcome = {
    "A X": 3,
    "A Y": 6,
    "A Z": 0,
    "B X": 0,
    "B Y": 3,
    "B Z": 6,
    "C X": 6,
    "C Y": 0,
    "C Z": 3
};

const result = {
    "X": 0,
    "Y": 3,
    "Z": 6
}

const shape = {
    "X": 1,
    "Y": 2,
    "Z": 3,
    "A": 1,
    "B": 2,
    "C": 3
};

try {

    let input = readFileSync('./input/day2.txt', 'utf8').split('\n')

    console.log(firstRound(input))
    console.log(secondRound(input))

} catch (error) {
    console.log(error)
}

function firstRound(input) {
    let score = 0;
    for (let round of input) {
        score += shape[round.substring(2)] + outcome[round];
    }
    return score;
}

function secondRound(input) {
    let score = 0;
    for (let round of input) {
        var [opponent, end] = round.split(" ");
        score += shape[choose[opponent][end]] + result[end];
    }
    return score;
}
