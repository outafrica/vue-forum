<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <TheNavBar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavBar from './components/widgets/TheNavBar.vue';
export default {
  name: 'App',
  components: {
    TheNavBar,
  }
}
</script>

<style>
@import "assets/style.css";
</style>
