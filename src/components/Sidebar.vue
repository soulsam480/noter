<template>
  <div class="usernav">
    <Context
      :command="command"
      v-if="contextActive"
      v-on:close-context="closeContext"
    />
    <Tooltip :dat="dat" v-if="isTooltip" />
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
          <router-link class="user-link" :to="{ path: '/user' }"
            ><div class="side-user">
              <img class="u-l" :src="imgUrl" />
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
        <a
          @click="createBoard"
          @mouseenter="showTooltip($event, 'Click to Add Board')"
          @mouseleave="isTooltip = false"
        >
          <b>+</b> Add a new Board
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "@/components/Tooltip.vue";
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
      dat: {},
      isTooltip: false,
    };
  },
  components: {
    Context,
    Tooltip,
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
    showTooltip(event, text) {
      this.isTooltip = true;
      this.dat = {
        text: text,
        left: event.pageX,
        top: event.pageY,
      };
      setTimeout(() => {
        this.isTooltip = false;
      }, 1000);
    },
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

<style lang="scss" scoped>
//todo colors
$bg-primary: #ffffff;
$primary: #101629;
$primary-light: #434449;
$secondary: #d4d4f5;
$secondary-light: #e1e1ff;
// **hamburger
.ham {
  z-index: 1000;
  position: absolute;
  left: 10px;
  display: inline-block;
  cursor: pointer;
  transition-property: left;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 7px 0;
  padding: 0;
  overflow: visible;
}

.ham.is-active .hamburger-inner,
.ham.is-active .hamburger-inner::before,
.ham.is-active .hamburger-inner::after {
  background-color: $primary;
}

.hamburger-box {
  width: 30px;
  height: 20px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -1px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 28px;
  height: 2px;
  background-color: $primary;
  border-radius: 2px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: "";
  display: block;
}
.hamburger-inner::before {
  top: -5px;
}
.hamburger-inner::after {
  bottom: -5px;
}
.is-active {
  left: 150px;
}
/*
   * Arrow Turn
   */
.hamburger--arrowturn.is-active .hamburger-inner {
  transform: rotate(-180deg);
}
.hamburger--arrowturn.is-active .hamburger-inner::before {
  transform: translate3d(8px, 0, 0) rotate(35deg) scale(0.7, 1);
}
.hamburger--arrowturn.is-active .hamburger-inner::after {
  transform: translate3d(8px, 0, 0) rotate(-35deg) scale(0.7, 1);
}

// ** Sidebar styles
.sidebar-active {
  width: 200px !important;
}
.sidebar {
  transition-property: width;
  transition-duration: 0.15s;
  transition-timing-function: ease-in;
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: $secondary;
  overflow-x: hidden;
  a:not(.user-link) {
    cursor: pointer;
    padding: 6px 8px 6px 16px;
    display: block;
    color: $primary;
    white-space: nowrap;
    &:hover {
      cursor: pointer;
      background-color: $secondary-light !important;
      color: $primary !important;
    }
  }
  .boardActive {
    font-weight: 600;
  }
  .sidebar-inner {
    padding-top: 40px;
  }
  .side-att {
    padding: 4px 8px 4px 16px;
    display: block;
    color: $primary;
    white-space: nowrap;
    font-weight: 500;
    font-size: 16px;
  }
  .b-context {
    font-weight: bold;
    height: 25px;
    width: 25px;
    position: absolute;
    border-radius: 2px;
    color: $primary;
    z-index: 1000;
    left: 170px;
    le &:hover {
      color: white;
    }
    // ** sidebar board list context fire 3dot button
    span {
      margin: 8px 10px;
    }
    span,
    span:before,
    span:after {
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: $primary;
      border-radius: 1000px;
      content: "";
      display: block;
    }
    span:before {
      top: -8px;
    }
    span:after {
      bottom: -8px;
    }
  }
}
.topbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 33px !important;
  background-color: $secondary;
  .top-link {
    padding: 6px 5px;
  }
  .top-head {
    font-weight: 600;
    text-align: right;
    padding-right: 20px;
  }
}
.side-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: flex-start;
  justify-content: center;
  color: $primary !important;
  .u-l {
    flex: 0 0 20%;
    max-width: 20%;
    padding: 0 5px;
    border-radius: 5px !important;
  }
  .u-r {
    flex: 0 0 78%;
    max-width: 78%;
    font-size: 16px;
    padding: 0 5px;
  }
}
</style>
