<template>
  <div>
    <div
      v-if="this.$route.fullPath === '/boards'"
      class="container boards-intro"
    >
      <br />
      <h4>Hi {{ user.data.name }} 👋🏼 !</h4>
      <h3 class="">Welcome to <em>Noter</em>👏🏼</h3>
      <br />
      <h5>
        <em>Noter</em> is very easy to begin with 💥 ! Just create a
        <span class="n-btn" @click="createBoard">Board</span> and start
        Exploring!
      </h5>
    </div>

    <div>
      <router-view :key="this.$route.params._slug"></router-view>
    </div>
  </div>
</template>

<script>
/* import Sidebar from "@/components/Sidebar.vue";
 */ import { mapGetters } from "vuex";
export default {
  name: "Boards",
  computed: {
    ...mapGetters({ boards: "boards", user: "giveUser" }),
  },
  methods: {
    createBoard() {
      const id = Math.random()
        .toString(20)
        .substr(2)
        .toUpperCase();
      this.$router.push({ name: "Board", params: { _slug: id } });
    },
  },
  metaInfo() {
    return {
      title: "Boards",
    };
  },
  components: {
    /*     Sidebar,
     */
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
  color: black;
  &:hover {
    text-decoration: underline;
  }
}
</style>
