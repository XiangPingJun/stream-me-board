webpackJsonp([5],{G4pG:function(t,e,n){"use strict";var r={props:["index","large","whoAmI","preserved","align"],computed:{style:function(){var t=void 0,e=void 0,n=this.preserved?"preserved":"character";return this.large?(t=32,e="large"):(t=24,e="small"),{"background-image":"url(static/"+n+"-"+e+".png)","background-position-x":-1*t*(this.index%10)+"px","background-position-y":-1*t*Math.floor(this.index/10)+"px",width:t+"px",height:t+"px",filter:this.whoAmI?"brightness(0%)":"initial"}}}},a={render:function(){var t=this.$createElement;return(this._self._c||t)("img",{staticClass:"avatar",style:this.style,attrs:{src:"static/blank.png",align:this.align}})},staticRenderFns:[]};var s=n("VU/8")(r,a,!1,function(t){n("uw/i")},"data-v-3ea37591",null);e.a=s.exports},MvGc:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"f",function(){return a}),n.d(e,"d",function(){return s}),n.d(e,"c",function(){return i}),n.d(e,"l",function(){return u}),n.d(e,"h",function(){return c}),n.d(e,"j",function(){return d}),n.d(e,"i",function(){return f}),n.d(e,"g",function(){return m}),n.d(e,"e",function(){return l}),n.d(e,"b",function(){return p}),n.d(e,"k",function(){return v});var r=["FF004D","00E756","FFF1E8","FF77A8","00E756","FF004D","AB5236","FFFF27","FFFF27","00E756","FF77A8","7E2553","008751","29ADFF","1D2B53","FF004D","FF004D","83769C","83769C","7E2553","29ADFF","FFA300","FF004D","AB5236","FFFF27","FFFF27","FF004D","29ADFF","FFA300","FF77A8","29ADFF","FF004D","FF77A8","FFA300","AB5236","AB5236","83769C","83769C","83769C","83769C"],a=r.length,s=["6ACAAD"],i=(new Fingerprint2).getSync().fprint,o=void 0,u=function(t){return o=t},c=function(){return o&&o.getCurrentTime?o.getCurrentTime():-1},d=function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},f=function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},m=27e3,l=2e4,p=9e3,v={system:{avatarSelected:0,exp:100,name:"系統",preserved:!0}}},NksK:function(t,e){},NsQo:function(t,e){},QSGr:function(t,e,n){"use strict";var r={components:{Avatar:n("G4pG").a},props:["large"],computed:{style:function(){return this.large?{"font-size":"130%","line-height":"20px"}:""}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("notifications",{staticStyle:{"margin-top":"5px"},attrs:{group:"notify",position:"top left",width:"auto"},scopedSlots:t._u([{key:"body",fn:function(e){return[n("div",{staticClass:"notification vue-notification",class:e.item.type,style:t.style},[e.item.data.symbol?n("i",{class:"fas fa-"+e.item.data.symbol}):t._e(),t._v(" "),null!=e.item.data.avatar?n("Avatar",{attrs:{index:e.item.data.avatar}}):t._e(),t._v(" "),n("span",{staticStyle:{"margin-left":"5px"},domProps:{innerHTML:t._s(e.item.text)}})],1)]}}])})},staticRenderFns:[]};var s=n("VU/8")(r,a,!1,function(t){n("NsQo")},null,null);e.a=s.exports},qczc:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),a=n("VN6J"),s=n("W3Iv"),i=n.n(s),o=n("BO1k"),u=n.n(o),c=n("d7EF"),d=n.n(c),f=n("fZjL"),m=n.n(f),l=n("Dd8w"),p=n.n(l),v=n("NYxO"),h={data:function(){return{name:"",password:"",sending:null,voteOptionCount:2,userSearch:" ",filteredUid:[],showRunTestConfirm:!1}},created:function(){this.subscribeData()},components:{Notify:n("QSGr").a},methods:p()({},Object(v.b)(["subscribeData","loginAdmin","streamWillStart","startStream","stopStream","saveVideoUrl","saveGameTitle","saveGameUrl","saveGameDescription","startVote","sendChat","runTest"])),computed:p()({},Object(v.e)(["voteInfo","isAdmin","stream","voteRoster","quizRoster","quizInfo","allUsers"])),mounted:function(){var t=this;this.unsubscribeAction=this.$store.subscribeAction(function(e,n){if("notify"==e.type)return t.$notify(p()({group:"notify",data:p()({},e.payload.data)},e.payload))})},beforeDestroy:function(){this.unsubscribeAction()},watch:{stream:function(t,e){var n=this;null!=t.status&&null!=e.status&&t.status!=e.status&&("WILL_START"==t.status?setTimeout(function(){return n.sendChat({uid:"system",text:"直播即將開始～快點先來卡個位吧！"})},3e3):"STARTED"==t.status?setTimeout(function(){return n.sendChat({uid:"system",text:"直播開始囉！大家坐穩啦！"})},3e3):"ENDED"==t.status&&this.sendChat({uid:"system",text:"直播結束囉！期待下次與大家相會！"}))},userSearch:function(t,e){if(t=t.trim().toLowerCase()){this.filteredUid=[];var n=!0,r=!1,a=void 0;try{for(var s,o=u()(i()(this.allUsers));!(n=(s=o.next()).done);n=!0){var c=s.value,f=d()(c,2),l=f[0];(f[1].name.toLowerCase().indexOf(t)>=0||l.toLowerCase().indexOf(t)>=0)&&this.filteredUid.push(l)}}catch(t){r=!0,a=t}finally{try{!n&&o.return&&o.return()}finally{if(r)throw a}}}else this.filteredUid=m()(this.allUsers)},allUsers:function(t,e){0==m()(e).length&&(this.userSearch="")}}},y={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[0==t.isAdmin?n("div",[n("form",{on:{submit:function(e){e.preventDefault(),t.loginAdmin({name:t.name,password:t.password}),t.sending=!0}}},[n("h2",[t._v("無管理權限，登入暱稱:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v("密碼"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),n("input",{attrs:{type:"submit"},domProps:{value:t.sending?"sending...":""}})])]):t._e(),t._v(" "),t.isAdmin?n("div",["WILL_START"==t.stream.status?n("h1",[t._v("沒有直播")]):t._e(),t._v(" "),"STARTED"==t.stream.status?n("h1",[t._v("直播中")]):t._e(),t._v(" "),"ENDED"==t.stream.status?n("h1",[t._v("沒有直播")]):t._e(),t._v(" "),n("p"),t._v(" "),n("div",[t._v("影片網址:")]),t._v(" "),n("input",{attrs:{onfocus:"this.select()"},domProps:{value:t.stream.videoUrl},on:{change:function(e){return t.saveVideoUrl(e.target.value.trim())}}}),t._v(" "),n("p"),t._v(" "),n("div",[t._v("今天跟大家一起玩的是:")]),t._v(" "),n("input",{attrs:{onfocus:"this.select()"},domProps:{value:t.stream.gameTitle},on:{change:function(e){return t.saveGameTitle(e.target.value.trim())}}}),t._v(" "),n("div",[t._v("連結:")]),t._v(" "),n("input",{attrs:{onfocus:"this.select()"},domProps:{value:t.stream.gameUrl},on:{change:function(e){return t.saveGameUrl(e.target.value.trim())}}}),t._v(" "),n("div",[t._v("簡述:")]),t._v(" "),n("input",{attrs:{onfocus:"this.select()"},domProps:{value:t.stream.gameDescription},on:{change:function(e){return t.saveGameDescription(e.target.value.trim())}}}),t._v(" "),n("p"),t._v(" "),n("button",{attrs:{disabled:"WILL_START"==t.stream.status||"STARTED"==t.stream.status},on:{click:t.streamWillStart}},[t._v("即將開始")]),t._v(" "),n("button",{attrs:{disabled:"STARTED"==t.stream.status||"ENDED"==t.stream.status},on:{click:t.startStream}},[t._v("開始")]),t._v(" "),n("button",{attrs:{disabled:"ENDED"==t.stream.status},on:{click:t.stopStream}},[t._v("結束")]),t._v(" "),n("p"),t._v(" "),n("label",[t._v("選項數:")]),t._v(" "),t._l(new Array(4),function(e,r){return n("label",{key:r},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.voteOptionCount,expression:"voteOptionCount"}],attrs:{type:"radio",disabled:!t.voteInfo.ended,name:"vote-option-count"},domProps:{value:r+2,checked:t._q(t.voteOptionCount,r+2)},on:{change:function(e){t.voteOptionCount=r+2}}}),t._v(" "+t._s(r+2)+"個 \n    ")])}),t._v(" "),t.voteInfo.ended?n("button",{on:{click:function(e){t.startVote(t.voteOptionCount)}}},[n("i",{staticClass:"fa fa-chart-bar"}),t._v(" 投票")]):t._e(),t._v(" "),t.voteInfo.ended?t._e():n("button",{attrs:{disabled:!0}},[n("i",{staticClass:"fas fa-spinner fa-pulse"}),t._v(" 投票進行中")]),t._v(" "),n("p"),t._v(" "),n("div",[t._v("尋找uid:")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.userSearch,expression:"userSearch"}],domProps:{value:t.userSearch},on:{input:function(e){e.target.composing||(t.userSearch=e.target.value)}}}),t._v(" "),n("div",{staticStyle:{height:"200px","overflow-y":"auto"}},t._l(t.filteredUid,function(e){return n("div",{key:e},[t._v(t._s(t.allUsers[e].name)+"　　"),n("i",[t._v(t._s(e))])])})),t._v(" "),n("p"),t._v(" "),n("div",[t._v("跑測試:")]),t._v(" "),n("button",{attrs:{disabled:t.showRunTestConfirm},on:{click:function(e){t.showRunTestConfirm=!0}}},[t._v("跑測試")]),t._v(" "),t.showRunTestConfirm?n("button",{on:{click:t.runTest}},[t._v("確認測試")]):t._e(),t._v(" "),n("p")],2):t._e(),t._v(" "),n("Notify",{attrs:{large:!0}})],1)},staticRenderFns:[]};var x=n("VU/8")(h,y,!1,function(t){n("NksK")},null,null).exports,w=n("wtEF"),g=n("CLX7"),b=n.n(g);r.default.config.productionTip=!1,r.default.use(a.a),r.default.use(b.a),new r.default({store:w.a,el:"#app",components:{Page:x},template:"<Page/>"})},"uw/i":function(t,e){},wtEF:function(t,e,n){"use strict";var r=n("lHA8"),a=n.n(r),s=n("Gu7T"),i=n.n(s),o=n("Dd8w"),u=n.n(o),c=n("d7EF"),d=n.n(c),f=n("W3Iv"),m=n.n(f),l=n("7+uW"),p=n("NYxO"),v=n("gRE1"),h=n.n(v),y=n("bOdI"),x=n.n(y),w=n("BO1k"),g=n.n(w),b=n("Xxa5"),A=n.n(b),_=n("exGp"),I=n.n(_),U=n("fZjL"),S=n.n(U),k=n("2aIq"),F=n.n(k),T=n("MvGc"),M=n("Z8es"),E=n.n(M),C=firebase.firestore();C.settings({timestampsInSnapshots:!0});var L=function(){},R={notify:function(t){F()(t)},subscribeData:function(t){var e,n=this,r=t.state,a=t.commit,s=t.dispatch;C.doc("system/ban").onSnapshot(function(t){t.data().fingerprint.find(function(t){return t==T.c})&&(s("logout"),s("notify",{type:"error",text:"You got banned!"}))}),C.collection("user").onSnapshot(function(t){var e=u()({},T.k);t.forEach(function(t){return e[t.id]=t.data()}),a("setAllUsers",e)}),setInterval(function(){return s("sendHeartbeat")},12e4),C.doc("activity/online").onSnapshot(function(t){return a("setOnlineUids",S()(t.data()))}),C.doc("system/stream").onSnapshot(function(t){r.stream.time!=t.data().time&&(L(),L=C.collection("allChat/"+t.data().time+"/chat-line").onSnapshot(function(t){a("setChatLines",t.docs.map(function(t){return t.data()}).reverse())})),a("setStream",t.data()),s("checkTrophy")}),C.doc("system/info").onSnapshot(function(t){t.data().version&&t.data().version!=localStorage.version&&(localStorage.version=t.data().version,window.location.reload(!0)),a("setSystemInfo",t.data())}),firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL),firebase.auth().onAuthStateChanged((e=I()(A.a.mark(function t(e){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!e){t.next=19;break}return a("setMyUid",e.uid),a("updateUiMode",{account:"MY_INFO"}),t.prev=4,t.next=7,C.collection("adminUser").get();case 7:a("setIsAdmin",!0),t.next=17;break;case 10:if(t.prev=10,t.t0=t.catch(4),"permission-denied"!=t.t0.code){t.next=16;break}a("setIsAdmin",!1),t.next=17;break;case 16:throw t.t0;case 17:t.next=22;break;case 19:a("setIsAdmin",!1),a("setMyUid",null),a("updateUiMode",{account:"ANONYMOUS"});case 22:s("sendHeartbeat"),t.next=29;break;case 25:throw t.prev=25,t.t1=t.catch(0),s("notify",{type:"error",text:t.t1.message}),t.t1;case 29:case"end":return t.stop()}},t,n,[[0,25],[4,10]])})),function(t){return e.apply(this,arguments)})),C.doc("system/vote").onSnapshot(function(t){t.data().ended?setTimeout(function(){return a("updateUiMode",{vote:!1})},3e3):a("updateUiMode",{vote:!0}),(!r.voteInfo.time||t.data().time&&r.voteInfo.time.seconds!=t.data().time.seconds)&&a("initVoteRoster",t.data().optionCount),a("setVoteInfo",t.data())}),C.doc("activity/vote").onSnapshot({includeMetadataChanges:!0},function(t){if(!t.metadata.hasPendingWrites){var e=!0,n=!1,r=void 0;try{for(var s,i=g()(m()(t.data()));!(e=(s=i.next()).done);e=!0){var o=s.value,u=d()(o,2),c=u[0],f=u[1];a("addVotes",{uid:c,votes:f})}}catch(t){n=!0,r=t}finally{try{!e&&i.return&&i.return()}finally{if(n)throw r}}}}),C.doc("system/quiz").onSnapshot(function(t){t.data().ended?(r.quizInfo.A===r.myAnswer&&s("addExp",12),setTimeout(function(){return a("updateUiMode",{quiz:!1})},3e3)):(a("setMyAnswer",null),a("updateUiMode",{quiz:!0})),(!r.quizInfo.time||t.data().time&&r.quizInfo.time.seconds!=t.data().time.seconds)&&a("initQuizRoster",t.data().OP),a("setQuizInfo",t.data())}),C.doc("activity/quiz").onSnapshot({includeMetadataChanges:!0},function(t){if(!t.metadata.hasPendingWrites){var e=!0,n=!1,r=void 0;try{for(var s,i=g()(m()(t.data()));!(e=(s=i.next()).done);e=!0){var o=s.value,u=d()(o,2),c=u[0],f=u[1];a("addAnswer",{uid:c,answer:f})}}catch(t){n=!0,r=t}finally{try{!e&&i.return&&i.return()}finally{if(n)throw r}}}}),fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyBCYPReX74lujmX9tg8AiM-OFGqmKYMZkU&channelId=UCLeQT6hvBgnq_-aKKlcgj1Q&part=snippet,id&order=date&maxResults=20").then(function(t){return t.json()}).then(function(t){return a("setHistoryVideo",t.items.filter(function(t){return t.id.videoId}))}),a("addPreLoadItem","font"),document.fonts.check("1em Zpix")&&document.fonts.check("1em Mobile Font")?a("donePreLoadItem","font"):document.fonts.addEventListener("loadingdone",function(){return a("donePreLoadItem","font")}),setTimeout(function(){return a("donePreLoadAll")},3e3)},saveMyExp:function(t,e){var n=this,r=t.state;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.collection("user").doc(r.myUid).update({exp:e});case 2:case"end":return t.stop()}},t,n)}))()},saveMyAvatar:function(t,e){var n=this,r=t.state;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.collection("user").doc(r.myUid).update({avatarSelected:e});case 2:case"end":return t.stop()}},t,n)}))()},saveMyBestVoteRecord:function(t,e){var n=this,r=t.state;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.collection("user").doc(r.myUid).update({bestVoteRecord:e});case 2:case"end":return t.stop()}},t,n)}))()},saveMyAvatarList:function(t,e){var n=this,r=t.state;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.collection("user").doc(r.myUid).update({avatarList:e});case 2:case"end":return t.stop()}},t,n)}))()},getTrophy:function(t,e){var n=this,r=t.state,a=t.getters,s=t.dispatch;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!a.myInfo.trophy.includes(e.id)){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,C.collection("user").doc(r.myUid).update({trophy:[].concat(i()(a.myInfo.trophy),[e.id])});case 4:s("addExp",100),s("notify",{data:{symbol:"trophy"},text:e.text});case 6:case"end":return t.stop()}},t,n)}))()},addMyViewedStream:function(t,e){var n=this,r=t.state,a=t.getters;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.collection("user").doc(r.myUid).update({viewedStream:[].concat(i()(a.myInfo.viewedStream),[e])});case 2:case"end":return t.stop()}},t,n)}))()},addExp:function(t,e){var n=t.getters,r=t.dispatch,a=n.myInfo.exp+e;if(Math.floor(a/100)>Math.floor(n.myInfo.exp/100)){var s=n.randomNextAvatar;null===s?r("notify",{text:"升滿了?! 你真的有認真在看直播嗎?"}):(r("saveMyAvatarList",[].concat(i()(n.myInfo.avatarList),[s])),r("notify",{data:{avatar:s},text:"升級! 獲得新角色!"}))}r("saveMyExp",a)},checkTrophy:function(t){var e=t.getters,n=t.state,r=t.dispatch;e.myInfo.name&&("STARTED"!=n.stream.status||e.myInfo.viewedStream.includes(n.stream.time)||(e.myInfo.trophy.includes("WATCH_FIRST_TIME")?r("notify",{data:{symbol:"trophy"},text:"上來看直播！"}):r("getTrophy",{text:"第一次來看直播！",id:"WATCH_FIRST_TIME"}),r("addExp",100),n.isAdmin||setTimeout(function(){return r("sayHello")},5e3),r("addMyViewedStream",n.stream.time)))},sendHeartbeat:function(t){var e=this,n=t.state,r=t.getters;return I()(A.a.mark(function t(){var a;return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=T.c+" "+n.anonymousAvatar,!n.myUid){t.next=9;break}return t.next=4,C.doc("activity/online").update(x()({},n.myUid,firebase.firestore.FieldValue.serverTimestamp()));case 4:return bowser.name!=r.myInfo.browser&&C.collection("user").doc(n.myUid).update({browser:bowser.name}),t.next=7,C.doc("activity/online").update(x()({},a,firebase.firestore.FieldValue.delete()));case 7:t.next=11;break;case 9:return t.next=11,C.doc("activity/online").update(x()({},a,firebase.firestore.FieldValue.serverTimestamp()));case 11:case"end":return t.stop()}},t,e)}))()},loginAdmin:function(t,e){var n=this,r=t.state,a=t.dispatch;return I()(A.a.mark(function t(){var s;return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,s=h()(r.allUsers).find(function(t){return t.name==e.name}),t.next=4,firebase.auth().signInWithEmailAndPassword(s.email,e.password);case 4:t.next=10;break;case 6:throw t.prev=6,t.t0=t.catch(0),a("notify",{type:"error",text:t.t0.message}),t.t0;case 10:case"end":return t.stop()}},t,n,[[0,6]])}))()},loginVisitor:function(t,e){var n=this,r=t.dispatch,a=t.state;return I()(A.a.mark(function t(){var s,i,o,u,c,f,l,p,v,y,x;return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:t.prev=0,s=!0,i=!1,o=void 0,t.prev=4,u=g()(m()(T.k));case 6:if(s=(c=u.next()).done){t.next=16;break}if(f=c.value,l=d()(f,2),l[0],p=l[1],e!=p.name){t.next=13;break}throw{code:"auth/wrong-password"};case 13:s=!0,t.next=6;break;case 16:t.next=22;break;case 18:t.prev=18,t.t0=t.catch(4),i=!0,o=t.t0;case 22:t.prev=22,t.prev=23,!s&&u.return&&u.return();case 25:if(t.prev=25,!i){t.next=28;break}throw o;case 28:return t.finish(25);case 29:return t.finish(22);case 30:if(!(v=h()(a.allUsers).find(function(t){return t.name==e}))){t.next=36;break}return t.next=34,firebase.auth().signInWithEmailAndPassword(v.email,"dummy-password");case 34:t.next=43;break;case 36:return y=E.a.generate()+"@mail.net",t.next=39,firebase.auth().createUserWithEmailAndPassword(y,"dummy-password");case 39:return x=t.sent,t.next=42,C.collection("user").doc(x.uid).set({name:e,uid:x.uid,avatarList:[a.anonymousAvatar],avatarSelected:a.anonymousAvatar,exp:0,email:y,viewedStream:[],trophy:[]});case 42:r("checkTrophy");case 43:t.next=54;break;case 45:if(t.prev=45,t.t1=t.catch(0),"auth/wrong-password"!=t.t1.code){t.next=52;break}r("notify",{type:"error",text:"暱稱已被使用!"}),r("promptLogin"),t.next=54;break;case 52:throw r("notify",{type:"error",text:t.t1.message}),t.t1;case 54:case"end":return t.stop()}},t,n,[[0,45],[4,18,22,30],[23,,25,29]])}))()},logout:function(t){var e=this,n=t.state,r=t.dispatch,a=t.commit;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a("generateAnonymousAvatar"),t.next=4,C.doc("activity/online").update(x()({},n.myUid,firebase.firestore.FieldValue.delete()));case 4:return t.next=6,firebase.auth().signOut();case 6:a("updateUiMode",{selectAvatar:!1}),t.next=13;break;case 9:throw t.prev=9,t.t0=t.catch(0),r("notify",{type:"error",text:t.t0.message}),t.t0;case 13:case"end":return t.stop()}},t,e,[[0,9]])}))()},changeAvatar:function(t,e){var n=t.dispatch,r=t.commit;n("saveMyAvatar",e),r("updateUiMode",{selectAvatar:!1})},sendChat:function(t,e){var n=this,r=t.dispatch,a=t.state;return I()(A.a.mark(function t(){var s,i;return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=(parseInt("zzz",36)-a.chatLines.length).toString(36),s+=e.text.substr(0,10).replace(/\//g,"／"),i=Object(T.h)(),t.next=5,C.collection("allChat").doc(a.stream.time).collection("chat-line").doc(s).set(u()({},e,{uid:e.uid||a.myUid,fingerprint:T.c,videoTime:Math.floor(i/3600)+":"+Math.floor(i%3600/60)+":"+Math.floor(i%3600%60),id:E.a.generate(),time:firebase.firestore.FieldValue.serverTimestamp()}));case 5:"STARTED"==a.stream.status&&r("addExp",3);case 6:case"end":return t.stop()}},t,n)}))()},sendSticker:function(t,e){var n=this,r=t.dispatch,a=t.state;return I()(A.a.mark(function t(){var s,i;return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=(parseInt("zzz",36)-a.chatLines.length).toString(36),i=Object(T.h)(),t.next=4,C.collection("allChat").doc(a.stream.time).collection("chat-line").doc(s).set(u()({},e,{uid:e.uid||a.myUid,fingerprint:T.c,videoTime:Math.floor(i/3600)+":"+Math.floor(i%3600/60)+":"+Math.floor(i%3600%60),id:E.a.generate(),time:firebase.firestore.FieldValue.serverTimestamp()}));case 4:"STARTED"==a.stream.status&&r("addExp",3);case 5:case"end":return t.stop()}},t,n)}))()},promptLogin:function(t){var e=t.commit,n=t.dispatch;e("updateUiMode",{account:"LOGIN"}),n("notify",{type:"warn",text:"輸入暱稱才能繼續喲!",data:{symbol:"exclamation-triangle"}})},promptSelectAvatar:function(t){(0,t.commit)("updateUiMode",{selectAvatar:!0})},saveGameTitle:function(t,e){var n=this,r=t.dispatch;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/stream").update({gameTitle:e});case 2:r("notify",{text:"已更新直播主題"});case 3:case"end":return t.stop()}},t,n)}))()},saveGameUrl:function(t,e){var n=this,r=t.dispatch;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/stream").update({gameUrl:e});case 2:r("notify",{text:"已更新直播主題的連結"});case 3:case"end":return t.stop()}},t,n)}))()},saveGameDescription:function(t,e){var n=this,r=t.dispatch;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/stream").update({gameDescription:e});case 2:r("notify",{text:"已更新直播主題的簡述"});case 3:case"end":return t.stop()}},t,n)}))()},saveVideoUrl:function(t,e){var n=this,r=t.dispatch,a=t.state;return I()(A.a.mark(function t(){var s;return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=function(t){var e=/\/\/youtu.be\/(.*)/.exec(t);return e?D(e[1]):(e=/\/\/www\.youtube\.com\/watch\?v=([^&]+)/.exec(t))?D(e[1]):(e=/\/\/www\.youtube\.com\/embed\/([^?]+)/.exec(t))?D(e[1]):void 0},t.next=3,C.doc("system/stream").set(u()({},a.stream,{videoUrl:s(e)}));case 3:r("notify",{text:"已更新直播影片網址"});case 4:case"end":return t.stop()}},t,n)}))()},startStream:function(t){var e=this;return F()(t),I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/stream").update({status:"STARTED"});case 2:case"end":return t.stop()}},t,e)}))()},streamWillStart:function(t){var e=this;return F()(t),I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/stream").update({time:(new Date).toLocaleString().replace(/\//g,"-"),status:"WILL_START"});case 2:case"end":return t.stop()}},t,e)}))()},stopStream:function(t){var e=this;return F()(t),I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/stream").update({status:"ENDED"});case 2:case"end":return t.stop()}},t,e)}))()},startVote:function(t,e){var n=this;return F()(t),I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/vote").set({time:firebase.firestore.FieldValue.serverTimestamp(),optionCount:e,ended:!1});case 2:return t.next=4,C.doc("activity/vote").set({});case 4:case"end":return t.stop()}},t,n)}))()},sendVote:function(t,e){var n=this,r=t.state,a=t.dispatch;return I()(A.a.mark(function t(){var s;return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,C.doc("activity/vote").update(x()({},r.myUid,e));case 3:s=e.reduce(function(t,e){return t+e}),a("sendChat",{text:"+"+s+"票！"}),s>20&&a("getTrophy",{text:"快手指！投超過20票！",id:"QUICK_VOTE_FINGER"}),a("addExp",s-3),t.next=15;break;case 9:if(t.prev=9,t.t0=t.catch(0),"permission-denied"!=t.t0.code){t.next=13;break}return t.abrupt("return");case 13:throw a("notify",{type:"error",text:t.t0.message}),t.t0;case 15:case"end":return t.stop()}},t,n,[[0,9]])}))()},sendAnswer:function(t,e){var n=this,r=t.state,a=t.dispatch,s=t.commit;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,C.doc("activity/quiz").update(x()({},r.myUid,e));case 3:"STARTED"==r.stream.status&&a("sendChat",{text:r.quizInfo.OP[e]+"+1"}),s("setMyAnswer",e),t.next=13;break;case 7:if(t.prev=7,t.t0=t.catch(0),"permission-denied"!=t.t0.code){t.next=11;break}return t.abrupt("return");case 11:throw a("notify",{type:"error",text:t.t0.message}),t.t0;case 13:case"end":return t.stop()}},t,n,[[0,7]])}))()},playHistory:function(t,e){(0,t.commit)("setSelectedVideoUrl",D(e))},sayHello:function(t){var e=["安安ice 安安祥平 平安喜樂","YO~ice~祥平","ice、祥平我來啦！","ㄤㄤice&祥平&大家！","哈囉大家～","哈囉ice&祥平","大家空邦挖～ice和祥平空邦挖～","上來看實況喔耶！","Hi~~~~ice&祥平","(拉椅子、望向ice和祥平)","(悄悄地登入)","(用力地揮手)"];(0,t.dispatch)("sendChat",{text:e[Math.floor(Math.random()*e.length)]})},runTest:function(t){var e=this;t.state,t.dispatch,t.commit;return I()(A.a.mark(function t(){return A.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.doc("system/quizHistory").set({});case 2:case"end":return t.stop()}},t,e)}))()}};function D(t){return"//www.youtube.com/embed/"+t+"?enablejsapi=1"}l.default.use(p.a);var V=function(){return Math.floor(Math.random()*T.f)};e.a=new p.a.Store({state:{myUid:null,allUsers:{},isAdmin:null,stream:{},systemInfo:null,selectedVideoUrl:null,uiMode:{},anonymousAvatar:V(),chatLines:[],onlineUids:[],historyVideo:null,preLoadedItems:{},voteInfo:{ended:!0},voteRoster:[],quizInfo:{ended:!0},quizRoster:[],myAnswer:null},getters:{myInfo:function(t){return t.allUsers[t.myUid]||{}},randomNextAvatar:function(t,e){if(!e.myInfo.name)return V();var n=new Array(T.f).fill(0).map(function(t,e){return e}).filter(function(t){return e.myInfo.avatarList.indexOf(t)<0});return 0==n.length?null:n[Math.floor(Math.random()*n.length)]},onlineUsers:function(t){return t.onlineUids.map(function(e){var n=e.split(" ");return 1==n.length?t.allUsers[e]:{avatarSelected:n[1]}})},videoUrl:function(t){return"STARTED"==t.stream.status?t.stream.videoUrl:t.selectedVideoUrl},voteStartTime:function(t){return t.voteInfo.time?1e3*t.voteInfo.time.seconds:0},voted:function(t){return!!t.voteRoster.find(function(e,n){return e.uids.indexOf(t.myUid)>=0})},quizStartTime:function(t){return t.quizInfo.time?1e3*t.quizInfo.time.seconds:0},quizAnswered:function(t){return!!t.quizRoster.find(function(e,n){return e.uids.indexOf(t.myUid)>=0})},preLoaded:function(t){return m()(t.preLoadedItems).length>0&&0>m()(t.preLoadedItems).findIndex(function(t){var e=d()(t,2);e[0];return 0==e[1]})}},mutations:{setStream:function(t,e){t.stream=e},setSystemInfo:function(t,e){t.systemInfo=e},setAllUsers:function(t,e){t.allUsers=e},setMyUid:function(t,e){t.myUid=e},updateUiMode:function(t,e){t.uiMode=u()({},t.uiMode,e)},setUiMode:function(t,e){t.uiMode=e},setChatLines:function(t,e){t.chatLines=e},setIsAdmin:function(t,e){t.isAdmin=e},generateAnonymousAvatar:function(t,e){t.anonymousAvatar=V()},setOnlineUids:function(t,e){t.onlineUids=e},setHistoryVideo:function(t,e){t.historyVideo=[].concat(i()(e))},setSelectedVideoUrl:function(t,e){t.selectedVideoUrl=e},addPreLoadItem:function(t,e){l.default.set(t.preLoadedItems,e,!1)},donePreLoadItem:function(t,e){l.default.set(t.preLoadedItems,e,!0)},donePreLoadAll:function(t,e){for(var n in t.preLoadedItems)l.default.set(t.preLoadedItems,n,!0)},setVoteInfo:function(t,e){t.voteInfo=e},setMyAnswer:function(t,e){t.myAnswer=e},initVoteRoster:function(t,e){t.voteRoster=new Array(e).fill(0).map(function(t,e){return{option:String.fromCharCode(65+e),uids:[],total:0}})},addVotes:function(t,e){t.voteInfo.ended||e.votes.forEach(function(n,r){if(0!=n&&t.voteRoster[r]&&!(t.voteRoster[r].uids.indexOf(e.uid)>=0)){var a=u()({},t.voteRoster[r]);a.uids=[].concat(i()(a.uids),[e.uid]),a.total+=n,l.default.set(t.voteRoster,r,a)}})},setQuizInfo:function(t,e){t.quizInfo=e},initQuizRoster:function(t,e){t.quizRoster=e.map(function(t,e){return{option:t,uids:[]}})},addAnswer:function(t,e){t.quizInfo.ended||(t.quizRoster[e.answer].uids=[].concat(i()(new a.a([].concat(i()(t.quizRoster[e.answer].uids),[e.uid])))))}},actions:R})}},["qczc"]);
//# sourceMappingURL=admin.8cd8437ed1460d687ebc.js.map