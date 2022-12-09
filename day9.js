import { readFileSync } from 'fs'

class Position {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.visited = 0;
    }

    left() {
        this.y--
    }

    right() {
        this.y++
    }

    up() {
        this.x++
    }

    down() {
        this.x--
    }

    move(x, y) {
        this.x = x
        this.y = y
    }

    getPath() {
        return this.x + ',' + this.y
    }
}

try {

    let input = readFileSync('./input/day9.txt', 'utf8').split('\n')
    console.log(solve1(getCmds(input)))

} catch (error) {
    console.log(error)
}

function solve1(commands) {
    const head = new Position(), tail = new Position()
    let visited = new Set()
    commands.forEach(cmd => {
        let i = 0
        while (i < cmd.steps) {
            i++
            // move
            switch (cmd.direction) {
                case 'R':
                    head.right()
                    if (head.y - tail.y > 1) tail.move(head.x, head.y - 1)
                    break;
                case 'L':
                    head.left()
                    if (tail.y - head.y > 1) tail.move(head.x, head.y + 1)
                    break;
                case 'U':
                    head.up()
                    if (head.x - tail.x > 1) tail.move(head.x - 1, head.y)
                    break;
                case 'D':
                    head.down()
                    if (tail.x - head.x > 1) tail.move(head.x + 1, head.y)
                    break;
                default:
                    console.log('no valid direction')
                    break;
            }
            // trace
            let path = tail.getPath()
            if (!visited.has(path)) visited.add(path)
        }
    })
    return visited.size;
}

function getCmds(input) {
    let commands = new Array()
    input.forEach(line => {
        let [direction, steps] = line.split(' ')
        commands.push({ 'direction': direction, 'steps': Number(steps) })
    });
    return commands;
}