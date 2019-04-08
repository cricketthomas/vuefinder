<template>
  <div class="canvas uk-animation-slide-top-medium" v-if="info">
    <div>
      <h2>Post Details</h2>
      <div class="uk-card uk-card-default uk-card-body uk-width-1-2@s uk-align-center">
        <h3 class="uk-card-title">{{info.item_info.itemName}}</h3>
        <p class="textLeft">
          <strong>Description:</strong>
          {{info.item_info.itemDescription}}
          <br>
          <strong>{{info.item_info.isFound}} Date:</strong>
          &nbsp;{{info.item_info.itemDate}}
          <br>
          <strong>Posted on:</strong> &nbsp;
          <time>{{info.item_info.dateModified}}</time>
          <br>
          <strong>Contact:</strong>
          &nbsp; {{info.item_info.contactEmail}} |
          &nbsp; {{info.item_info.contactPhone}}
        </p>
      </div>
      <div id="map">
        <gmap-map :center="cleaningCoordinates" :zoom="15" style="width: 550px; height: 300px" map-type-id="roadmap">
          <gmap-marker :position="cleaningCoordinates" />
        </gmap-map>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import App from "./App.vue";
  import axios from "axios";
  import * as VueGoogleMaps from "vue2-google-maps";
  import "./firebase";
  import firebase, {
    functions
  } from "firebase";
  Vue.prototype.$http = axios;

  export default {
    name: "specificinfo",
    data() {
      return {
        info: {}
      };
    },
    created() {
      axios
        .get(
          "https://vuefinder-1.firebaseio.com/usersRef/-" +
          this.$route.params.postkey +
          ".json"
        )
        .then(response => (this.info = response.data));
      //.then(response => (this.info = response.data)).catch(
      //error => console.log(error))
    },

    computed: {
      cleaningCoordinates() {
        if (!this.info) {
          return {
            lat: -18.98,
            lng: -76.94
          };
        }
        var parsedLocation = JSON.parse(this.info.item_info.lostItemLocation);
        return parsedLocation;
      }
    }
  };

</script>
<style>
  #map {
    display: flex;
    justify-content: center;
  }

  .textLeft {
    text-align: left;
  }

  @media screen and (max-width: 900px) {
    .canvas {
      margin: auto;
      padding-bottom: 205px;
    }
  }

  @media screen and (max-width: 1600px) {
    .canvas {
      margin: auto;
      padding-bottom: 205px;
    }
  }

  @media screen and (min-width: 1000px) {
    .canvas {
      margin: auto;
      padding-bottom: 25vh;
      overflow: hidden;
    }
  }

</style>
