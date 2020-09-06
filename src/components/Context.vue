<template>
  <div>
    <div class="context" ref="context">
      <ul class="context-options ">
        <span class="context-close" @click="close"> <span></span></span>
        <br />
        <span @click="deleteBoard"
          ><li class="context-option">Delete Board</li></span
        >
        <span @click="$emit('close-context')"
          ><li class="context-option">
            <router-link :to="{ path: `/boards/${command.key}` }"
              >Rename</router-link
            >
          </li></span
        >
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/index";
import { mapGetters } from "vuex";
export default {
  name: "Context",
  props: ["command"],
  computed: {
    ...mapGetters({ user: "giveUser" }),
  },
  methods: {
    close() {
      this.$emit("close-context");
    },
    deleteBoard() {
      db.ref(`/Users/${this.user.data.uid}/Boards/${this.command.key}`)
        .remove()
        .then(() => {
          /*    if() */
        });
      this.$emit("close-context");
    },
  },
  mounted() {
    this.$refs.context.style.left = `${this.command.left}px`;
    this.$refs.context.style.top = `${this.command.top}px`;
  },
};
</script>

<style lang="scss" scoped></style>
