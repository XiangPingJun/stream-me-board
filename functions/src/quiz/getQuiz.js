const request = require("request")
const fs = require('fs')

let result = JSON.parse(fs.readFileSync('index.js', 'utf-8').replace('export default ', ''))
let lastQuestion
fs.readFileSync('toParse.txt', 'utf-8').split('\n').forEach(line => {
	line = line.replace('\r', '')
	// line = line.trim().replace(/\.\.\./g, '…').replace(/\.\./g, '…').replace(/~/, '…')
	// if (!line)
	// 	return

	let tokens = line.split(/[？：]/)
	if (2 != tokens.length)
		return
	lastQuestion = tokens[0].trim()
	result[lastQuestion] = { OP: [] }

	tokens = tokens[1].trim().split(' ')
	if (tokens.length != 5)
		return
	tokens.forEach((token, i) => {
		token = token.trim()
		if (isNaN(parseInt(token)))
			result[lastQuestion].OP.push(token)
		else if (token)
			result[lastQuestion].A = parseInt(token) - 1
	})

	// if (line.match(/^#\d+/)) {
	// 	lastQuestion = line.replace(/^#\d+\s*/, '').trim()
	// 	result[lastQuestion] = result[lastQuestion] || {}
	// } else if (line.match(/^A:/)) {
	// 	const A = line.replace('A:', '').trim()
	// 	result[lastQuestion].A = result[lastQuestion].A || result[lastQuestion].OP.findIndex(option => option == A)
	// } else if (line.split(' ').length > 1) {
	// 	result[lastQuestion].OP = result[lastQuestion].OP || line.split(' ').filter(option => option).map(option => option.trim())
	// }
	// if (line.match(/^[^\d].*/)) {
	// 	lastQuestion = line
	// 	result[lastQuestion] = result[lastQuestion] || {}
	// } else if (line.split('　').length > 1) {
	// 	result[lastQuestion].OP = line.split('　').map(option => option.trim()).filter(option => option)
	// 	result[lastQuestion].A = result[lastQuestion].OP.findIndex(option => option.indexOf('tttt') >= 0)
	// 	result[lastQuestion].OP = result[lastQuestion].OP.map(op => op.replace(/tttt/g, '')).map(op => op.replace(/^\d/, ''))
	// }

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
	if (-1 == result[i].A, isNaN(result[i].A), 4 != result[i].OP.length, i.indexOf('我國') >= 0) {
		console.log(-1 == result[i].A, isNaN(result[i].A), result[i].OP.length, i.indexOf('我國') >= 0)
		console.log(i, result[i])
		delete result[i]
		continue
	}
}
console.log(`Total ${Object.keys(result).length} questions`)
fs.writeFileSync('index.js', 'export default ' + JSON.stringify(result), 'utf-8')




/*function getPages(i) {
	let url = 'http://www.docx88.com/wkid-97329c0ca98271fe910ef998-' + i + '.html'

	return new Promise(function (resolve, reject) {
		request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (error || response.statusCode != 200) {
				reject(error) 
			}
			resolve(body)
		})
	})
}*/