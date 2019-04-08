<template>
  <div>
    <h4>Enter your items details below:</h4>
    <form id="form" @submit.prevent="addPost()" class="form">
      <div class="uk-grid-small uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
          <label for="itemName" class="uk-form-label formLabel">Item Name</label>
          <input type="text" id="itemName" class="uk-input formLabel" placeholder="Post Title / Item Name"
            v-model="newPosts.itemName" required>
          <br>
          <label for="itemDescription" class="uk-form-label formLabel">Item Description</label>
          <textarea id="itemDescription" class="uk-textarea" placeholder="Please descirbe the item you lost or found"
            maxlength="250" v-model="newPosts.itemDescription">
        </textarea>
          <br>
          <label for="itemDate" class="uk-form-label formLabel">Date Lost</label>
          <input type="date" id="itemDate" class="uk-input" v-model="newPosts.itemDate" required>
          <br>
          <label for="contactEmail" class="uk-form-label formLabel"> Contact Email: </label>
          <input type="email" id="contactEmail" class="uk-input" v-model="newPosts.contactEmail" required>
          <br>
          <label for="tele" class="uk-form-label formLabel"> Telephone: </label>
          <input type="tel" id="tel" class="uk-input" maxlength="11" v-model="newPosts.contactPhone">
          <br>
          <input type="radio" id="found" value="Found" class="uk-radio" v-model="newPosts.isFound">
          <label for="found">Found Item</label>
          <input type="radio" id="lost" value="Lost" class="uk-radio" checked v-model="newPosts.isFound">
          <label for="lost">Lost Item</label>
        </div>
        <div>
          <label for="routeCoor" class="uk-form-label formLabel">Coordinates:</label>
          <input type="text" class="uk-input uk-form-width-large" id="routeCoor" v-model="newPosts.lostItemLocation"
            placeholder="Drag the cursor on the map below" required disabled>
          <div id="map" uk-tooltip="title: Drag Cursor to Location; pos: top-right">
            <gmap-map :center="mapPosition" :zoom="15" style="width: 500px; height: 300px" map-type-id="roadmap">
              <gmap-marker :position="mapPosition" :draggable="true" @drag="ItemCoordinates" />
            </gmap-map>
          </div>
        </div>
      </div>
      <input type="submit" value="Submit Post" class="uk-button uk-button-secondary uk-button-small submitButton">
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import './firebase';
  import {
    usersRef
  } from './firebase';
  import {
    privateRef
  } from './firebase';

  import App from './App.vue'
  import * as VueGoogleMaps from "vue2-google-maps";


  export default {
    name: 'app',
    data() {
      return {
        center: {
          lat: 10.0,
          lng: 10.0
        },
        mapPosition: {
          lat: 38.8049,
          lng: -77.047
        },
        markers: [{
          position: {
            lat: 10.0,
            lng: 10.0
          }
        }, {
          position: {
            lat: 11.0,
            lng: 11.0
          }
        }],
        coordinates: null,
        authUser: null,

        newPosts: {
          userId: firebase.auth().currentUser.uid,
          //email: firebase.auth().currentUser.email,
          //item_info: {
          itemName: '',
          itemDescription: '',
          itemDate: '',
          contactPhone: '',
          contactEmail: '',
          isFound: 'Lost',
          dateModified: Date(document.lastModified),
          lostItemLocation: this.routeCoor,
          //}
        }
      }

    },
    firebase: {
      usersData: usersRef,
      privateData: privateRef
    },
    methods: {
      addPost() {
        if (this.isValid) {
          var keyRef = usersRef.push({
            item_info: this.newPosts,
            edit: false,
            uid: firebase.auth().currentUser.uid,
          });
          privateRef.child(firebase.auth().currentUser.uid).set({
            private_info: {
              userId: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email
            },
          })
          //var exampleRef = usersRef.child('Posts').push();
          //usersRef.child("userId").push(this.authUser.uid);
          console.log("Submitted")
          //console.log("Location " + JSON.stringify(this.lostItemLocation))
          this.newPosts.itemName = '',
            this.newPosts.itemDescription = '',
            this.newPosts.itemDate = '',
            this.newPosts.lostItemLocation = '',
            this.newPosts.contactPhone = '',
            this.newPosts.contactEmail = ''
          var currentKey = keyRef.getKey()
          this.$router.push("specificinfo/" + currentKey.slice(1, 30))
        }
      },
      ItemCoordinates(location) {
        this.coordinates = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng(),
        };
        //console.log(JSON.stringify(this.coordinates.lat))
        //console.log(JSON.stringify(this.coordinates.lng))
        this.newPosts.lostItemLocation = JSON.stringify(this.coordinates)
        var routeCoor = document.getElementById('routeCoor').value = JSON.stringify(this.coordinates)
        //let test = JSON.stringify(this.coordinates)
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })
    },
    computed: {
      validation: function () {
        var emailRE =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return {
          itemName: !!this.newPosts.itemName.trim(),
          lostItemLocation: !!this.newPosts.lostItemLocation,
          contactEmail: emailRE.test(this.newPosts.contactEmail)
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },
    }
  }

</script>

<style>
  .formLabel {
    float: left;
  }

  .submitButton {
    margin-top: 10px;
  }

  .form {
    max-width: 1000px;
    margin: auto;
  }

  @media screen and (max-width: 640px) {
    .form {
      transform: scale(0.9);
      margin-top: -2.5em;
      overflow: hidden;
    }

    .form #map {
      display: flex;
      justify-content: center;

    }
  }

</style>
