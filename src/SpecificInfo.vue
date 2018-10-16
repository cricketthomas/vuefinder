<template>
  <div>
    <router-link to='/'>Home</router-link>

    <div>
      <h2>testing for any data passed in:</h2>
      <br>
      <p>{{ info.data.item_info }}</p>

    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import App from './App.vue'
  import axios from 'axios';
  Vue.prototype.$http = axios;

  export default {
    name: 'specificinfo',
    props: ['key'],
    data() {
      return {
        info: null,
      }
    },
    methods: {

    },
    mounted() {
      axios
        .get('https://vuefinder-1.firebaseio.com/usersRef/-' + this.$route.params.key.toString() + ".json")
        .then(response => (this.info = response))
    },
    computed: {
      urlFormat() {
        return this.$route.params.test.toUpperCase()
      }
    }
  }

  //https://vuefinder-1.firebaseio.com/usersRef/-LOuD99xPEbi5yojBxfH/itemInformation.json
</script>
<style>

</style>