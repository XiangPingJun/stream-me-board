import { Observable } from 'rxjs/Observable'
import { receiveSysInfo, submitChat, dummy } from '../actions'
//import store from '../store.js'

export const subscribeSysInfo = action$ => action$
  .ofType('SUBSCRIBE_SYS_INFO')
  .mergeMap(() =>
    Observable.fromEvent(
      firebase.database().ref('system'),
      'value'
    ).map(snapshot => snapshot.val()).map(receiveSysInfo)
      .takeUntil(action$.ofType('SUBSCRIBE_SYS_INFO')) // clear at next action
  )

export const startBroadcast = action$ => action$
  .ofType('START_BROADCAST')
  .map(action => action.payload.url)
  .mergeMap(url => {
    let chat
    return Observable.fromPromise(firebase.database().ref('chat').once('value').then(snap =>
      chat = snap.val()
    ).then(firebase.database().ref('oldChat').once('value').then(snap => {
      chat = { ...chat, ...snap.val() }
      // move old chats
      firebase.database().ref('chatHistory').once('value').then(snap => {
        let history = snap.val()
        delete history[Object.keys(history)[0]]
        firebase.database().ref('chatHistory').set({
          ...history,
          //[store.getState().sysInfo.streamId]: chat
        })
      })
      firebase.database().ref('oldChat').remove()
      firebase.database().ref('chat').remove()
      //firebase.database().ref('record').remove()
      //        .then(() => store.dispatch(submitChat('系統', '實況開始囉！大家坐穩啦！', 'black', 'START')))
      firebase.database().ref('system').update({
        videoSrc: url,
        streaming: true,
        streamId: new Date().getTime()
      })
    }))).map(dummy)
  })

export const endBroadcast = action$ => action$
  .ofType('END_BROADCAST')
  .map(action => action.payload)
  .mergeMap(payload => Observable.fromPromise(
    firebase.database().ref('system').update({ streaming: false })
  ).map(dummy))
