<template>
  <div>
    <nav class="navbar navbar-expand-sm  fixed-top navbar-light bg-light">
      <router-link class="navbar-brand text-info" :to="{ path: '/' }"
        ><b>Noter</b></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a
              v-if="!user.loggedIn"
              data-toggle="modal"
              data-target="#loginModal"
              class="nav-link"
              >Login
            </a>
            <router-link class="nav-link" v-else :to="{ path: '/user' }"
              >{{ user.data.name }}
            </router-link>
          </li>
          <li class="nav-item" v-if="user.loggedIn">
            <router-link class="nav-link" :to="{ path: '/boards' }"
              >Boards</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters({ user: "giveUser" }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
