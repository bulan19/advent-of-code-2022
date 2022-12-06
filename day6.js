import { readFileSync } from 'fs'

try {

    let input = readFileSync('./input/day6.txt', 'utf8').split('\n')

    console.log(findMarker(input.toString(), 4))
    console.log(findMarker(input.toString(), 14))

} catch (error) {
    console.log(error)
}

function findMarker (ds, x) {
    var i = 0;
    while(!unique(ds.substring(i,i+x))) {
        i++
    }
    return i+x
}

function unique (str) {
    let count
    for(let c1 of str) {
        for(let c2 of str) {
            if(c1 === c2) {
                count++;
            }
        }
        if(count > 1) {
            return false;
        }
        count = 0
    }
    return true;
}