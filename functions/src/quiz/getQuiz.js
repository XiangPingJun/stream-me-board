const fs = require('fs')
const ans = require('./answer.js')

let result = JSON.parse(fs.readFileSync('index.ts', 'utf-8').replace('export default ', ''))
let j = 0
fs.readFileSync('toParse.txt', 'utf-8').split('\n').forEach(line => {
	if (-1 != line.indexOf('以上') || -1 != line.indexOf('以下') || -1 != line.indexOf('承上') || -1 != line.indexOf('圖') || -1 != line.indexOf('皆是') || -1 != line.indexOf('皆非'))
		return
	const arr = line.trim().match(/^(\d+)\.(.+)Ａ\.(.+)Ｂ\.(.+)Ｃ\.(.+)Ｄ\.(.+)/)
	if (!arr)
		return
	const Q = arr[2] + ':'
	result[Q] = {
		A: ans[arr[1] + ''],
		OP: [arr[3], arr[4], arr[5], arr[6]]
	}
})
for (let i in result) {
	if (-1 != result[i].OP.findIndex(op => -1 !== op.indexOf('皆是') || -1 !== op.indexOf('皆非')))
		delete result[i]
	else if (undefined == result[i].A)
		delete result[i]
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