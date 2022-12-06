import { readFileSync } from 'fs'

try {

    let input = readFileSync('./input/test.txt', 'utf8').split('\n')

    console.log(input)

} catch (error) {
    console.log(error)
}