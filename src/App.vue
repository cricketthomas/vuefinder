<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div v-if="!authUser">
      <router-link to="login">Login In</router-link>
      <br>
      <br>
      <router-link to="signup">Sign Up</router-link>
    </div>
    <div v-else>
      <router-link to="./form">Form</router-link>
      <br>
      <router-link to="./posts">Posts</router-link>
      <br>
      <button @click="signOut()">Sign Out: {{authUser.email}}</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import './firebase';

  import SignUp from './SignUp.vue'

  export default {
    name: 'app',
    data() {
      return {
        msg: "App",
        authUser: null
      }
    },
    methods: {
      //account methods
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        console.log('logged in')
      },
      signOut() {
        firebase.auth().signOut()
        console.log('logged out' + this.authUser.email)
      }

    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })

    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
