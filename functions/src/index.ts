import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import QUIZ_DB from './quiz'
import * as shortid from 'shortid'

const VOTE_TIMEOUT = 23000
const QUIZ_TIMEOUT = 27000

admin.initializeApp()
const firestore = admin.firestore()

function hashStr(str) {
	var hash = 0
	for (var i = 0; i < str.length; i++) {
		var char = str.charCodeAt(i)
		hash = ((hash << 5) - hash) + char
		hash = hash & hash // Convert to 32bit integer
	}
	return hash
}

const sendSystemChat = async function (text) {
	const streamTime = (await firestore.doc('system/stream').get()).data().time
	const chatCount = (await firestore.collection('allChat').doc(streamTime).collection('chat-line').get()).size
	let index = (parseInt('zzz', 36) - chatCount).toString(36)
	index += text.substr(0, 10).replace(/\//g, '／')
	await firestore.collection('allChat').doc(streamTime).collection('chat-line').doc(index).set({
		uid: 'system',
		text: text,
		id: shortid.generate(),
		time: admin.firestore.FieldValue.serverTimestamp()
	})
}

export const startQuiz = functions.https.onRequest(async (request, response) => {
	let doc = await firestore.doc('system/quiz').get()
	doc = await firestore.doc('system/quizHistory').get()
	const quizDb = {}
	for (const i in QUIZ_DB)
		if (!doc.data()[hashStr(i)])
			quizDb[i] = QUIZ_DB[i]
	const questions = Object.keys(quizDb)

	if (0 === questions.length)
		await firestore.doc('system/quizHistory').set({})
	else {
		const question = questions[Math.floor(Math.random() * questions.length)]
		const quiz = quizDb[question]
		await firestore.doc('system/quiz').set({
			time: admin.firestore.FieldValue.serverTimestamp(),
			Q: question,
			ended: false,
			...quiz
		})
		await firestore.doc('system/quizHistory').update({ [hashStr(question)]: true })
		await firestore.doc('activity/quiz').set({})

		const status = (await firestore.doc('system/stream').get()).data().status
		if ('STARTED' == status) {
			let text = `問: ${question} `
			quiz.OP.forEach(op => text += `[${op}] `)
			await sendSystemChat(text)
		}
		await new Promise(resolve => setTimeout(resolve, QUIZ_TIMEOUT))
		await firestore.doc('system/quiz').update({ ended: true })
		if ('STARTED' == status)
			await sendSystemChat(`答: ${quiz.OP[quiz.A]}`)
	}

	response.send('')
})

export const endVote = functions.firestore.document('system/vote').onWrite(async (change, context) => {
	if (change.before.data().time == change.after.data().time || change.after.data().ended)
		return undefined
	await new Promise(resolve => setTimeout(resolve, VOTE_TIMEOUT))
	await firestore.doc('system/vote').update({ ended: true })

	const voteObj = (await firestore.doc('activity/vote').get()).data()
	let totalArr = new Array(change.after.data().optionCount).fill(0)
	for (const uid in voteObj)
		totalArr = totalArr.map((total, i) => total + voteObj[uid][i])
	let text = ''
	totalArr.forEach((total, i) => text += `${String.fromCharCode(65 + i)}(${total}票) `)
	await sendSystemChat(text)
})

export const clearInactiveUser = functions.firestore.document('system/quizHistory').onUpdate(async (change, context) => {
	// Remove inactive user
	const online = (await firestore.doc('activity/online').get()).data()
	const idsToRemove = {}
	for (const uid in online) {
		const time = online[uid]
		if (new Date().getTime() - time.getTime() > 300000)
			idsToRemove[uid] = admin.firestore.FieldValue.delete()
	}
	if (Object.keys(idsToRemove).length > 0)
		await firestore.doc('activity/online').update(idsToRemove)
})