import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Login from './Login.vue';
import SignUp from './SignUp.vue';
import Form from './Form.vue';
import Posts from './Posts.vue';
import PageNotFound from './PageNotFound.vue';
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

Vue.component('title-msg', {
  template: `
  <div class="uk-section uk-section-xsmall uk-section-secondary uk-width-1 uk-align-center">
    <div class="uk-container">
    <h3> <u> <i>Welcome to ItemFinder</i></u></h3>
      <div class="uk-grid-match" uk-grid>
        <h4 class="uk-align-center">This is an application to help you find items you may have lost, <br>
          or to post items that you found on campus and
          where you left them.</h4>
      </div>
    </div>
  </div>
`
})

Vue.component('page-error', {
  template: `
<div class="uk-section uk-section-xsmall uk-section-primary uk-width-1 uk-align-center">
    <div class="uk-container">
    <h1><i>nothing here..</i></h1>
      <div class="uk-grid-match" uk-grid>
        <h3 class="uk-align-center">Use the navbar to go somewhere.</h3>
      </div>
    </div>
  </div>
`
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
    name: 'PageNotFound',
    path: '*/',
    component: PageNotFound
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
    name: 'profile',
    path: '/profile',
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
    PageNotFound,
    SpecificInfo,
    Profile
  },
  router,
  render: h => h(App)
})
