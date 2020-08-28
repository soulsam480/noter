<template>
  <div class="container-fluid">
    <h4>My Boards</h4>
    <div>
      <p v-for="board in boards" :key="board.key">
        <router-link :to="{ path: `/board/${board.key}` }">{{
          board.key
        }}</router-link>
      </p>
    </div>
    <h6>
      create a new Board
      <button class="btn btn-success" @click="createBoard">Here</button>
    </h6>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Boards",
  computed: {
    ...mapGetters({ boards: "boards" }),
  },
  methods: {
    createBoard() {
      const id = Math.random()
        .toString(20)
        .substr(2)
        .toUpperCase();
      this.$router.push({ path: `/board/${id}` });
    },
  },
};
</script>

<style lang="scss" scoped></style>
