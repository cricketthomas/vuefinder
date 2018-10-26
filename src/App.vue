<template>
  <div id="app">

    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
      <nav class="uk-navbar-container" uk-navbar style="position: relative; z-index: 980;">
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
    <img src="./assets/logo.png">


    <router-view></router-view>
  </div>
</template>

<script>
  import firebase from "firebase";
  import "./firebase";

  import SignUp from "./SignUp.vue";

  export default {
    name: "app",
    data() {
      return {
        msg: "App",
        authUser: null
      };
    },
    methods: {
      //account methods
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        console.log("logged in");
      },
      signOut() {
        firebase.auth().signOut();
        console.log(
          "logged out " + this.authUser.email + " UID: " + this.authUser.uid
        );
        this.$router.push("/");
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
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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

</style>
