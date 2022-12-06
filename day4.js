import { readFileSync } from 'fs'

try {

    let input = readFileSync('./input/day4.txt', 'utf8').split('\n')

    console.log(solve(input, true))
    console.log(solve(input, false))

} catch (error) {
    console.log(error)
}

function solve(input, fully) {
    let result = []
    for (let pair of input) {
        let [s1, s2] = pair.split(","),
            [fStart, fEnd] = s1.split("-"),
            [sStart, sEnd] = s2.split("-")
        if (fully ? fullyOverlap(Number(fStart), Number(fEnd), Number(sStart), Number(sEnd))
            : overlap(Number(fStart), Number(fEnd), Number(sStart), Number(sEnd))) {
            result.push(pair)
        }
    }
    return result.length
}

function overlap(fStart, fEnd, sStart, sEnd) {
    if (fStart <= sEnd && fEnd >= sStart) {
        return true
    } else {
        return false
    }
}

function fullyOverlap(fStart, fEnd, sStart, sEnd) {
    if (fStart === sStart || fEnd === sEnd) {
        return true;
    } else if (fStart < sStart) {
        return fEnd >= sEnd
    } else {
        return fEnd <= sEnd
    }
}