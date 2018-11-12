<template>
  <div id="app">
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
      <nav class="uk-navbar-container uk-dark" uk-navbar style="position: relative; z-index: 980;">
        <div class="uk-navbar-center">
          <ul class="uk-navbar-nav">
            <li v-show="!authUser">
              <router-link to="/login">Login In</router-link>
            </li>
            <li v-show="!authUser">
              <router-link to="/signup">Sign Up</router-link>
            </li>
            <li v-show="authUser">
              <router-link to="/form" uk-icon="copy">&nbsp;Form</router-link>
            </li>
            <li v-show="authUser">
              <router-link to="/posts" uk-icon="thumbnails">&nbsp;Posts</router-link>
            </li>
            <li v-show="authUser">
              <router-link to="/profile" uk-icon="users">&nbsp;Profile</router-link>
            </li>
            <li v-show="authUser">
              <a uk-icon="sign-out">&nbsp;User &nbsp;</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <button class="uk-button uk-button-danger" @click="signOut()">log out</button>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <title-msg class="titleMsg" v-show="!authUser" />
    <router-view></router-view>
    <footer></footer>
  </div>
</template>


<script>
  import firebase from "firebase";
  import "./firebase";
  import Posts from "./Posts.vue";
  import SignUp from "./SignUp.vue";

  export default {
    name: "app",
    data() {
      return {
        authUser: null,
        color: "linear-gradient(to bottom, #ffffff 0%, #003366 258%)"
      };
    },
    methods: {
      //account methods
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        console.log("logged in from app");

      },
      signOut() {
        firebase.auth().signOut();
        console.log(
          "logged out " + this.authUser.email);
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user;
      });
    }
  };

</script>

<style>
  #app {
    text-align: center;
    height: 100%;
  }

  footer {
    margin: auto;
  }

</style>
