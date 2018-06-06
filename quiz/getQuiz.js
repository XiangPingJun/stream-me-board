const request = require("request")
const fs = require('fs')

let result = JSON.parse(fs.readFileSync('result.json', 'utf-8'))
let lastQuestion
fs.readFileSync('toParse.txt', 'utf-8').split('\n').forEach(line => {
	line = line.trim()
	if (line.match(/^#\d+/)) {
		lastQuestion = line.replace(/^#\d+\s*/, '').trim()
		result[lastQuestion] = result[lastQuestion] || { Q: lastQuestion }
	} else if (line.match(/^A:/)) {
		const A = line.replace('A:', '').trim()
		result[lastQuestion].A = result[lastQuestion].OP.findIndex(option => option == A)
	} else if (line.split(' ').length > 1) {
		result[lastQuestion].OP = line.split(' ')
	}
})
let j = 0
for (let i in result) {
	if (!result[i].A || -1 == result[i].A || !result[i].OP || result[i].OP.length < 2) {
		delete result[i]
		continue
	}
	result[i].OP = result[i].OP.filter(option => option).map(option => option.trim())
	j++
}
fs.writeFileSync('result.json', JSON.stringify(result), 'utf-8')




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