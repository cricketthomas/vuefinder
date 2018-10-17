<template>
  <div>
    <div>
      <h2>testing for any data passed in:</h2>
      <br>
      <p>{{ info.item_info}}</p>

      <div id='map'>
        <gmap-map :center="cleaningCoordinates" :zoom="15" style="width: 500px; height: 300px" map-type-id="roadmap">
          <gmap-marker :position="cleaningCoordinates" />
        </gmap-map>
      </div>

    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import App from './App.vue'
  import axios from 'axios';
  import * as VueGoogleMaps from "vue2-google-maps";
  import './firebase';
  import firebase, {
    functions
  } from 'firebase'
  Vue.prototype.$http = axios;

  export default {
    name: 'specificinfo',
    data() {
      return {
        dataLoaded: false,
        info: null
      }
    },
    methods: {

    },
    mounted() {
      this.dataLoaded = true

    },
    created() {
      axios.get('https://vuefinder-1.firebaseio.com/usersRef/-' + this.$route.params.postkey + ".json")
        .then(response => (this.info = response.data))
      //.then(response => (this.info = response.data)).catch(
      //error => console.log(error))
    },

    computed: {
      cleaningCoordinates() {
        if (!this.dataLoaded) {
          return {
            lat: -18.98,
            lng: -76.94
          }
        }
        var parsedLocation = JSON.parse(this.info.item_info.lostItemLocation)
        return parsedLocation

      }
    }
  }

  //https://vuefinder-1.firebaseio.com/usersRef/-LOuD99xPEbi5yojBxfH/itemInformation.json

</script>
<style>
  #map {
    display: flex;
    justify-content: center;
  }

</style>
