<template>
  <div class="container-fluid">
    <br />
    <div v-if="user.loggedIn">
      <p>Name: {{ user.data.name }}</p>
      <p>User ID : {{ user.data.uid }}</p>
      <button class="btn btn-danger" @click="logout">Log Out</button>
      <br />
      <br />
      <router-link class="nav-link" :to="{ path: '/boards' }"
        >My Boards</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "../firebase/index";
export default {
  name: "User",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ user: "giveUser" }),
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace({ path: "/" });
          this.$store.dispatch("fetchUser", null);
        })
        .catch((err) => {
          window.alert(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
