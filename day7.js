import { readFileSync } from 'fs'

var path = []

try {

    var input = readFileSync('./input/day7.txt', 'utf8').split('\n')

    var fileSystem = parse(input);

    console.log(solve1())
    console.log(solve2())

} catch (error) {
    console.log(error)
}

function solve1() {
    return getDirs().filter(size => size <= 100000).reduce((sum, size) => sum + size, 0)
}

function solve2() {
    const diskspace = 70000000,
        needed = 30000000,
        available = diskspace - getDirSize('/') // root
    return getDirs().filter((size) => size > (needed - available)).reduce((pre, curr) => pre > curr ? curr : pre)
}

function move(to) {
    to === '..' ? path.pop() : path.push(to)
    return path.reduce((acc, curr) => acc + curr + (acc ? '/' : ''))
}

function getDirs() {
    let dirs = []
    for (let i in fileSystem) {
        dirs.push(getDirSize(i))
    }
    return dirs
}

function getSize(value, i) {
    if (value === 'dir') {
        return getDirSize(i)
    } else {
        return value;
    }
}

function getDirSize(pointer) {
    let total = 0;
    for (let i in fileSystem[pointer]) {
        total += getSize(fileSystem[pointer][i], i)
    }
    return total;
}

function parse(input) {
    var currentDir, fileSystem = {};
    for (let line of input) {
        switch (line[0]) {
            case "$":
                let command = line.substring(2, 4);
                if (command === 'cd') {
                    currentDir = move(line.substring(5))
                } else {
                    // do nothing on ls
                }
                break;
            default:
                // list output
                if (!fileSystem[currentDir]) {
                    fileSystem[currentDir] = {}
                }
                let [value, name] = line.split(' ')
                if (value === 'dir') {
                    name = currentDir + name + '/';
                } else {
                    value = Number(value);
                }
                fileSystem[currentDir][name] = value;
                break;
        }
    }
    return fileSystem
}