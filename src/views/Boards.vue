<template>
  <div class="container">
    <br />
    <h6>
      <button class="btn btn-success btn-sm float-right" @click="createBoard">
        New Board
      </button>
    </h6>
    <h4>My Boards</h4>
    <div>
      <ol>
        <li v-for="board in boards" :key="board.key">
          <router-link class="nav-link" :to="{ path: `/board/${board.key}` }">{{
            board.meta.name
          }}</router-link>
        </li>
      </ol>
    </div>
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
