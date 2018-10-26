<template id="top">
  <div>
    <div v-if="!authUser">
      <br>
      <h2> Please Sign in</h2>
    </div>
    <div v-else>
      <div>
        <input type="text" v-model="search" uk-sticky="offset: 90; animation: uk-animation-slide-top" placeholder="search by item name"
          class="uk-form-width-large uk-input uk-align-center">
        <p>Vue chart kick here: Found: {{foundFilter}} Not found: {{notFoundFilter}} </p>

        <pie-chart class="pieChart" legend="bottom" :donut="true" :colors="['#666','#b00']" :data="[['Items Returned', foundFilter], ['Items Still Lost', notFoundFilter]]">
        </pie-chart>
        <div v-for="post in filteredPosts.reverse()" v-bind:key="post['.key']" class="uk-align-center">

          <div class="uk-card uk-card-default uk-width-1-3@m uk-align-center">
            <div class="uk-card-header">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                  <img class="uk-border-circle" width="40" height="40" src="./assets/logo.png">
                </div>
                <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">{{post.item_info.itemName}}</h3>
                  <p class="uk-text-meta uk-margin-remove-top"><time>{{post.item_info.itemDate}}</time></p>
                </div>
              </div>
            </div>
            <div class="uk-card-body uk-align-center">
              <div class="textLeft">
                <h4>Description:</h4>
                <p>{{post.item_info.itemDescription}}</p>
                <h4>Contact Information:</h4>
                <p>
                  <strong>Email:</strong> {{post.item_info.contactEmail}}
                  <br />
                  <strong>Phone:</strong> {{post.item_info.contactPhone}}
                </p>
                <p class="uk-text-meta">Updated: {{post.item_info.dateModified}}</p>
                <button class="uk-button-danger" v-show="authUser.uid == post.item_info.userId" @click="deletePost(post)">Delete</button>
                <br>
              </div>
            </div>
            <div class="uk-card-footer">
              <router-link class="uk-button uk-button-text" :to="{ name: 'specificinfo', params: { postkey: post['.key'].slice(1, 30) }}">Details</router-link>
            </div>
          </div>
        </div>
        <a class="uk-button uk-button-primary" href="#top" uk-scroll="duration: 150">Scroll Up</a>

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
      usersData: usersRef,
      //cancelCallback: function () {},
      // this is called once the data has been retrieved from firebase
      //readyCallback: function(error) {
      //alert("ready");
      //}
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
          let descriptionSearch = (
            item.item_info.itemDescription || ""
          ).toLowerCase();
          let emailSearch = (item.item_info.contactEmail || "").toLowerCase();

          return (
            nameSearch.indexOf(searching) > -1 ||
            descriptionSearch.indexOf(searching) > -1 ||
            emailSearch.indexOf(searching) > -1
          );
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

  .textLeft {
    text-align: left;
  }

</style>
