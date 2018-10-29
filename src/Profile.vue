<template>
  <div>
    <div v-if="authUser">
      <h1>Hi, {{authUser.email}}!</h1>
      <hr>
      <h3>Your Posts</h3>
      <div v-for="usersPosts in usersData" v-bind:key="usersPosts['.key']">
        <div v-show="authUser.uid == usersPosts.item_info.userId">
          <div v-if="!usersPosts.edit">
            <br>
            {{usersPosts['.key']}}
            <br>
            {{usersPosts}}
            <hr>
            <button @click="setEdit(usersPosts['.key'])">Edit</button>
          </div>

          <div v-else>
            <fieldset>
              <h3>Enter your items details below:</h3>
              <label for="itemName">Item Name</label>
              <input type="text" id="itemName" placeholder="Post Title / Item name" v-model="usersPosts.item_info.itemName">
              <br>
              <label for="itemDescription">Item Description</label>
              <textarea id="itemDescription" placeholder="Please descirbe the item you lost." v-model="usersPosts.item_info.itemDescription" />
              <br>
              <label for="itemDate">Date Lost</label>
              <input type="date" id="itemDate" v-model="usersPosts.item_info.itemDate">
              <br>
              <label for="contactEmail"> Contact Email: </label>
              <input type="email" id="contactEmail" v-model="usersPosts.item_info.contactEmail">
              <br>
              <label for="tele"> Telephone: </label>
              <input type="tel" id="tel" maxlength="11" v-model="usersPosts.item_info.contactPhone">
              <br>
              <input type="radio" id="found" value="Found" v-model="usersPosts.item_info.isFound" class="radio">
              <label for="found">Found</label>
              <input type="radio" id="notFound" value="Not Found" checked v-model="usersPosts.item_info.isFound" class="radio">
              <label for="notFound">Not Found</label>
              <input type="radio" id="returned" value="Returned" v-model="usersPosts.item_info.isFound" class="radio">
              <label for="returned">Returned</label>
              <br>
              <span>Status: {{ usersPosts.item_info.isFound }}</span>
              <br>
              <label for="routeCoor">Coordinates: </label>
              <input type="text" id="routeCoor" v-model="usersPosts.item_info.lostItemLocation" />

              
        <div id="map">
          <gmap-map :center="JSON.parse(usersPosts.item_info.lostItemLocation)" :zoom="17" style="width: 500px; height: 300px" map-type-id="roadmap">
            <gmap-marker :position="JSON.parse(usersPosts.item_info.lostItemLocation)" :draggable="true" @drag="ItemCoordinates"/>
          </gmap-map>
        </div>


              <button @click="saveEdit(usersPosts)">Save</button>
              <button @click="cancelEdit(usersPosts['.key'])">Cancel</button>
              <button @click="removePost(usersPosts)">Remove?</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from "vue";
import App from "./App.vue";
import * as VueGoogleMaps from "vue2-google-maps";
import "./firebase";
import firebase, { functions } from "firebase";
import { usersRef } from "./firebase";
import { privateRef } from "./firebase";
export default {
  name: "profile",
  data() {
    return {
      center: {
        lat: 10.0,
        lng: 10.0
      },
      mapLocation: {
        lat: 38.98,
        lng: -76.94
      },
      markers: [
        {
          position: {
            lat: 10.0,
            lng: 10.0
          }
        },
        {
          position: {
            lat: 11.0,
            lng: 11.0
          }
        }
      ],
      coordinates: null,
      authUser: null,
    };
  },
    firebase: {
      usersData: usersRef
  },
  methods: {
    setEdit(user) {
      usersRef.child(user).update({
        edit: true
      });
        console.log("edit reached");
    },
    saveEdit(post) {
        const key = post['.key'];
        usersRef.child(key).set({
          edit: false,
          uid: firebase.auth().currentUser.uid,

      item_info: {
        userId: firebase.auth().currentUser.uid,
        itemName: post.item_info.itemName,
        itemDescription: post.item_info.itemDescription,
        itemDate: post.item_info.itemDate,
        contactPhone: post.item_info.contactPhone,
        contactEmail: post.item_info.contactEmail,
        isFound: post.item_info.isFound,
        dateModified: Date(document.lastModified),
        lostItemLocation: this.coordinatesNull
      },
       
        
         
        })

        
      },

    removePost(user) {
        usersRef.child(user['.key']).remove()
        console.log("Remove Post Sucess")
      },

    cancelEdit(user) {
      usersRef.child(user).update({
        edit: false
      });
    },

    ItemCoordinates(location) {
      this.coordinates = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      };
      console.log(JSON.stringify(this.coordinates.lat));
      console.log(JSON.stringify(this.coordinates.lng));
      var routeCoor = document.getElementById('routeCoor').value = JSON.stringify(this.coordinates)
    },
    
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.authUser = user;
    });
  },
  computed: {
      cleaningCoordinates() {
        var parsedLocation = JSON.parse(this.usersPosts.item_info.lostItemLocation)
        return parsedLocation

      },
      coordinatesNull(){
        if(this.coordinates === null){
          return JSON.stringify(this.mapLocation) //mapLocation
        }
          return JSON.stringify(this.coordinates)
        
      }

      
    }
};
</script>
<style>
#map {
  display: flex;
  justify-content: center;
}
</style>
