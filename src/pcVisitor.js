// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import PcVisitorPage from './components/PcVisitor/Page'
import store from './store/visitorStore'

Vue.config.productionTip = false
Vue.use(VTooltip)

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  components: { PcVisitorPage },
  template: '<PcVisitorPage/>'
})
