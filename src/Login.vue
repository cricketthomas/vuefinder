<template>
  <div>
    <div v-if="!authUser">
      <h1>Login</h1>
      <label>Email
        <br>
        <input type="email" placeholder="Email" v-model="email" required />
      </label>
      <br>
      <label>Password <br>
        <input type="password" placeholder="Password" v-model="password" required />
      </label>
      <br>
      <button @click="signIn()">Log in</button>
    </div>
    <div v-else> <button @click="signOut()">Log Out</button>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        authUser: null
      }
    },
    methods: {
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        console.log('logged in')
      },
      signOut() {
        firebase.auth().signOut()
        console.log('logged out' + this.authUser.email)
      }

    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })

    }
  }

</script>
