<template>
  <div>
    <div v-if="!authUser">
      <br>
      <h2> Please Sign in</h2>
    </div>
    <div v-else>
      <h1>V else test</h1>
      <div>
        <ul v-for="post in posts" v-bind:key="post['.key']">

          <li>{{post.itemName}}</li>
        </ul>

      </div>



    </div>
  </div>
</template>
<script>
  import './firebase';
  import firebase, {
    functions
  } from 'firebase'
  import {
    postsRef
  } from './firebase';

  export default {
    name: 'posts',
    data() {
      return {
        authUser: null
      }
    },
    firebase: {
      posts: postsRef
    },

    methods: {
      signOut() {
        firebase.auth().signOut().then(function () {
          console.log('logged out' + this.authUser.email)
        }).catch(function (error) {
          // An error happened.
        });
      }

    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })

    }
  }

</script>
