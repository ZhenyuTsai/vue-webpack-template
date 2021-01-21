import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import About from '../views/About/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { path: '/home', component: Home },
  { path: '/about', component: About }
] 

const router = new VueRouter({
  routes
})

export default router