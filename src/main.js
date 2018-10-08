import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Login from './Login.vue'
import SignUp from './SignUp.vue'
import Form from './Form.vue'
import Posts from './Posts.vue'
import firebase from 'firebase'
import VueFire from 'vuefire';
import './firebase'





Vue.use(VueFire)
Vue.use(VueRouter)

const routes = [{
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/form',
    component: Form,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/posts',
    component: Posts,
    meta: {
      requiresAuth: true
    }

  }


]
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
