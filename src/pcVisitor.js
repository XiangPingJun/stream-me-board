// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import PcVisitorPage from './components/PcVisitor/Page'
import store from './store/visitorStore'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  components: { PcVisitorPage },
  template: '<PcVisitorPage/>'
})
