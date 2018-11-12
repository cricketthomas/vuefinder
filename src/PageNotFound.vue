<template>

  <div>
    <title-msg class="titleMsg" />
    <div class="uk-position-relative uk-visible-toggle uk-light" uk-slider="center: true">
      <ul class="uk-slider-items uk-grid uk-grid-match" uk-height-viewport="offset-top: true">
        <li class="uk-width-3-4">
          <div class="uk-cover-container">
            <img src="src\assets\sliders\glasses.jpg" alt="glasses" uk-cover>
            <div class="uk-position-center uk-panel">
              <h2>Think you lost your glasses at the Library?</h2>
            </div>
          </div>
        </li>
        <li class="uk-width-3-4">
          <div class="uk-cover-container">
            <img src="src\assets\sliders\keys.jpg" alt="keys" uk-cover>
            <div class="uk-position-center uk-panel">
              <h2>2</h2>
            </div>
          </div>
        </li>
        <li class="uk-width-3-4">
          <div class="uk-cover-container">
            <img src="src\assets\sliders\stress.jpg" alt="stress" uk-cover>
            <div class="uk-position-center uk-panel">
              <h2>3</h2>
            </div>
          </div>
        </li>
        <li class="uk-width-3-4">
          <div class="uk-cover-container">
            <img src="src\assets\sliders\lostposter.jpg" alt="lostposter" uk-cover>
            <div class="uk-position-center uk-panel">
              <h2>4</h2>
            </div>
          </div>
        </li>
        <li class="uk-width-3-4">
          <div class="uk-cover-container">
            <img src="src\assets\sliders\phone.jpg" alt="phone" uk-cover>
            <div class="uk-position-center uk-panel">
              <h2>5</h2>
            </div>
          </div>
        </li>
      </ul>

      <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
      <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

    </div>


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
    name: 'PageNotFound',
    data() {
      return {}

    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user
      })

    }
  }

</script>
<style>



</style>
