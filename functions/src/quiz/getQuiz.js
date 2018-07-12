const request = require("request")
const fs = require('fs')

let result = JSON.parse(fs.readFileSync('index.ts', 'utf-8').replace('export default ', ''))
let lastLine = ''
let question
let j = 0
fs.readFileSync('toParse.txt', 'utf-8').split('\n').forEach(line => {
	line = line.trim()
	switch (lastLine) {
		case 'NUMBER':
			question += line
			lastLine = 'QUESTION'
			break
		case 'QUESTION':
			let items = line.split('、').map(item => ({ text: item }))
			items = shuffle(items)
			items = items.map((item, i) => ({ code: String.fromCharCode(65 + i), ...item }))
			const correct = line.split('、').map(correctItem => items.findIndex(item => item.text == correctItem))
				.map(idx => String.fromCharCode(65 + idx))
			for (let i = 0, item; item = items[i]; i++)
				question += ` ${item.code}: ${item.text}`
			const correctIdx = Math.floor(Math.random() * items.length)
			let ops = []
			for (let i = 0; i < correct.length; i++) {
				if (correctIdx == i) {
					ops[i] = correct.join(' → ')
				} else {
					let found = false
					let candidate
					do {
						candidate = shuffle(correct).join(' → ')
						found = ops.indexOf(candidate) != -1
					} while (found)
					ops[i] = candidate
				}
			}
			result[question] = { OP: ops, A: correctIdx }
			lastLine = 'OPTIONS'
			break
		default:
			question = ''
			lastLine = 'NUMBER'
	}
})
for (let i in result) {
	if (-1 == result[i].A, isNaN(result[i].A), 4 != result[i].OP.length, i.indexOf('我國') >= 0) {
		console.log(-1 == result[i].A, isNaN(result[i].A), result[i].OP.length, i.indexOf('我國') >= 0)
		console.log(i, result[i])
		delete result[i]
		continue
	}
}
console.log(`Total ${Object.keys(result).length} questions`)
fs.writeFileSync('index.ts', 'export default ' + JSON.stringify(result), 'utf-8')

function shuffle(array) {
	let items = [...array]
	for (let i = 0; i < items.length / 2; i++) {
		const randIdx = Math.floor(Math.random() * items.length)
		let tmp = items[i]
		items[i] = items[randIdx]
		items[randIdx] = tmp
	}
	return items
}