import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import QUIZ from './quiz'
import * as shortid from 'shortid'

const QUIZ_TIMEOUT = 20000
const VOTE_TIMEOUT = 27000

admin.initializeApp()
const firestore = admin.firestore()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

export const schedule = functions.https.onRequest(async (request, response) => {
	// quiz
	let doc = await firestore.doc('system/quiz').get()
	doc = await firestore.doc('system/quizHistory').get()
	const complement = {}
	for (const i in QUIZ)
		if (!doc.data()[i])
			complement[i] = QUIZ[i]
	const questions = Object.keys(complement)

	if (0 === questions.length)
		await firestore.doc('system/quizHistory').set({})
	else {
		const question = questions[Math.floor(Math.random() * questions.length)]
		await firestore.doc('system/quiz').set({
			time: admin.firestore.FieldValue.serverTimestamp(),
			Q: question,
			ended: false,
			...complement[question]
		})
		await firestore.doc('system/quizHistory').update({ [question]: true })
		await firestore.doc('activity/quiz').set({})

		let text = `問: ${question}`
		complement[question].OP.forEach(op => text += ` [${op}]`)
		await sendSystemChat(text)

		await new Promise(resolve => setTimeout(resolve, QUIZ_TIMEOUT))
		await firestore.doc('system/quiz').update({ ended: true })

		await sendSystemChat(`答: ${complement[question].A]} ` )		
	}

	response.send('Done.')
})

export const endVote = functions.firestore.document('system/vote').onWrite(async (change, context) => {
	if (change.before.data().time === change.after.data().time)
		return undefined
	await new Promise(resolve => setTimeout(resolve, VOTE_TIMEOUT))
	await firestore.doc('system/vote').update({ ended: true })

	const voteObj = (await firestore.doc('activity/vote').get()).data()
	let totalArr = new Array(change.after.data().optionCount).fill(0)
	for (const uid in voteObj)
		totalArr = totalArr.map((total, i) => total + voteObj[uid][i])
	let text = ''
	totalArr.forEach((total, i) => text += String.fromCharCode(65 + i)+' ('+ total +' 票)')
	await sendSystemChat(text)
})

async function sendSystemChat(text) {
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