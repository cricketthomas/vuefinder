<template>
  <div>
    <h1>Post Details</h1>
    <p>Info: {{$route.params.allInfo}}</p>
    <br>
    <h3>Last know location of item</h3>
    <div id='map'>
      <gmap-map :center="cleaningCoordinates" :zoom="15" style="width: 500px; height: 300px" map-type-id="roadmap">
      <gmap-marker :position="cleaningCoordinates" />
    </gmap-map>
    </div>
        <router-view></router-view>
  </div>

</template>
<script>
  import Vue from 'vue';
  import * as VueGoogleMaps from "vue2-google-maps";

  export default {
    name: 'information',
    data() {
      return {
  
      }
    },
    methods: {
 
    },

    computed: {
     cleaningCoordinates() {
        var parsedLocation = JSON.parse(this.$route.params.allInfo.lostItemLocation)
        return parsedLocation

      }

    }
  }

</script>
<style>
#map {
    display: flex;
    justify-content: center;
  }

</style>
