import { readFileSync } from 'fs';

class Tree {
    constructor(height, visible, distance) {
        this.height = height;
        this.visible = visible;
        this.distance = distance;
    }
}

try {

    let input = readFileSync('./input/day8.txt', 'utf8').split('\n')

    var max_width = 0, max_height = 0

    var map = parse(input)
    var dist = 0

    console.log(solve1(map))
    console.log(solve2(map))

} catch (error) {
    console.log(error)
}

function createMatrix(input) {

    let matrix = input.map((row) => {
        return row.split('').map(val => Number.parseInt(val))
    })

    return matrix
}

function solve1(map) {
    map.forEach((tree, path) => {
        let visible = new Array()
        visible.push(left(path, null))
        visible.push(up(path, null))
        visible.push(right(path, null))
        visible.push(down(path, null))
        tree.visible = visible.some(element => element)
    });
    return [...map].filter(e => e[1].visible).length
}

function solve2(map) {

    function highest(highest, curr) {
        if (highest[1].distance < curr[1].distance)
            return curr
        else return highest
    }

    map.forEach((tree, path) => {
        let visible = new Array()

        dist = 0
        visible.push(left(path, null))
        let dLeft = dist;

        dist = 0
        visible.push(up(path, null))
        let dUp = dist;

        dist = 0
        visible.push(right(path, null))
        let dRight = dist;

        dist = 0
        visible.push(down(path, null))
        let dDown = dist;

        tree.visible = visible.some(element => element)
        tree.distance = dLeft * dUp * dRight * dDown

    });
    return [...map].reduce(highest)[1].distance
}

function up(path, height) {
    let [x, y] = path.split(',')
    x = Number(x)

    if (x < 1) return true

    let curr = map.get(path)
    x-- // next
    if (height === null) return up([x, y].join(','), curr.height)
    dist++ // part 2
    if (curr.height >= height) return false

    return up([x, y].join(','), height)
}

function right(path, height) {
    let [x, y] = path.split(',')
    y = Number(y)

    if (y > max_width) return true

    let curr = map.get(path)
    y++ // next
    if (height === null) return right([x, y].join(','), curr.height)
    dist++ // part 2
    if (curr.height >= height) return false

    return right([x, y].join(','), height)
}

function down(path, height) {
    let [x, y] = path.split(',')
    x = Number(x)

    if (x > max_height) return true

    let curr = map.get(path)
    x++ // next
    if (height === null) return down([x, y].join(','), curr.height)
    dist++ // part 2
    if (curr.height >= height) return false

    return down([x, y].join(','), height)
}

function left(path, height) {
    let [x, y] = path.split(',')
    y = Number(y)

    if (y < 1) return true

    let curr = map.get(path)
    y-- // next
    if (height === null) return left([x, y].join(','), curr.height)
    dist++ // part 2
    if (curr.height >= height) return false

    return left([x, y].join(','), height)
}

function parse(input) {
    let map = new Map(), x = 0, y = 0
    for (let row of input) {
        x++
        for (let c of row) {
            y++
            map.set([x, y].join(','), new Tree(Number(c), false, 0))
        }
        if (max_height === 0) max_height = input.length
        if (max_width === 0) max_width = row.length
        y = 0
    }
    //console.log(map)
    return map
}