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
		let eleArr = /A:\s([^B]+)\sB:([^C]+)\sC:([^D]+)D:(.+)/.exec(i)
		if (!eleArr) {
			delete result[i]
			continue
		}
		eleArr = eleArr.map(item => item.trim())
		eleArr.splice(0, 1)
		let ansArr = result[i].OP[result[i].A].split(' → ').map(idx => {
			switch (idx) {
				case 'A': return 0
				case 'B': return 1
				case 'C': return 2
				case 'D': return 3
			}
		})
		let correct = ansArr.map(idx => eleArr[idx])
		correct.splice(0, 1)
		const qArr = shuffle([...correct])
		let Q = `${i.split(' A:')[0]}: A:${qArr[0]} B:${qArr[1]} C:${qArr[2]}`
		Q = Q.replace(/四個/g, '').replace(/四種/g, '').replace(/四位/g, '').replace(/四處/g, '').replace(/四支/g, '').replace(/四張/g, '').replace(/四部/g, '').replace(/四項/g, '').replace(/四場/g, '').replace('::', ':')
		result[Q] = { A: Math.floor(Math.random() * 3), OP: [] }
		for (let j = 0; j < 3; j++) {
			if (result[Q].A == j)
				result[Q].OP[j] = correct.map(ele => qArr.indexOf(ele)).map(idx => {
					switch (idx) {
						case 0: return 'A'
						case 1: return 'B'
						case 2: return 'C'
					}
				}).join(' → ')
			else {
				let candidate
				while (true) {
					candidate = shuffle(['A', 'B', 'C']).join(' → ')
					if (-1 == result[Q].OP.indexOf(candidate))
						break
				}
				result[Q].OP[j] = candidate
			}
		}
		delete result[i]
	}
}
console.log(`Total ${Object.keys(result).length} questions`)
fs.writeFileSync('index.ts', 'export default ' + JSON.stringify(result), 'utf-8')

function newCandidate() {
	let candidate = new Array(4).fill(0).map((item, idx) => String.fromCharCode(65 + idx))
	return shuffle(candidate).join(' → ')
}

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