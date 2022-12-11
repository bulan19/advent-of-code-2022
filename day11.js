import { readFileSync } from 'fs'

class Monkey {
    constructor(items, operation, test) {
        this.items = items
        this.operation = operation
        this.test = test
        this.inspections = 0
    }
}

try {

    console.log(solve1(setInput()))

} catch (error) {
    console.log(error)
}

function solve1(monkeys) {
    for (let i = 0; i < 20; i++) {
        monkeys.forEach(monkey => {
            let [test, t, f] = monkey.test.slice()
            while (monkey.items.length > 0) {
                let item = monkey.items.shift()
                let worry = 0
                // count
                monkey.inspections++
                // operation
                let [a, op, b] = monkey.operation.slice()
                if (a == 'old') a = item
                if (b == 'old') b = item
                if (op == '*') worry = multiply(a, b)
                if (op == '+') worry = add(a, b)
                // monkey gets bored
                worry = Math.floor(worry / 3)
                // test (%)
                if (worry % test == 0) {
                    monkeys.get(t).items.push(worry)
                } else {
                    monkeys.get(f).items.push(worry)
                }
            }
        });
    }
    let arr = new Array()
    monkeys.forEach((monkey) => arr.push(monkey.inspections) )
    arr.sort((a, b) => b - a)
    return arr[0] * arr[1]
}

function multiply(a, b) {
    return a * b
}

function add(a, b) {
    return a + b
}

function setInput() {
    let monkeys = new Map()
    monkeys.set(0, new Monkey([89, 95, 92, 64, 87, 68], ['old', '*', 11], [2, 7, 4]))
    monkeys.set(1, new Monkey([87, 67], ['old', '+', 1], [13, 3, 6]))
    monkeys.set(2, new Monkey([95, 79, 92, 82, 60], ['old', '+', 6], [3, 1, 6]))
    monkeys.set(3, new Monkey([67, 97, 56], ['old', '*', 'old'], [17, 7, 0]))
    monkeys.set(4, new Monkey([80, 68, 87, 94, 61, 59, 50, 68], ['old', '*', 7], [19, 5, 2]))
    monkeys.set(5, new Monkey([73, 51, 76, 59], ['old', '+', 8], [7, 2, 1]))
    monkeys.set(6, new Monkey([92], ['old', '+', 5], [11, 3, 0]))
    monkeys.set(7, new Monkey([99, 76, 78, 76, 79, 90, 89], ['old', '+', 7], [5, 4, 5]))
    return monkeys
}