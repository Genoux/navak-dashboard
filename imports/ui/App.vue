<template>
  <div>
    <h1>Welcome to Meteor!</h1>
    <info/>
  </div>
</template>

<script>
import Info from './components/Info.vue'

export default {
  components: {
    Info,
  },
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
