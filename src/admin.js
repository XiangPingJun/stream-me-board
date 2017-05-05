import FirebaseConf from '../config/firebase.js'
import './style/common.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import Admin from './containers/Admin.jsx'
import Rx from "rxjs/Rx"
import { Provider } from 'react-redux'
import store from './misc/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

firebase.initializeApp(FirebaseConf)
const muiTheme = getMuiTheme({
  fontFamily: "'Noto Sans TC', sans-serif"
})
function onInputKey(e) {
  console.log(e)
}

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      {isAdmin ? <Admin /> : <input onKeyDown={onInputKey} />}
    </MuiThemeProvider>
  </Provider>
), document.querySelector('main'))