<template>
    <div class="not-found">
      <h2>404 - Site not found</h2>
      <p>Requested page does not exist.</p>
      <router-link to="/" class="home-link">Return home</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'NotFoundView'
  })
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 40px 20px;
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .home-link {
    display: inline-block;
    margin-top: 20px;
    color: #42b983;
    text-decoration: none;
  }
  
  .home-link:hover {
    text-decoration: underline;
  }
  </style>