import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
