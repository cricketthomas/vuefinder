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
          <div>

            <div>
              <strong>Item Information:</strong>
              <p>Lost Item: {{post.item_info.itemName}}</p>
              <p>Lost description: {{post.item_info.itemDescription}}</p>

              <br>
              <strong>Contact Information:</strong> <br>
              Email: {{post.item_info.contactEmail}} <br>
              Phone:{{post.item_info.contactPhone}}

            </div>

            <router-link :to="{ name: 'information', params: { allInfo: post.item_info }}">Details</router-link>


            <button v-show="authUser.uid == post.item_info.userId" @click="deletePost(post)">Delete</button>
            <hr>

          </div>

        </div>

      </div>



    </div>
    <router-view></router-view>
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
  import {
    privateRef
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
      },
      deletePost(post) {
        usersRef.child(post['.key']).remove()
        console.log("Remove post Sucess")
      }


    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })

    }
  }
</script>