import { readFileSync } from 'fs'

class CPU {
    constructor() {
        this.cycle = 0
        this.x = 1
        this.sum = 0
        this.check = new Set([20, 60, 100, 140, 180, 220])
    }

    run() {
        this.cycle++
        if (this.check.has(this.cycle)) {
            this.sum += this.cycle * this.x
        }
    }

    increase(v) {
        this.x += v
    }

    getSum() {
        return this.sum
    }
}

try {

    let input = readFileSync('./input/day10.txt', 'utf8').split('\n')

    console.log(solve1(input))

} catch (error) {
    console.log(error)
}

function solve1(input) {
    var cpu = new CPU()
    input.forEach(row => {
        let [instruction, value] = row.split(' ')
        cpu.run()
        if (instruction === 'addx') {
            cpu.run()
            cpu.increase(Number(value))
        }
    });
    return cpu.getSum()
}