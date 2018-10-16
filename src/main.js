import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Login from './Login.vue';
import SignUp from './SignUp.vue';
import Form from './Form.vue';
import Posts from './Posts.vue';
import Information from './Information.vue';
import SpecificInfo from './SpecificInfo.vue';

import firebase from 'firebase';
import VueFire from 'vuefire';
import './firebase';
import * as VueGoogleMaps from "vue2-google-maps";



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
      requiresAuth: true //https://router.vuejs.org/guide/advanced/meta.html
      // Currently there is just pseduo authentication
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
      //requiresAuth: true //https://router.vuejs.org/guide/advanced/meta.html
      // Currently there is just pseduo authentication
    }
  }

]
const router = new VueRouter({
  routes,
  mode: 'history' // short for `routes: routes`
})

new Vue({
  el: '#app',
  components: {
    Login,
    SignUp,
    Form,
    Posts,
    Information,
    SpecificInfo
  },
  router,
  render: h => h(App)
})