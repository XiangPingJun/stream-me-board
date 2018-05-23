import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const firestore = admin.firestore()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

export const schedule = functions.https.onRequest(async (request, response) => {
	// Remove inactive user
	await firestore.collection('onlineUser').get().then(snap => {
		const promises = []
		snap.forEach(doc => {
			if (new Date().getTime() - doc.data().heartbeat.getTime() > 60000)
				promises.push(doc.ref.delete())
		})
		return Promise.all(promises)
	})
	// update last executed
	await firestore.doc('system/schedule').set({
		lastExecuted: new Date()
	})
	response.send('Done.')
})
