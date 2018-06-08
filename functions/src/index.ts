import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import QUIZ from './quiz'

const QUIZ_TIMEOUT = 20000

admin.initializeApp()
const firestore = admin.firestore()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

export const schedule = functions.https.onRequest(async (request, response) => {
	// Remove inactive user
	let doc = await firestore.doc('activity/onlineUsers').get()
	const idsToRemove = {}
	for (const i in doc.data())
		if (new Date().getTime() - doc.data()[i].getTime() > 60000)
			idsToRemove[i] = admin.firestore.FieldValue.delete()
	if (Object.keys(idsToRemove).length > 0)
		await firestore.doc('activity/onlineUsers').update(idsToRemove)

	// quiz
	doc = await firestore.doc('system/quiz').get()
	if (new Date().getTime() - doc.data().time.getTime() > 600000) {
		doc = await firestore.doc('system/quizHistory').get()
		const complement = {}
		for (const i in QUIZ)
			if (!doc.data()[i])
				complement[i] = QUIZ[i]
		const questions = Object.keys(complement)

		if (0 == questions.length)
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

			await new Promise(resolve => setTimeout(resolve, QUIZ_TIMEOUT))
			await firestore.doc('system/quiz').update({ ended: true })
		}
	}

	response.send('Done.')
})
