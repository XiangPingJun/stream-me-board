import FirebaseConf from '../config/firebase.js'
import './style/common.scss'
import './style/stream.scss'
import './style/animate.css'
import React from 'react'
import ReactDOM from 'react-dom'
import StreamView from './containers/StreamView.jsx'
import Rx from "rxjs/Rx"
import { Provider } from 'react-redux'
import store from './misc/store'

firebase.initializeApp(FirebaseConf)

ReactDOM.render((
  <Provider store={store}>
    <StreamView />
  </Provider>
), document.querySelector('main'))