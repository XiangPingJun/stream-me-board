import FirebaseConf from '../config/firebase.js'
import './style/common.scss'
import './style/animate.css'
import React from 'react'
import ReactDOM from 'react-dom'
import PageView from './containers/PageView.jsx'
import Background from './components/Background.jsx'
import Rx from "rxjs/Rx"
import { Provider } from 'react-redux'
import store from './misc/store'

firebase.initializeApp(FirebaseConf)

ReactDOM.render((
  <Provider store={store}>
    <PageView />
  </Provider>
), document.querySelector('main'))

ReactDOM.render(<Background />, document.querySelector('#background'))