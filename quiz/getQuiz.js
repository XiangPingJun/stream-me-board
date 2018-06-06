const request = require("request")
const fs = require('fs')

let result = JSON.parse(fs.readFileSync('result.json', 'utf-8'))
let lastQuestion
fs.readFileSync('toParse.txt', 'utf-8').split('\n').forEach(line => {
	line = line.trim()
	if (line.match(/^#\d+/)) {
		lastQuestion = line.replace(/^#\d+\s*/, '').trim()
		result[lastQuestion] = result[lastQuestion] || { question: lastQuestion }
	} else if (line.match(/^A:/)) {
		const answer = line.replace('A:', '').trim()
		result[lastQuestion].answer = result[lastQuestion].options.findIndex(option => option == answer)
	} else if (line.split(' ').length > 1) {
		result[lastQuestion].options = line.split(' ')
	}
})
let j = 0
for (let i in result) {
	if (!result[i].answer || -1 == result[i].answer || !result[i].options || result[i].options.length < 2) {
		delete result[i]
		continue
	}
	result[i].options = result[i].options.filter(option => option).map(option => option.trim())
	j++
}
console.log(result)
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