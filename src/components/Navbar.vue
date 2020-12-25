<template>
  <div>
    <nav class="navbar fixed-top">
      <router-link class="navbar-brand" :to="{ path: '/' }">
        <img src="../assets/logo.png" alt="" /> <span>Noter</span>
      </router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            v-if="!user.loggedIn"
            data-toggle="modal"
            data-target="#loginModal"
            class="nav-link float-right"
            >👉🏼 Login/Signup
          </a>
          <router-link class="nav-link" v-else :to="{ path: '/user' }"
            >{{ user.data.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
export default Vue.extend({
  name: 'Navbar',
  computed: {
    ...mapGetters({ user: 'giveUser' }),
  },
  methods: {},
});
</script>

<style lang="scss" scoped></style>
