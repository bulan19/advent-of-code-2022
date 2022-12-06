import { readFileSync } from 'fs'

// 	   [P]                 [Q]     [T]
// [F] [N]             [P] [L]     [M]
// [H] [T] [H]         [M] [H]     [Z]
// [M] [C] [P]     [Q] [R] [C]     [J]
// [T] [J] [M] [F] [L] [G] [R]     [Q]
// [V] [G] [D] [V] [G] [D] [N] [W] [L]
// [L] [Q] [S] [B] [H] [B] [M] [L] [D]
// [D] [H] [R] [L] [N] [W] [G] [C] [R]
//  1   2   3   4   5   6   7   8   9 

var crates = {
    "1": ["D", "L", "V", "T", "M", "H", "F"],
    "2": ["H", "Q", "G", "J", "C", "T", "N", "P"],
    "3": ["R", "S", "D", "M", "P", "H"],
    "4": ["L", "B", "V", "F"],
    "5": ["N", "H", "G", "L", "Q"],
    "6": ["W", "B", "D", "G", "R", "M", "P"],
    "7": ["G", "M", "N", "R", "C", "H", "L", "Q"],
    "8": ["C", "L", "W"],
    "9": ["R", "D", "L", "Q", "J", "Z", "M", "T"]
};

try {

    let input = readFileSync('./input/day5.txt', 'utf8').split('\n')

    var clone = structuredClone(crates)
    console.log(solve1(input))
    console.log(solve2(input))

} catch (error) {
    console.log(error)
}

function solve1(input) {

    function _move(from, to) {
        crates[to].push(crates[from].pop())
    }

    let tops = ""
    for (let row of input) {
        let instructions = row.split(" ")
        for (let i = 0; i < instructions[1]; i++) {
            _move(instructions[3], instructions[5])
        }
    }
    for (var i in crates) {
        tops = tops + crates[i].pop()
    }
    return tops
}

function solve2(input) {

    function _moveMultiple(amount, from, to) {
        let moving = []
        for (var i = 0; i < amount; i++) {
            moving.push(clone[from].pop());
        }
        for (var crate of moving.reverse()) {
            clone[to].push(crate);
        }
    }

    var tops = ""
    for (var row of input) {
        var instructions = row.split(" ")
        _moveMultiple(Number(instructions[1]), Number(instructions[3]), Number(instructions[5]))
    }
    for (var i in clone) {
        tops = tops + clone[i].pop()
    }
    return tops
}

