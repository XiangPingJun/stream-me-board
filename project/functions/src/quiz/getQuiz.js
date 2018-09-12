const fs = require('fs')
const ans = require('./answer.js')

let result = JSON.parse(fs.readFileSync('index.ts', 'utf-8').replace('export default ', ''))
// let j = 0
// fs.readFileSync('toParse.txt', 'utf-8').split('\n').forEach(line => {
// 	if (-1 != line.indexOf('以上') || -1 != line.indexOf('以下') || -1 != line.indexOf('承上') || -1 != line.indexOf('圖') || -1 != line.indexOf('皆是') || -1 != line.indexOf('皆非'))
// 		return
// 	const quiz.OP = line.trim().match(/^(\d+)\.(.+)Ａ\.(.+)Ｂ\.(.+)Ｃ\.(.+)Ｄ\.(.+)/)
// 	if (!quiz.OP)
// 		return
// 	const Q = quiz.OP[2] + ':'
// 	result[Q] = {
// 		A: ans[quiz.OP[1] + ''],
// 		OP: [quiz.OP[3], quiz.OP[4], quiz.OP[5], quiz.OP[6]]
// 	}
// })
// for (let i in result) {
// 	if (-1 != result[i].OP.findIndex(op => -1 !== op.indexOf('皆是') || -1 !== op.indexOf('皆非')))
// 		delete result[i]
// 	else if (undefined == result[i].A)
// 		delete result[i]
// }
function checkDup(quiz) {
	for (let i = 0; i < quiz.OP.length; i++)
		for (let j = 0; j < quiz.OP.length; j++)
			if (i != j && quiz.OP[i] == quiz.OP[j])
				return i == quiz.A ? j : i
	return null
}
for (let idx in result) {
	const quiz = result[idx]
	for (let i = checkDup(quiz); null != i; i = checkDup(quiz))
		quiz.OP[i] = shuffle(['A', 'B', 'C']).join(' → ')
}
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