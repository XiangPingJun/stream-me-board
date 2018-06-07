const request = require("request")
const fs = require('fs')

let result = JSON.parse(fs.readFileSync('index.ts', 'utf-8').replace('export default ', ''))
let lastQuestion
fs.readFileSync('toParse.txt', 'utf-8').split('\n').forEach(line => {
	//line = line.replace('\r', '')
	line = line.trim()
	if (!line)
		return

	// line.split(' ').forEach((token, i) => {
	// 	token = token.trim()
	// 	if (0 == i) {
	// 		lastQuestion = token
	// 		result[lastQuestion] = result[lastQuestion] || { OP: [] }
	// 	} else if (5 == i)
	// 		//result[lastQuestion].A = result[lastQuestion].OP.findIndex(option => option == token)
	// 		result[lastQuestion].A = parseInt(token) - 1
	// 	else
	// 		result[lastQuestion].OP.push(token)
	// })

	// if (line.match(/^#\d+/)) {
	// 	lastQuestion = line.replace(/^#\d+\s*/, '').trim()
	// 	result[lastQuestion] = result[lastQuestion] || {}
	// } else if (line.match(/^A:/)) {
	// 	const A = line.replace('A:', '').trim()
	// 	result[lastQuestion].A = result[lastQuestion].A || result[lastQuestion].OP.findIndex(option => option == A)
	// } else if (line.split(' ').length > 1) {
	// 	result[lastQuestion].OP = result[lastQuestion].OP || line.split(' ').filter(option => option).map(option => option.trim())
	// }
	if (line.match(/^[^\d].*/)) {
		lastQuestion = line
		result[lastQuestion] = result[lastQuestion] || {}
	} else if (line.split('　').length > 1) {
		result[lastQuestion].OP = line.split('　').map(option => option.trim()).filter(option => option)
		result[lastQuestion].A = result[lastQuestion].OP.findIndex(option => -1 != option.indexOf('tttt'))
		result[lastQuestion].OP = result[lastQuestion].OP.map(op => op.replace(/tttt/g, '')).map(op => op.replace(/^\d/, ''))
	}

	// if (line.match(/^#\d+/)) {
	// 	lastQuestion = line.replace(/^#\d+\s*/, '').trim()
	// 	result[lastQuestion] = result[lastQuestion] || {}
	// } else if (line.match(/^\w$/)) {
	// 	result[lastQuestion].A = line.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)
	// } else if (line.split(' ').length > 1) {
	// 	result[lastQuestion].OP = result[lastQuestion].OP || line.split(' ').filter(option => option).map(option => option.trim())
	// }
})
for (let i in result) {
	if (!result[i].A || -1 == result[i].A || isNaN(result[i].A) || !result[i].OP || result[i].OP.length < 2 || result[i].OP.length > 4 || -1 != i.indexOf('中國') || -1 != i.indexOf('我國')) {
		delete result[i]
		continue
	}
}
console.log(`Total ${Object.keys(result).length} questions`)
fs.writeFileSync('result.json', 'export default ' + JSON.stringify(result), 'utf-8')




/*function getPages(i) {
	let url = 'http://www.docx88.com/wkid-97329c0ca98271fe910ef998-' + i + '.html'
	console.log(url)

	return new Promise(function (resolve, reject) {
		request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (error || response.statusCode != 200) {
				console.log(error, response.statusCode)
				reject(error)
			}
			resolve(body)
		})
	})
}*/