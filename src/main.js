import Vue from 'vue'
import store from './store'
import router from './router/index.js'
import App from './App.vue'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')