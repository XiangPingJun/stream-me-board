const fs = require('fs')

let result = JSON.parse(fs.readFileSync('index.ts', 'utf-8').replace('export default ', ''))
for (let i in result) {
	if (!result[i].OP[0])
		delete result[i]
	else if (result[i].OP[0].match(/\w → \w → \w → \w/)) {
		if (-1 != i.indexOf('英文')) {
			delete result[i]
			continue
		}
		let eleArr = /A:\s([^B]+)\sB:([^C]+)\sC:(.+)/.exec(i)
		if (!eleArr) {
			delete result[i]
			continue
		}
		function removeDup() {
			for (let j in result[i].OP) {
				for (let k = 0; j < k; j++) {
					if (result[i].OP[j] != result[i].OP[k])
						continue
					if (result[i].A == j)
						result[k] = shuffle(['A', 'B', 'C']).join(' → ')
					else
						result[j] = shuffle(['A', 'B', 'C']).join(' → ')
					removeDup()
				}
			}
		}
		removeDup()
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