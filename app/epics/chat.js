import { Observable } from 'rxjs/Observable'
import { dummy, receiveChat } from '../actions'
import { fingerprint, maxChatCount, getVideoTime } from '../misc/common.js'

export const subscribeChat = action$ => action$
  .ofType('SUBSCRIBE_CHAT').mergeMap(() =>
    Observable.fromEvent(
      firebase.database().ref('chat'),
      'child_added'
    ).map(snap => ({
      [snap.key]: snap.val()
    })).map(receiveChat).takeUntil(action$.ofType('SUBSCRIBE_CHAT')) // clear at next action
  )

export const submitChat = action$ => action$
  .ofType('SUBMIT_CHAT').map(action => action.payload).mergeMap(payload => {
    let oldChat = {}
    return Observable.fromPromise(
      firebase.database().ref('chat').transaction(function (chats) {
        if (!chats)
          chats = {}
        let newChats = {}
        const keys = Object.keys(chats).reverse()
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i]
          i < maxChatCount ? newChats[k] = chats[k] : oldChat[k] = chats[k]
        }
        const lastKey = keys[0]
        let newKey = lastKey ? parseInt(lastKey.split('\t')[0]) + 1 : 10000
        newKey += '　' + payload.name.substr(0, 4) + '　' + payload.text.replace(/[\/\.\$\[\]#\t]/ig, '').substr(0, 30)
        const videoTime = Math.floor(getVideoTime())
        newChats[newKey] = {
          text: payload.text,
          effect: payload.effect,
          name: payload.name,
          color: payload.color,
          fingerprint: fingerprint,
          videoTime: Math.floor(videoTime / 3600) + ':' + Math.floor(videoTime % 3600 / 60) + ':' + Math.floor(videoTime % 3600 % 60)
        }
        return newChats
      }).then(() => {
        // set to old chat
        Object.keys(oldChat).map(k => firebase.database().ref('oldChat').child(k).set(oldChat[k]))
        // calculate record
        let addRecord = {
          effect: 0,
          chat: 0,
          sticker: 0,
        }
        if (payload.effect)
          addRecord.effect = 1
        else {
          addRecord.chat = payload.text.replace(/\[表情\d+\]/g, '').length
          const match = payload.text.match(/\[表情\d+\]/g)
          if (match) {
            const stickerCount = match.length
            addRecord.sticker = stickerCount
          } else
            addRecord.sticker = 0
        }
        // update for ranking
        if ('系統' == payload.name)
          return
        let newUserInfo
        firebase.database().ref('user/' + payload.name).transaction(function (user) {
          if (!user)
            return
          user.totalEffectCount = user.totalEffectCount ? user.totalEffectCount + addRecord.effect : addRecord.effect
          user.totalChatCount = user.totalChatCount ? user.totalChatCount + addRecord.chat : addRecord.chat
          user.totalStickerCount = user.totalStickerCount ? user.totalStickerCount + addRecord.sticker : addRecord.sticker
          newUserInfo = { ...user }
          return user
        }).then(() => firebase.database().ref('record/' + payload.name).transaction(function (user) {
          if (!newUserInfo)
            return
          user = user || newUserInfo
          user.currEffectCount = user.currEffectCount ? user.currEffectCount + addRecord.effect : addRecord.effect
          user.currChatCount = user.currChatCount ? user.currChatCount + addRecord.chat : addRecord.chat
          user.currStickerCount = user.currStickerCount ? user.currStickerCount + addRecord.sticker : addRecord.sticker
          user.totalEffectCount = newUserInfo.totalEffectCount
          user.totalChatCount = newUserInfo.totalChatCount
          user.totalStickerCount = newUserInfo.totalStickerCount
          return user
        }))
      }).catch(res => console.log(['Cannot submitChat for ' + fingerprint, res]))
    ).map(dummy)
  })