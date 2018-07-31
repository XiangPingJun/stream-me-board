# stream-me-board 

An epic interface for audience interactive with live stream broadcasters.
> Using [Vue](https://github.com/vuejs/vue),  [Vuex](https://github.com/vuejs/vuex),  [firebase](firebase.google.com), [Babel](http://babeljs.io/), and [Webpack](https://webpack.js.org/).

## Chat with Screen Effects!

<img src="doc/images/ScreenshotWatch.png?raw=true">

> All the chat messages will pop-up like a comic bubble with motion effect.
> Audience can also use special screen effect to cheer the party alive!

## 8bit style and CSS animation!

<img src="doc/images/AnimateEffect.gif?raw=true">

> We use an 8bit styled interface and user avatars with CSS animation.

## Hit and Vote!

<img src="doc/images/VoteOnWatch.png?raw=true">

> Broadcaster can also raise a vote that does not like any vote you have seen, we count all the mouse clicks for every body.
> If the audience really like the candidate, they will sure hit harder on their mouse!

<img src="doc/images/VoteOverlay.gif?raw=true">

> Voting and chat screen looks like this, we can see the latest voting count.

## Quiz game!

<img src="doc/images/Quiz.png?raw=true">

> There will be quiz games during broadcast, play the game to level up your character!

## Mobile version!

<img src="doc/images/Mobile.png?raw=true">

> Each of the above functions has mobile version, the audience can view it on mobile or pc device.

## Management Controll Page!

<img src="doc/images/Admin.png?raw=true">

> Broadcaster can start broadcast and votes with a decent controll page.

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
npm run build
# This will build the watch, stream, admin page

firebase deploy
# Upload the built page to firebase hosting, you can later view on firebase
```

* It will then all files in `dist/` for your production.
* Use `streamOverlay.html` as your Open Broadcaster Software's browser source for chat and screen effect.
* Use `admin.html` with your password to begin a broadcast on youtube and start vote.
* Share your firebase root link to your audience!

8. System Architecture

<img src="doc/images/SystemArchitecture.png?raw=true">

* `streamOverlay.html` shows the comic-like dialog and screen effect, can be merge to video source through [Open Broadcaster Software](https://obsproject.com/)
* `pc.html` and `mobile.html` is the page audience will be look at.
* `admin.html` can be used to manage the page.
