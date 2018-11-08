<template>
  <div>
    <h1 class="error">nothing here..</h1>
    <article></article>
    <router-view></router-view>
  </div>
</template>
<script>
  import Vue from 'vue';
  import './firebase';
  import firebase, {
    functions
  } from "firebase";

  export default {
    name: 'errors',
    data() {
      return {

      }

    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })

    }
  }

</script>
<style>
  .error {
    display: flex;
    justify-content: center;
    padding-top: 2em;
  }

</style>
