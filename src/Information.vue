<template>
<div>
    <h1>Post Details</h1>
    <p>Info: {{$route.params.allInfo}}</p>
    <router-view></router-view>
</div>

</template>
<script>
import Vue from 'vue'
  export default {
      name: 'information',
    data() {
      return {

      }
    }
  }

</script>
