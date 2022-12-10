import { readFileSync } from 'fs'

class CPU {
    constructor() {
        this.cycle = 0
        this.x = 1
        this.sum = 0
        this.check = new Set([20, 60, 100, 140, 180, 220])
        this.CRT = new Array()
    }

    run() {
        this.cycle++
        if (this.check.has(this.cycle)) {
            this.sum += this.cycle * this.x
        }
        this.draw()
    }

    draw() {
        let draw = '.'
        if (this.cycle % 40 == this.x || this.cycle % 40 == this.x + 1 || this.cycle % 40 == this.x + 2) {
            draw = '#'
        }
        this.CRT.push(draw)
    }

    increase(v) {
        this.x += v
    }

    getSum() {
        return this.sum
    }

    getX() {
        return this.x
    }

    getCrt() {
        return this.CRT
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
    let crt = cpu.getCrt()
    for (let i = 0; i < crt.length; i += 40) {
        let chunk = crt.slice(i, i + 40);
        console.log(chunk.join(''))
        // do whatever
    }
    return cpu.getSum()
}