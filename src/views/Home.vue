<template>
  <div class=" text-center">
    <br />
    <br />
    <br />
    <h1>Welcome to <em>noter (ˈnəʊtə)</em> !</h1>
    <br />
    <h3 class=" text-info">What's this bro??</h3>
    <div class="px-lg-5">
      <h4>
        <em><u>Noter</u></em> is a free note taking and sharing platform built
        with Vuejs & Firebase. <br />
        It lets users take and share notes in realtime and also for free without
        any limits!! Most of the features are currently in beta.
      </h4>
      <br />
      <h4>🎊 The v0.5.0 release of Noter is live</h4>
      <br />
      <h4>
        🔰 Login or Signup to Explore 🔰<br />
        <br />
        Peace ☮✌🏼
      </h4>
      <br />
      <h4>Current v0.5.0</h4>
      <br />
      <center>
        If noter helped you some way consider visiting the codebase and drop us
        a star @
        <button class="n-btn">
          <a href="https://github.com/soulsam480/noter" target="_blank"
            >Github
            <img class="img" src="../assets/github.svg" alt="noter github"
          /></a>
        </button>
      </center>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  components: {},
});
</script>
<style lang="scss" scoped>
.img {
  width: 20px;
}
</style>
