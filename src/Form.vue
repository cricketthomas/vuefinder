<template>
  <div>
    <div v-if="!authUser">
    </div>
    <div v-else>
      <fieldset>
        <label for="item">Item Lost Name</label>
        <input type="text" placeholder="Item Name" v-model="newPosts.itemName">
        <p>{{newPosts.itemName}}</p>
        <button @click="addPost()">Submit Post</button>
      </fieldset>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import './firebase';
  import {
    postsRef
  } from './firebase';

  import App from './App.vue'

  export default {
    name: 'app',
    data() {
      return {
        authUser: null,
        newPosts: {
          itemName: ''
        }
      }
    },
    firebase: {
      posts: postsRef
    },
    methods: {
      addPost() {
        postsRef.push(this.newPosts)
        this.newPosts.itemName = ''
        console.log("Submitted")
      },
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
