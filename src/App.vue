<template>
  <div id="app" class="container-fluid">
    <Login />
    <Navbar />
    <br />
    <br />
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
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    /*     title: "Noter | a collborative note taking app",
     */ // all titles will be injected into this template
    titleTemplate: "%s | Noter",
  },
};
</script>
<style lang="scss"></style>
