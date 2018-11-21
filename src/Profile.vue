<template>
  <div>
    <div v-if="authUser">
      <h1>Hi, {{authUser.email}}!</h1>
      <hr>
      <h3>Your Posts</h3>
      <div v-for="usersPosts in usersData" v-bind:key="usersPosts['.key']">
        <div v-show="authUser.uid == usersPosts.item_info.userId">
          <div v-if="!usersPosts.edit">
            <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center uk-animation-slide-top-medium">
              <div class="uk-card-badge uk-label" v-bind:class="[usersPosts.item_info.isFound === 'Lost' ? 'uk-label-danger' : usersPosts.item_info.isFound === 'Found' ? 'uk-label-warning' : 'uk-label']">{{usersPosts.item_info.isFound}}</div>
              <h3 class="uk-card-title">{{usersPosts.item_info.itemName}}</h3>
              <p>Date:{{usersPosts.item_info.itemDate}} </p>
              <p>Item Description:{{usersPosts.item_info.itemDescription}}</p>
              <button @click="setEdit(usersPosts['.key'])" class="uk-button uk-button-default">Edit</button>
            </div>
          </div>
          <div v-else>
            <fieldset class="uk-fieldset uk-form-width-large uk-form-stacked uk-align-center fieldsetBg">
              <h3>Enter your items details below:</h3>
              <label for="itemName" class="uk-form-label formLabel">Item Name</label>
              <input type="text" id="itemName" placeholder="Post Title / Item name" class="uk-input" v-model="usersPosts.item_info.itemName">
              <br>
              <label for="itemDescription" class="uk-form-label formLabel">Item Description</label>
              <textarea id="itemDescription" placeholder="Please descirbe the item you lost or found" maxlength="250"
                class="uk-input" v-model="usersPosts.item_info.itemDescription" />
              <br>
              <label for="itemDate" class="uk-form-label formLabel">Date</label>
              <input type="date" id="itemDate" class="uk-input" v-model="usersPosts.item_info.itemDate">
              <br>
              <label for="contactEmail" class="uk-form-label formLabel"> Contact Email: </label>
              <input type="email" id="contactEmail" class="uk-input" v-model="usersPosts.item_info.contactEmail">
              <br>
              <label for="tele" class="uk-form-label formLabel"> Telephone: </label>
              <input type="tel" id="tel" maxlength="11" class="uk-input" v-model="usersPosts.item_info.contactPhone">
              <br>
              <input type="radio" id="found" value="Found" v-model="usersPosts.item_info.isFound" class="uk-radio">
              <label for="found">Found</label>
              <input type="radio" id="lost" value="Lost" checked v-model="usersPosts.item_info.isFound" class="uk-radio">
              <label for="lost">Lost</label>
              <input type="radio" id="returned" value="Returned" v-model="usersPosts.item_info.isFound" class="uk-radio">
              <label for="returned">Returned</label>
              <br>
              <label for="routeCoor" class="uk-form-label formLabel">Coordinates: </label>
              <input type="text" id="routeCoor" class="uk-input" v-model="usersPosts.item_info.lostItemLocation" />
              <div id="map">
                <gmap-map :center="JSON.parse(usersPosts.item_info.lostItemLocation)" :zoom="17" style="width: 500px; height: 300px" map-type-id="roadmap">
                  <gmap-marker :position="JSON.parse(usersPosts.item_info.lostItemLocation)" :draggable="true" @drag="ItemCoordinates"/>
                </gmap-map>
              </div>
              <button @click="saveEdit(usersPosts)" class="uk-button uk-button-default saveButton">Save</button>
              <button @click="cancelEdit(usersPosts['.key'])" class="uk-button uk-button-default cancelButton">Cancel</button>
              <button @click="removePost(usersPosts)" class="uk-button uk-button-default uk-button-danger">Remove</button>
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
      dangerStyle:  "uk-label-danger",
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
 
  .formLabel {
    float: left;
  }
.saveButton{
  background-color: green;
  color: white;
}
.saveButton:hover{
  background-color: rgb(42, 149, 42);
    color: white;

}
.cancelButton{
  background-color: goldenrod;
  color: white;
}
.cancelButton:hover{
  background-color: rgb(241, 180, 11);
    color: white;

}
.fieldsetBg{
  background-color: whitesmoke;
  padding: 2em;
  border-radius: .5em;
}
 @media screen and (max-width: 700px) {
  .fieldsetBg {
  background-color: whitesmoke;
  padding: .5em;
  border-radius: .5em;
}
  }
</style>
