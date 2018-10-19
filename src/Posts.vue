<template>
  <div>
    <div v-if="!authUser">
      <br>
      <h2> Please Sign in</h2>
    </div>
    <div v-else>
      <h1>V else test</h1>
      <div>
        <input type="text" v-model="search" placeholder="search by item name">
        <p>Vue chart kick here: {{usersData.length}}</p>

        <div v-for="post in filteredPosts" v-bind:key="post['.key']">
          <div>

            <div>
              <strong>Lost Item Information:</strong>
              <p>Item Name{{post.item_info.itemName}}</p>
              <p>Description: {{post.item_info.itemDescription}}</p>
              <strong>Contact Information:</strong> <br>
              Email: {{post.item_info.contactEmail}} <br>
              Phone:{{post.item_info.contactPhone}}
            </div>

            <router-link v-show="false" :to="{ name: 'information', params: { allInfo: post.item_info }}">Details</router-link>
            <button v-show="authUser.uid == post.item_info.userId" @click="deletePost(post)">Delete</button>
            <router-link :to="{ name: 'specificinfo', params: { postkey: post['.key'].slice(1, 30) }}">Details</router-link>
            <hr>
            <!-- -->
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
        authUser: null,
        search: '',
        foundCount: 0,
        notFoundCount: 0,
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
      },
      foundFilter() {
        for (var i = 0; i < this.usersData.length; i++) {
          if (this.usersData.item_info.isFound == "Found") {
            foundCount++;
          }
          notFoundCount++;
        }

      }


    },
    computed: {

      filteredPosts() {
        let searching = (this.search || "").toLowerCase().trim()
        return this.usersData.filter(function (item) {
          let itemNameSearch = (item.item_info.itemDescription || "").toLowerCase()
          return itemNameSearch.indexOf(searching) > -1
        })
      },


    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })
      //foundFilter();


    }
  }

</script>
