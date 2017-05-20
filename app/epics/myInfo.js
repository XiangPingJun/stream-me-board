import { Observable } from 'rxjs/Observable'
import { receiveMyInfo, subscribeMyInfo as _subscribeMyInfo } from '../actions'
import { randomColor } from '../utils/common.js'
//import store from '../store.js'

export const subscribeMyInfo = action$ => action$
  .ofType('SUBSCRIBE_MY_INFO').mergeMap(() => {
    if (!localStorage.userName)
      return Observable.of(null).map(receiveMyInfo)
    return Observable.fromEvent(
      firebase.database().ref().child('user').child(localStorage.userName),
      'value'
    ).map(snapshot => snapshot.val()).map(receiveMyInfo)
      .takeUntil(action$.ofType('SUBSCRIBE_MY_INFO'))
  })

export const loginMyInfo = action$ => action$
  .ofType('LOGIN_MY_INFO').map(action => action.payload.userName).mergeMap(userName =>
    Observable.fromPromise(
      firebase.database().ref('user').child(userName).transaction(function (user) {
        localStorage.userName = userName
        return user ? user : {
          color: randomColor(),
          watchCount: 0
        }
      })
    )
  ).map(_subscribeMyInfo)

export const setMyColor = action$ => action$
  .ofType('SET_MY_COLOR').map(action => action.payload).mergeMap(payload =>
    Observable.fromPromise(
      firebase.database().ref('user').child(localStorage.userName).child('color').set(payload.color)
    )
  ).map(_subscribeMyInfo)

export const setMyLastWatched = action$ => action$
  .ofType('SET_MY_LAST_WATCHED').mergeMap(() =>
    Observable.fromPromise(
      firebase.database().ref('user').child(localStorage.userName).transaction(function (user) {
        /*if (user.lastWatched != store.getState().sysInfo.streamId) {
          user.watchCount++
          user.lastWatched = store.getState().sysInfo.streamId
        }*/
        return user
      })
    )
  ).map(_subscribeMyInfo)

