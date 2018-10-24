<template>
  <div>

    <div>
      <div>
        <ul class="errors">
          <li v-show="!validation.itemName">Name cannot be empty.</li>
          <li v-show="!validation.contactEmail">Please provide a valid email address.</li>
          <li v-show="!validation.lostItemLocation">Please provide a location</li>

        </ul>
      </div>
      <fieldset>
        <form id="form" @submit.prevent="addPost()">
          <h3>Enter your items details below:</h3>
          <label for="itemName">Item Name</label>
          <input type="text" id="itemName" placeholder="Post Title / Item name" v-model="newPosts.itemName">
          <br>
          <label for="itemDescription">Item Description</label>
          <textarea id="itemDescription" placeholder="Please descirbe the item you lost." v-model="newPosts.itemDescription">
        </textarea>
          <br>
          <label for="itemDate">Date Lost</label>
          <input type="date" id="itemDate" v-model="newPosts.itemDate">
          <br>
          <label for="contactEmail"> Contact Email: </label>
          <input type="email" id="contactEmail" v-model="newPosts.contactEmail">
          <br>
          <label for="tele"> Telephone: </label>
          <input type="tel" id="tel" maxlength="11" v-model="newPosts.contactPhone">
          <br>
          <input type="radio" id="found" value="Found" v-model="newPosts.isFound" class="radio">
          <label for="found">Found</label>

          <input type="radio" id="notFound" value="Not Found" checked v-model="newPosts.isFound" class="radio">
          <label for="notFound">Not Found</label>
          <br>
          <span>Status: {{ newPosts.isFound }}</span>
          <br>
          <label for="routeCoor">Coordinates: </label>
          <input type="text" v-model="newPosts.lostItemLocation" disabled />
          <p id="routeCoor">Current Coordinates{{this.coordinates}}</p>



          <div id="map">
            <gmap-map :center="mapPosition" :zoom="17" style="width: 500px; height: 300px" map-type-id="roadmap">
              <gmap-marker :position="mapPosition" :draggable="true" @drag="ItemCoordinates" />
            </gmap-map>


          </div>
          <input type="submit" value="Submit Post">
          <button @click="addPost()" disabled>Submit Post</button>
        </form>
      </fieldset>
    </div>
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
          lat: 38.98,
          lng: -76.94
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
          isFound: 'Not Found',
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

          //usersRef.push({
          //item_info: this.newPosts
          //}),
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
          console.log("Submitted"),
            console.log("Location " + JSON.stringify(this.lostItemLocation)),
            this.newPosts.itemName = '',
            this.newPosts.itemDescription = '',
            this.newPosts.itemDate = '',
            this.newPosts.lostItemLocation = ''
          this.newPosts.contactPhone = ''
          this.newPosts.contactEmail = ''
          var currentKey = keyRef.getKey();
          this.$router.push("specificinfo/" + currentKey.slice(1, 25))
        }
      },
      ItemCoordinates(location) {
        this.coordinates = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng(),
        };
        console.log(JSON.stringify(this.coordinates.lat))
        console.log(JSON.stringify(this.coordinates.lng))
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  #map {
    display: flex;
    justify-content: center;
  }

</style>
