import { readFileSync } from 'fs'

try {

    let input = readFileSync('./input/day1.txt', 'utf8')
    let [first, second, third] = sum(input.split('\n')).sort((a, b) => b - a).slice(0, 3)

    console.log(first)
    console.log(first + second + third)

} catch (error) {
    console.log(error)
}

function sum(input) {
    let sum = [], count = 0
    for (const line of input) {
        if (!line) {
            sum.push(count)
            count = 0
        } else {
            count += Number(line)
        }
    }
    return sum;
}
