<template>
  <div class="usernav">
    <div class="topbar">
      <a
        @click="hamToggle"
        id="hamburger"
        class="ham hamburger--arrowturn is-active"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </a>
    </div>

    <div class="sidebar sidebar-active" id="sidebar">
      <div class="sidebar-inner">
        <a
          ><div class="side-user">
            <div class="u-l"><img :src="imgUrl" /></div>
            <div class="u-r">{{ user.data.name }}</div>
          </div></a
        >
        <span v-for="board in boards" :key="board.key">
          <router-link :to="{ name: 'Board', params: { _slug: board.key } }">
            {{ board.meta.name }}
          </router-link>
        </span>
        <a @click="createBoard">Add a new Board</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({ boards: "boards", user: "giveUser" }),
  },
  methods: {
    hamToggle() {
      document.getElementById("hamburger").classList.toggle("is-active");
      document.getElementById("sidebar").classList.toggle("sidebar-active");
    },
    createBoard() {
      const id = Math.random()
        .toString(20)
        .substr(2)
        .toUpperCase();
      this.$router.push({ name: "Board", params: { _slug: id } });
    },
  },
  mounted() {
    this.imgUrl = `https://api.adorable.io/avatars/285/${this.user.data.uid}.png`;
  },
};
</script>

<style lang="scss" scoped></style>
