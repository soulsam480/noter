<template>
  <div id="app">
    <Login />
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import "./styles/default.scss";
import Login from "@/components/Login.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
    Login,
  },
  created() {},
};
</script>
<style lang="scss"></style>
