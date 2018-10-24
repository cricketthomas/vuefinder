import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Login from './Login.vue';
import SignUp from './SignUp.vue';
import Form from './Form.vue';
import Posts from './Posts.vue';
import Information from './Information.vue';
import Profile from './Profile.vue';
import SpecificInfo from './SpecificInfo.vue';
import firebase from 'firebase';
import VueFire from 'vuefire';
import './firebase';
import * as VueGoogleMaps from "vue2-google-maps";
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'


Vue.use(VueChartkick, {
  adapter: Chart
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCJGNkLNfIzR204B2uB2R2YN4wwPRJcpVA',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  },
  //// then disable the following:
  // installComponents: true,
})

Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [{
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    name: "specificinfo",

    path: '/specificinfo/:postkey',
    component: SpecificInfo,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts,
    meta: {
      requiresAuth: true
    }

  },
  {
    name: 'information',
    path: '/information/:allInfo',
    component: Information,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'profile',
    path: '/profile/',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }
]



const router = new VueRouter({
  routes,
  mode: 'history' // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  components: {
    Login,
    SignUp,
    Form,
    Posts,
    Information,
    SpecificInfo,
    Profile
  },
  router,
  render: h => h(App)
})
