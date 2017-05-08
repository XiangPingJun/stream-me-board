# stream-me-board [![Build Status](https://travis-ci.org/yamafaktory/babel-react-rollup-starter.svg?branch=master)](https://travis-ci.org/yamafaktory/babel-react-rollup-starter) [![npm version](https://img.shields.io/npm/v/babel-react-rollup-starter.svg?style=flat)](https://www.npmjs.com/package/babel-react-rollup-starter) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

An epic interface for audience interactive with live stream broadcasters.
> Using [React](https://facebook.github.io/react/),  [Redux](https://github.com/reactjs/redux),  [RxJS](https://github.com/Reactive-Extensions/RxJS),  [firebase](firebase.google.com), [Babel](http://babeljs.io/), and [Rollup](http://rollupjs.org/).

## Chat with Screen Effects!

<img src='http://i.imgur.com/ZPkPX9W.jpg'>

> All the chat messages will pop-up like a comic bubble with motion effect.
> Audience can also use special screen effect to cheer the party alive!

## Hit and Vote!

<img src='http://i.imgur.com/kqHG3su.png'>

> Broadcaster can also raise a vote that does not like any vote you have seen, we count all the mouse clicks for every body.
> If the audience really like the candidate, they will sure hit harder on their mouse!

## Chat robot!

<img src='http://i.imgur.com/SplxupV.jpg'>

> You can use the [chat robot](https://github.com/XiangPingJun/chat-robot)

## Installation

1. Apply for a firebase database.
2. Create an admin account 'admin@admin.com' in Authentication
3. Create a 'system' data like below:

<img src='http://i.imgur.com/uvXzzk9.png'>


4. Create a file `config/firebase.js` and fill your apiKey:


```javascript
const FirebaseConf = {
	apiKey: 'XXXXXXXXXXXXXXXXXX',
	authDomain: 'XXXXXXXXXX.firebaseapp.com',
	databaseURL: '//XXXXXXXXXX.firebaseio.com',
	storageBucket: '',
	messagingSenderId: '0000000000000'
}
export default FirebaseConf
```

5. Install [node.js](https://nodejs.org/) and run command:

```sh
npm install
```

6. Install [firebase CLI](https://firebase.google.com/docs/hosting/quickstart) for hosting the page on firebase

## Build and deploy

```sh
npm build-watch
npm build-stream
npm build-admin
# This will build the watch, stream, admin page

firebase deploy
# Upload the built page to firebase hosting, you can later view on firebase
```

* It will then all files in public/ for your production.
* Merge `stream.html` to your Open Broadcaster Software for chat and screen effect.
* Use `admin.html` with your password to begin a broadcast on youtube and start vote.
* Share your `watch.html` link to your audience!

## System Architecture

<img src='http://i.imgur.com/xmDqWPU.png'>

* `stream.html` shows the comic-like dialog and screen effect, can be merge to video source through [Open Broadcaster Software](https://obsproject.com/)
* `watch.html` is the page audience will be look at.
* `admin.html` can be used to manage the page.
* A [chat robot](https://github.com/XiangPingJun/chat-robot) that runs on different machine.
