# stream-me-board 

An epic interface for audience interactive with live stream broadcasters.
> Using [Vue](https://github.com/vuejs/vue),  [Vuex](https://github.com/vuejs/vuex),  [firebase](firebase.google.com), [Babel](http://babeljs.io/), and [Webpack](https://webpack.js.org/).

## Chat with Screen Effects!

<img src="doc/images/ScreenshotWatch.png?raw=true">

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

1. Install [firebase CLI](https://firebase.google.com/docs/hosting/quickstart) for hosting the page on firebase
2. Init the firebase

```sh
firebase init
```

6. Create a file `static/firebase-conf.js` and fill your apiKey:

```javascript
firebase.initializeApp({
	apiKey: 'XXXXXXXXXXXXXXXXXX',
	authDomain: 'XXXXXXXXXX.firebaseapp.com',
	databaseURL: '//XXXXXXXXXX.firebaseio.com',
	storageBucket: '',
	messagingSenderId: '0000000000000'
})
```

7. Install [node.js](https://nodejs.org/) and run command:

```sh
npm install
```

## Build and run test
```sh
npm run start
```
Then you can test your page on http://localhost:8080

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

8. System Architecture

<img src="doc/images/SystemArchitecture.png?raw=true">

* `stream.html` shows the comic-like dialog and screen effect, can be merge to video source through [Open Broadcaster Software](https://obsproject.com/)
* `watch.html` is the page audience will be look at.
* `admin.html` can be used to manage the page.
* A [chat robot](https://github.com/XiangPingJun/chat-robot) that runs on different machine.
