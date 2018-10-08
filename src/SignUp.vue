<template>
  <div>
    <div v-if="authUser">
      <h3>Signed in as: {{authUser.email}} </h3>
      <button @click="signOut()">Sign Out</button>
    </div>
    <div v-else>
      <h1>Sign Up</h1>
      <label>Email
        <br>
        <input type="email" placeholder="Email" v-model="email" required />
      </label>
      <br>
      <label>Password <br>
        <input type="password" placeholder="Password" v-model="password" required />
      </label>
      <br>
      <button @click="register()">Create Account</button>
      <br>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'

  export default {
    name: 'signup',
    data() {
      return {
        email: '',
        password: '',
        authUser: null
      }
    },
    methods: {
      register() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
          console.log('User Created')
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
      },
      signOut() {
        firebase.auth().signOut().then(function () {
          console.log('logged out' + this.authUser.email)
        }).catch(function (error) {
          // An error happened.
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
