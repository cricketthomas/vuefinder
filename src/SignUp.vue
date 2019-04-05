<template>
  <div class="loginCanvas">
    <div v-if="authUser">
      <h3>Signed in as: {{authUser.email}} </h3>
      <button class="uk-button uk-button-danger" @click="signOut()">Sign Out?</button>
    </div>
    <div v-else>
      <h1>Sign Up</h1>
      <h5>Join to post and view details!</h5>
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
      <button class="uk-button uk-button-primary" @click="register()">Create Account</button>
      <br>
    </div>
  </div>
</template>
<script>
  import firebase from "firebase";
  export default {
    name: "signup",
    data() {
      return {
        email: "",
        password: "",
        authUser: null
      };
    },
    methods: {
      register() {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch(function (error) {
            console.log("User Created");
            var errorCode = error.code;
            var errorMessage = error.message;
            var errorAlert = true;
            var element = (document.getElementById("message").innerHTML =
              '<div class="uk-alert-danger uk-align-center" uk-alert style="width: 30vw; justi"> <a class="uk-alert-close" uk-close></a>' +
              errorMessage +
              "</div>");
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
            console.log(error)
          });
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
  .loginCanvas {
    margin-top: 10vh;
    overflow: hidden;
  }

</style>
