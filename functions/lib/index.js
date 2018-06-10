"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const quiz_1 = require("./quiz");
const QUIZ_TIMEOUT = 20000;
admin.initializeApp();
const firestore = admin.firestore();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.schedule = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    // quiz
    let doc = yield firestore.doc('system/quiz').get();
    doc = yield firestore.doc('system/quizHistory').get();
    const complement = {};
    for (const i in quiz_1.default)
        if (!doc.data()[i])
            complement[i] = quiz_1.default[i];
    const questions = Object.keys(complement);
    if (0 == questions.length)
        yield firestore.doc('system/quizHistory').set({});
    else {
        const question = questions[Math.floor(Math.random() * questions.length)];
        yield firestore.doc('system/quiz').set(Object.assign({ time: admin.firestore.FieldValue.serverTimestamp(), Q: question, ended: false }, complement[question]));
        yield firestore.doc('system/quizHistory').update({ [question]: true });
        yield firestore.doc('activity/quiz').set({});
        yield new Promise(resolve => setTimeout(resolve, QUIZ_TIMEOUT));
        yield firestore.doc('system/quiz').update({ ended: true });
    }
    response.send('Done.');
}));
//# sourceMappingURL=index.js.map