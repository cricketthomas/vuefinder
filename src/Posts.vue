<template id="top">
  <div id="postsCanvas">
    <div v-if="!authUser">
      <br>
      <h2>Please sign in.</h2>
    </div>
    <div v-else>
      <div>
        <input type="text" v-model="search" uk-sticky="offset: 80; animation: uk-animation-slide-top; min-width: 1000px"
          placeholder="search everything"
          class="uk-form-width-large uk-width-expand uk-input uk-align-center searchbar">
        <h4>Summary</h4>

        <pie-chart class="pieChart" legend="bottom" :donut="true" :colors="['orange','red', 'blue']"
          :data="[['Found', foundFilter], ['Lost', notFoundFilter], ['Returned', returnedFilter]]">
        </pie-chart>

        <section>
          <ul class="grid">
            <li v-for="post in filteredPosts.reverse()" v-bind:key="post['.key']"
              class="uk-align-center uk-text-center uk-animation-slide-top-medium ">
              <div class="uk-card uk-card-default uk-card-hover uk-height-max-medium uk-width-*@s">
                <h4 class="uk-card-title">{{post.item_info.itemName}}
                </h4>
                <div class="uk-text-meta uk-margin-remove-top">
                  <p><time>{{post.item_info.itemDate}}</time></p>
                </div>
                <span class="uk-card-badge uk-label"
                  v-bind:class="[post.item_info.isFound === 'Lost' ? 'uk-label-danger' : post.item_info.isFound === 'Found' ? 'uk-label-warning' : 'uk-label']">{{post.item_info.isFound}}
                </span>
                <div class="uk-card-footer">
                  <router-link class="uk-button uk-button-text"
                    :to="{ name: 'specificinfo', params: { postkey: post['.key'].slice(1, 30) }}">Details</router-link>
                  &nbsp
                  <button class="uk-button-danger" v-show="authUser.uid == post.item_info.userId"
                    @click="deletePost(post)">Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <a uk-totop href="#top" class="toTop" uk-scroll="duration: 150"></a>
    <router-view></router-view>
  </div>
</template>



<script>
  import App from './App.vue';

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
      }
    },
    computed: {
      filteredPosts() {
        let searching = (this.search || "").toLowerCase().trim();
        return this.usersData.filter(function (item) {
          let nameSearch = (item.item_info.itemName || "").toLowerCase();
          let descriptionSearch = (item.item_info.itemDescription || "").toLowerCase();
          let emailSearch = (item.item_info.contactEmail || "").toLowerCase();
          let lostSearch = (item.item_info.isFound || "").toLowerCase();
          return (
            nameSearch.indexOf(searching) > -1 ||
            descriptionSearch.indexOf(searching) > -1 ||
            emailSearch.indexOf(searching) > -1 ||
            lostSearch.indexOf(searching) > -1
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
        //console.log(foundArr);
        return foundArr.length;
      },
      notFoundFilter() {
        var notFoundArr = [];
        for (var key of Object.keys(this.usersData)) {
          var postKeys = this.usersData[key].item_info;
          if (postKeys["isFound"] == "Lost") {
            notFoundArr.push(postKeys["isFound"]);
          }
        }
        //console.log(notFoundArr);
        return notFoundArr.length;
      },
      returnedFilter() {
        var returnedArr = [];
        for (var key of Object.keys(this.usersData)) {
          var postKeys = this.usersData[key].item_info;
          if (postKeys["isFound"] == "Returned") {
            returnedArr.push(postKeys["isFound"]);
          }
        }
        //console.log(returnedArr);
        return returnedArr.length;
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
    animation-duration: 1500ms;
    animation-iteration-count: 1;
    animation-timing-function: infinite;
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

  .toTop {
    right: 25px;
    top: 80vh;
    position: fixed;
  }

  .searchbar {
    text-align: center
  }


  @media screen and (max-width: 640px) {
    #postsCanvas {
      zoom: 90%;
    }

    .grid {
      list-style: none;
      margin: 0 auto;
      padding: 20px;
      text-align: left;
      width: 70%;
      overflow-x: hidden;
    }

    .grid li {
      display: block;
      position: relative;
      width: 100%;
    }

    .grid li:after {
      display: block;
      padding-bottom: 5%;
    }

  }

  @media screen and (min-width: 960px) {
    .grid {
      list-style: none;
      margin: 0 auto;
      padding: 20px;
      text-align: left;
      width: 80%;
    }

    .grid li {
      display: inline-block;
      position: relative;
      width: 50%;
    }

    .grid li:after {
      display: block;
      padding-bottom: 5%;
    }

  }

</style>
