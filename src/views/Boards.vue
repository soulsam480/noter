<template>
  <div>
    <router-view :key="this.$route.params._slug"></router-view>
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
