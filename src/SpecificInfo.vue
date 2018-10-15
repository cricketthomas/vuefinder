<template>
  <div>
    <p>testing for any data passed in:
      <br>
      {{this.urlFormat}}</p>
      <p>{{ info }}</p>
    <router-view></router-view>
  </div>

</template>
<script>
  import Vue from 'vue';
  import axios from 'axios';


  export default {
    name: 'SpecificInfo',
    data() {
      return {
        info: null,
      }
    },
    methods: {

    },
    mounted() {
      axios
        .get('https://vuefinder-1.firebaseio.com/usersRef/' + this.$route.params.test.toString())
        .then(response => (this.info = response))
    },
    computed: {
      urlFormat() {
        return this.$route.params.test.toUpperCase()
      }
    }
  }

  //https://vuefinder-1.firebaseio.com/usersRef/-LOaHBe9kPebOGddgdX2/itemInformation.json

</script>
<style>

</style>
