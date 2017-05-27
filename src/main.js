import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.directive('fbdtouchmove', {
  inserted(el) {
    el.ontouchmove = (e) => {
      e.preventDefault()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
