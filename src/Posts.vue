<template>
  <div>
    <div v-if="!authUser">
      <br>
      <h2> Please Sign in</h2>
    </div>
    <div v-else>
      <h1>V else test</h1>
      <div>
        <div v-for="post in usersData" v-bind:key="post['.key']">
          <div v-if="authUser.uid == post.userId">
            <p>Edit: {{post.itemInformation.itemName}}</p>

          </div>
          <div v-else>

          <p>You cant edit this: {{post.itemInformation.itemName}}</p>

          </div>
        </div>

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
    usersRef
  } from './firebase';

  export default {
    name: 'posts',
    data() {
      return {
        authUser: null
      }
    },
    firebase: {
      usersData: usersRef
    },

    methods: {
      signOut() {
        firebase.auth().signOut().then(function () {
          console.log('logged out ' + this.authUser.email + this.authUser.uid)
        }).catch(function (error) {
          // An error happened.
          alert(error)
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
