<template>
  <div class="usernav">
    <div class="topbar">
      <span class="top-head"> {{ user.data.name }}'s Noter </span>
      <a
        @click="hamToggle"
        class="ham hamburger--arrowturn is-active"
        ref="ham"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </a>
    </div>
    <div class="sidebar sidebar-active" ref="sidebar">
      <div class="sidebar-inner">
        <router-link :to="{ path: '/user' }"
          ><div class="side-user">
            <div class="u-l"><img :src="imgUrl" /></div>
            <div class="u-r">{{ user.data.name }}</div>
          </div></router-link
        >
        <span class="side-att">Boards</span>
        <span
          v-for="board in boards"
          :key="board.key"
          @contextmenu.prevent="contextFire"
        >
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
      sideActive: true,
    };
  },
  computed: {
    ...mapGetters({ boards: "boards", user: "giveUser" }),
  },
  methods: {
    contextFire() {
      console.log("yoyo");
    },
    hamToggle() {
      this.sideActive = !this.sideActive;
      this.$emit("side_event", this.sideActive);
      this.$refs.ham.classList.toggle("is-active");
      this.$refs.sidebar.classList.toggle("sidebar-active");
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
    if (window.innerWidth < 768) {
      this.sideActive = !this.sideActive;
      this.$emit("side_event", this.sideActive);
      this.$refs.ham.classList.toggle("is-active");
      this.$refs.sidebar.classList.toggle("sidebar-active");
    }
  },
};
</script>

<style lang="scss" scoped></style>
