<template>
  <div class="usernav">
    <Context
      :command="command"
      v-if="contextActive"
      v-on:close-context="closeContext"
    />
    <div class="topbar">
      <span
        class="top-link top-head"
        v-if="this.$route.fullPath === '/boards' || hasStatus === 'init'"
      >
        {{ this.user.data.name }}'s Noter
      </span>
      <span class="top-link top-head" v-if="hasStatus">
        <span style="color:green" v-if="hasStatus === 'updated'"> ✓ Saved</span>
        <span v-if="hasStatus === 'updating'">Saving</span>
      </span>
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
        <span @click="sideShutMobile">
          <router-link :to="{ path: '/user' }"
            ><div class="side-user">
              <div class="u-l"><img :src="imgUrl" /></div>
              <div class="u-r">{{ trunc_name(user.data.name) }}</div>
            </div></router-link
          >
        </span>
        <br />
        <span
          v-for="board in boards"
          :key="board.key"
          @contextmenu.prevent="contextFire(board.key, $event)"
        >
          <router-link
            :to="{ name: 'Board', params: { _slug: board.key } }"
            :class="{ boardActive: $route.params._slug === board.key }"
          >
            {{ trunc_name(board.meta.name) }}
            <span
              class="b-context"
              @click.prevent="contextFire(board.key, $event)"
              ><span></span
            ></span>
          </router-link>
        </span>
        <a @click="createBoard">
          <b>+</b> Add a new Board
          <!-- <span class="b-context">+</span> --></a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Context from "@/components/Context.vue";
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      imgUrl: "",
      sideActive: true,
      command: null,
      contextActive: false,
      sideshut: null,
    };
  },
  components: {
    Context,
  },
  computed: {
    ...mapGetters({
      boards: "boards",
      user: "giveUser",
      boardStatus: "boardStatus",
    }),
    hasStatus() {
      if (this.$route.fullPath === "/boards") {
        return null;
      } else {
        if (this.boardStatus.id === this.$route.params._slug) {
          return this.boardStatus.status;
        } else {
          return null;
        }
      }
    },
  },
  methods: {
    sideShutMobile() {
      if (this.sideshut) {
        this.hamToggle();
      }
    },
    closeContext() {
      this.contextActive = false;
    },
    trunc_name(str) {
      const length = 22;
      if (str.length > length) {
        return str.substring(0, length - 3) + "...";
      } else {
        return str;
      }
    },
    contextFire(key, event) {
      this.contextActive = true;
      this.command = {
        left: event.pageX,
        top: event.pageY,
        key: key,
        display: "block",
      };
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
      this.sideshut = true;
      this.sideActive = !this.sideActive;
      this.$emit("side_event", this.sideActive);
      this.$refs.ham.classList.toggle("is-active");
      this.$refs.sidebar.classList.toggle("sidebar-active");
    }
  },
};
</script>

<style lang="scss" scoped></style>
