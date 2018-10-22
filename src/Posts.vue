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
        <p>Vue chart kick here: Found: {{foundFilter}} Not found: {{notFoundFilter}} </p>
        <pie-chart class="pieChart" :donut="true" :colors="['#666','#b00']" :data="[['Items Returned', foundFilter], ['Items Still Lost', notFoundFilter]]">
        </pie-chart>

        <button @click="test() ">test</button>
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
  import "./firebase";
  import firebase, {
    functions
  } from "firebase";
  import {
    usersRef
  } from "./firebase";
  import {
    privateRef
  } from "./firebase";
  export default {
    name: "posts",
    data() {
      return {
        authUser: null,
        search: "",
        foundCount: 0,
        notFoundCount: 0
      };
    },
    firebase: {
      usersData: usersRef
    },

    methods: {
      signOut() {
        firebase
          .auth()
          .signOut()
          .then(function () {
            console.log("logged out " + this.authUser.email + this.authUser.uid);
          })
          .catch(function (error) {
            // An error happened.
            alert(error);
          });
      },
      deletePost(post) {
        usersRef.child(post[".key"]).remove();
        console.log("Remove post Sucess");
      },

      test() {
        var foundArr = [];
        var notFoundArr = [];
        for (var key of Object.keys(this.usersData)) {
          var postKeys = this.usersData[key].item_info;
          if (postKeys["isFound"] == "Found") {
            foundArr.push(postKeys["isFound"]);
          }
          if (postKeys["isFound"] == "Not Found") {
            notFoundArr.push(postKeys["isFound"]);
          }
        }
        console.log(foundArr);
        console.log(notFoundArr);
      }
    },
    computed: {
      filteredPosts() {
        let searching = (this.search || "").toLowerCase().trim();
        return this.usersData.filter(function (item) {
          let nameSearch = (item.item_info.itemName || "").toLowerCase();
          let descriptionSearch = (item.item_info.itemDescription || "").toLowerCase();
          let emailSearch = (item.item_info.contactEmail || "").toLowerCase();

          return nameSearch.indexOf(searching) > -1 || descriptionSearch.indexOf(searching) > -1 || emailSearch.indexOf(
            searching) > -1;
        });
      },

      foundFilter() {
        var foundArr = [];
        for (var key of Object.keys(this.usersData)) {
          var postKeys = this.usersData[key].item_info;
          if (postKeys["isFound"] == "Found") {
            foundArr.push(postKeys["isFound"]);
          }
        }
        console.log(foundArr);
        return foundArr.length;
      },
      notFoundFilter() {
        var notFoundArr = [];
        for (var key of Object.keys(this.usersData)) {
          var postKeys = this.usersData[key].item_info;
          if (postKeys["isFound"] == "Not Found") {
            notFoundArr.push(postKeys["isFound"]);
          }
        }
        console.log(notFoundArr);
        return notFoundArr.length;
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user;
      });
      //foundFilter();
    }
  };

</script>
<style>
  .pieChart {
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: 1;
    animation-timing-function: infinite;
    /* transform: rotate(3deg); */
    /* transform: rotate(0.3rad);/ */
    /* transform: rotate(3grad); */
    /* transform: rotate(.03turn);  */
  }

  @keyframes spin {
    from {
      transform: rotate(180deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

</style>
