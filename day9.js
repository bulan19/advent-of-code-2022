import { readFileSync } from 'fs'

class Position {

    constructor() {
        this.x = 0;
        this.y = 0;
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

    getPath() {
        return this.x + ',' + this.y
    }
}

try {

    let input = readFileSync('./input/day9.txt', 'utf8').split('\n')
    console.log(solve1(getCmds(input)))
    console.log(solve2(getCmds(input)))

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
                    move(head, tail)
                    break;
                case 'L':
                    head.left()
                    move(head, tail)
                    break;
                case 'U':
                    head.up()
                    move(head, tail)
                    break;
                case 'D':
                    head.down()
                    move(head, tail)
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

function solve2(commands) {
    const head = new Position(), tail = new Array()
    let visited = new Set()
    for (let i = 0; i < 9; i++) {
        tail.push(new Position)
    }
    commands.forEach(cmd => {
        let i = 0
        while (i < cmd.steps) {
            i++
            // move
            switch (cmd.direction) {
                case 'R':
                    head.right()
                    break;
                case 'L':
                    head.left()
                    break;
                case 'U':
                    head.up()
                    break;
                case 'D':
                    head.down()
                    break;
                default:
                    console.log('no valid direction')
                    break;
            }
            tail.reduce(move, head)
            let path = tail[tail.length - 1].getPath() // trace last 'tail'
            if (!visited.has(path)) visited.add(path)
        }
    })
    return visited.size;
}

/**
 * Calculate direction + diagonally
 */
function move(pre, curr) {
    if (pre.y - curr.y > 1) {
        curr.right()
        if (pre.x < curr.x) curr.down()
        if (pre.x > curr.x) curr.up()
        return curr
    }
    if (curr.y - pre.y > 1) {
        curr.left()
        if (pre.x < curr.x) curr.down()
        if (pre.x > curr.x) curr.up()
        return curr
    }
    if (pre.x - curr.x > 1) {
        curr.up()
        if (pre.y < curr.y) curr.left()
        if (pre.y > curr.y) curr.right()
        return curr
    }
    if (curr.x - pre.x > 1) {
        curr.down()
        if (pre.y < curr.y) curr.left()
        if (pre.y > curr.y) curr.right()
        return curr
    }
    // no move
    return curr
}

function getCmds(input) {
    let commands = new Array()
    input.forEach(line => {
        let [direction, steps] = line.split(' ')
        commands.push({ 'direction': direction, 'steps': Number(steps) })
    });
    return commands;
}