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
const shortid = require("shortid");
const VOTE_TIMEOUT = 23000;
const QUIZ_TIMEOUT = 27000;
admin.initializeApp();
const firestore = admin.firestore();
function hashStr(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
const sendSystemChat = function (text) {
    return __awaiter(this, void 0, void 0, function* () {
        const streamTime = (yield firestore.doc('system/stream').get()).data().time;
        const chatCount = (yield firestore.collection('allChat').doc(streamTime).collection('chat-line').get()).size;
        let index = (parseInt('zzz', 36) - chatCount).toString(36);
        index += text.substr(0, 10).replace(/\//g, '／');
        yield firestore.collection('allChat').doc(streamTime).collection('chat-line').doc(index).set({
            uid: 'system',
            text: text,
            id: shortid.generate(),
            time: admin.firestore.FieldValue.serverTimestamp()
        });
    });
};
exports.startQuiz = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    if ('STARTED' !== (yield firestore.doc('system/stream').get()).data().status) {
        response.send('');
        return;
    }
    const doc = yield firestore.doc('system/quizHistory').get();
    const quizDb = {};
    for (const i in quiz_1.default)
        if (!doc.data()[hashStr(i)])
            quizDb[i] = quiz_1.default[i];
    const questions = Object.keys(quizDb);
    if (0 === questions.length)
        yield firestore.doc('system/quizHistory').set({});
    else {
        const question = questions[Math.floor(Math.random() * questions.length)];
        const quiz = quizDb[question];
        yield firestore.doc('system/quiz').set(Object.assign({ time: admin.firestore.FieldValue.serverTimestamp(), Q: question, ended: false }, quiz));
        yield firestore.doc('system/quizHistory').update({ [hashStr(question)]: true });
        yield firestore.doc('activity/quiz').set({});
        let text = `問: ${question} `;
        quiz.OP.forEach(op => text += `[${op}] `);
        yield sendSystemChat(text);
    }
    response.send('');
}));
exports.endQuiz = functions.firestore.document('system/quiz').onUpdate((change, context) => __awaiter(this, void 0, void 0, function* () {
    if (change.after.data().ended)
        return;
    yield new Promise(resolve => setTimeout(resolve, QUIZ_TIMEOUT));
    yield firestore.doc('system/quiz').update({ ended: true });
    const quiz = (yield firestore.doc('system/quiz').get()).data();
    yield sendSystemChat(`答: ${quiz.OP[quiz.A]}`);
}));
exports.endVote = functions.firestore.document('system/vote').onUpdate((change, context) => __awaiter(this, void 0, void 0, function* () {
    if (change.after.data().ended)
        return;
    yield new Promise(resolve => setTimeout(resolve, VOTE_TIMEOUT));
    yield firestore.doc('system/vote').update({ ended: true });
    const voteObj = (yield firestore.doc('activity/vote').get()).data();
    let totalArr = new Array(change.after.data().optionCount).fill(0);
    for (const uid in voteObj)
        totalArr = totalArr.map((total, i) => total + voteObj[uid][i]);
    let text = '';
    totalArr.forEach((total, i) => text += `${String.fromCharCode(65 + i)}(${total}票) `);
    yield sendSystemChat(text);
}));
exports.clearInactiveUser = functions.firestore.document('system/{doc}').onUpdate((change, context) => __awaiter(this, void 0, void 0, function* () {
    // Remove inactive user
    const online = (yield firestore.doc('activity/online').get()).data();
    const idsToRemove = {};
    for (const uid in online) {
        const time = online[uid];
        if (new Date().getTime() - time.getTime() > 300000)
            idsToRemove[uid] = admin.firestore.FieldValue.delete();
    }
    if (Object.keys(idsToRemove).length > 0)
        yield firestore.doc('activity/online').update(idsToRemove);
}));
//# sourceMappingURL=index.js.map