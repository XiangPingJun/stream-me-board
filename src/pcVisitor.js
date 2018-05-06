// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import Page from './components/PcVisitor/Page'
import store from './store/visitorStore'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(VTooltip)
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  components: { Page },
  template: '<Page/>'
})
