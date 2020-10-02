<template>
  <div id="app">
    <Login />
    <Navbar v-if="!user.loggedIn" />
    <Sidebar @side_event="contentShift" v-else />
    <br />
    <div ref="child" :class="{ content: isHome }" class="content-def">
      <router-view class="container-fluid" />
    </div>
  </div>
</template>
<script>
import "./styles/default.scss";
import Login from "@/components/Login.vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Navbar,
    Login,
    Sidebar
  },
  data() {
    return {
      isMobile: null
    };
  },
  methods: {
    contentShift(dat) {
      if (this.user.loggedIn) {
        if (dat === true) {
          this.$refs.child.classList.add("content");
        } else {
          this.$refs.child.classList.remove("content");
        }
      }
    }
  },
  computed: {
    ...mapGetters({ user: "giveUser" }),
    defTitle() {
      if (this.user.loggedIn) {
        return `%s | ${this.user.data.name}'s Noter`;
      } else {
        return "%s";
      }
    },
    isHome() {
      if (this.$route.fullPath === "/") {
        return false;
      } else {
        if (this.isMobile === true) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  mounted() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
  },
  metaInfo() {
    return {
      titleTemplate: this.defTitle
    };
  }
};
</script>
<style lang="scss"></style>
