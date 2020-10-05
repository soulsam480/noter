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
<script lang="ts">
import Vue from "vue";
import "./styles/default.scss";
import Login from "@/components/Login.vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { User } from "./ entities/models";
interface Data {
  isMobile: null | boolean;
}
interface Methods {
  contentShift: (dat: any) => void;
}
interface Computed {
  user: User;
  defTitle: string;
  isHome: boolean;
}
export default Vue.extend<Data, Methods, Computed>({
  components: {
    Navbar,
    Login,
    Sidebar,
  },
  data() {
    return {
      isMobile: null as null | boolean,
    };
  },
  methods: {
    contentShift(dat: any) {
      if (this.user.loggedIn) {
        if (dat === true) {
          //@ts-ignore
          this.$refs.child.classList.add("content");
        } else {
          //@ts-ignore
          this.$refs.child.classList.remove("content");
        }
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.giveUser;
    },
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
    },
  },
  mounted() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
  },
  metaInfo() {
    return {
      titleTemplate: this.defTitle as string,
    };
  },
});
</script>
<style lang="scss"></style>
