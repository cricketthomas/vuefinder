<template>
  <div class="loginCanvas">
    <div v-show="!authUser">
      <h1>Login</h1>
      <div id="message"></div>
      <form>
        <div class="uk-margin">
          <div class="uk-inline">
            <span class="uk-form-icon" uk-icon="icon: user"></span>
            <input class="uk-input" type="email" placeholder="Email" v-model="email" required>
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-inline">
            <span class="uk-form-icon" uk-icon="icon: lock"></span>
            <input class="uk-input" type="password" placeholder="Password" v-model="password" required>
          </div>
        </div>
      </form>
      <button class="uk-button uk-button-primary" @click="signIn();">Log in</button>
      <br>
      <br>
      <button class=" uk-button-secondary" @click="resetPassword()">Forgot
        Password?</button>
    </div>
  </div>
</template>
<script>
  import firebase, {
    functions
  } from "firebase";
  import App from './App.vue';
  import Login from './Login.vue';
  export default {
    name: "login",
    data() {
      return {
        email: "",
        password: "",
        authUser: null,
        backgroundImg: "./assets/logo.png",
      };
    },
    methods: {
      signIn() {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var errorAlert = true
            var element = document.getElementById('message').innerHTML =
              '<div class="uk-alert-danger uk-align-center" uk-alert style="width: 30vw; justi"> <a class="uk-alert-close" uk-close></a>' +
              errorMessage +
              '</div>'
            //alert(errorMessage);
          });
      },
      signOut() {
        firebase
          .auth()
          .signOut()
          .then(function () {
            console.log("logged out" + this.authUser.email);
          })
          .catch(function (error) {
            // An error happened.
          });
      },
      resetPassword() {
        var auth = firebase.auth();
        var emailAddress = prompt("Enter your email:");
        auth
          .sendPasswordResetEmail(emailAddress)
          .then(function () {
            // Email sent.
            alert("An Email was sent to you, if your record was found")
          })
          .catch(function (error) {
            alert(error);
          });
      },

    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user;
        this.$router.push("/posts");
      });
    }
  };

</script>

<style>
  .loginCanvas {
    margin-top: 5vh;
    overflow: hidden;
  }

  .titleMsg {
    color: white
  }

</style>
