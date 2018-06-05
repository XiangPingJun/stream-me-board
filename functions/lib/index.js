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
admin.initializeApp();
const firestore = admin.firestore();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.schedule = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    // Remove inactive user
    const doc = yield firestore.doc('activity/onlineUsers').get();
    const idsToRemove = {};
    for (const i in doc.data())
        if (new Date().getTime() - doc.data()[i].getTime() > 60000)
            idsToRemove[i] = admin.firestore.FieldValue.delete();
    if (Object.keys(idsToRemove).length > 0)
        yield firestore.doc('activity/onlineUsers').update(idsToRemove);
    // update last executed
    yield firestore.doc('system/schedule').set({
        lastExecuted: new Date()
    });
    response.send('Done.');
}));
//# sourceMappingURL=index.js.map