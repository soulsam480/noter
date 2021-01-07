<template>
  <div class="usernav">
    <!--     // ?context and tooltip
 -->
    <Context
      :command="command"
      v-if="contextActive"
      v-on:close-context="closeContext"
    />
    <Tooltip :dat="dat" v-if="isTooltip" />
    <TopContext
      v-if="hasStatus"
      :data="bKey"
      :class="{ topContextShow: isTopContext }"
      class="top-context"
      v-on:close-top="togTopContext"
    />
    <!--     // ? topbar starts here
 -->
    <div class="topbar">
      <span
        class="top-head"
        v-if="$route.fullPath === '/boards' || hasStatus === 'init'"
      >
        {{ user.data.name }}'s Noter
      </span>
      <span class="top-head" v-if="hasStatus">
        <span style="color:green" v-if="hasStatus === 'updated'"> ✓ Saved</span>
        <span v-if="hasStatus === 'updating'">Saving</span>
      </span>
      <span v-if="hasStatus" class="top-head top-toggle">
        <!--       // ?topbar context menu
 -->
        <a @click="togTopContext">
          <img src="../assets/upload.svg" ref="topContext" alt="" />
        </a>
      </span>
      <!--  <span class="b-context"><span></span></span> -->
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
    <!--     // ? sidebar starts here
 -->
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
          :key="board.id"
          @contextmenu.prevent="contextFire(board.id, $event)"
        >
          <router-link
            :to="{ name: 'Board', params: { _slug: board.id } }"
            :class="{ boardActive: $route.params._slug === board.id }"
            :title="board.meta.name"
          >
            {{ board.meta.cover }} {{ trunc_name(board.meta.name) }}
            <span
              class="b-context"
              @click.prevent="contextFire(board.id, $event)"
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

<script lang="ts">
import TopContext from '@/components/TopContext.vue';
import Tooltip from '@/components/Tooltip.vue';
import Context from '@/components/Context.vue';

import Vue from 'vue';
// eslint-disable-next-line
import { Board, BoardStatus, User } from '@/ entities/models';
import { tempBoard } from '@/constants';
interface Data {
  imgUrl: string;
  sideActive: boolean;
  command: {
    left?: number;
    top?: number;
    key?: string;
    display?: string;
  };
  contextActive: boolean;
  sideshut: null | boolean;
  dat: {
    text?: string;
    left?: number;
    top?: number;
  };
  isTooltip: boolean;
  isTopContext: boolean;
}
interface Computed {
  user: User;
  boards: Board[];
  boardStatus: BoardStatus;
  hasStatus: null | string;
  bKey: string;
}
interface Methods {
  togTopContext: () => void;
  showTooltip: (event: any, text: string) => void;
  sideShutMobile: () => void;
  closeContext: () => void;
  trunc_name: (str: string) => string;
  contextFire: (key: string, event: any) => void;
  hamToggle: () => void;
  createBoard: () => void;
}
export default Vue.extend<Data, Methods, Computed>({
  name: 'Sidebar',
  data() {
    return {
      imgUrl: '',
      sideActive: true,
      command: {},
      contextActive: false,
      sideshut: null,
      dat: {},
      isTooltip: false,
      isTopContext: false,
    };
  },
  components: {
    Context,
    Tooltip,
    TopContext,
  },
  computed: {
    user() {
      return this.$store.getters.giveUser;
    },
    boards() {
      return this.$store.getters.boards;
    },
    boardStatus() {
      return this.$store.getters.boardStatus;
    },
    hasStatus() {
      if (this.$route.fullPath === '/boards') {
        return null;
      } else {
        if (this.boardStatus.id === this.$route.params._slug) {
          return this.boardStatus.status;
        } else {
          return null;
        }
      }
    },
    bKey() {
      return this.$route.params._slug;
    },
  },
  methods: {
    togTopContext() {
      //@ts-ignore
      this.$refs.topContext.classList.toggle('tog-active');
      this.isTopContext = !this.isTopContext;
    },
    showTooltip(event, text) {
      this.dat = {
        text: text,
        left: event.pageX,
        top: event.pageY,
      };
      this.isTooltip = true;
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
      const length = 18;
      if (str.length > length) {
        return str.substring(0, length - 3) + '...';
      } else {
        return str;
      }
    },
    contextFire(key, event) {
      this.command = {
        left: event.pageX,
        top: event.pageY,
        key: key,
        display: 'block',
      };
      this.contextActive = true;
    },
    hamToggle() {
      this.sideActive = !this.sideActive;
      this.$emit('side_event', this.sideActive);
      //@ts-ignore
      this.$refs.ham.classList.toggle('is-active');
      //@ts-ignore
      this.$refs.sidebar.classList.toggle('sidebar-active');
    },
    createBoard() {
      this.$io
        .emit('create-board', {
          data: tempBoard,
          meta: {
            name: 'Untitled',
            cover: '🔰',
          },
        })
        .on('board-created', (board: Board) => {
          this.$router.push({
            name: 'Board',
            params: { _slug: board.id as string },
          });
        });
    },
  },
  mounted() {
    this.imgUrl = `https://avatars.dicebear.com/4.5/api/bottts/${this.user.data?.uid}.svg`;
    if (window.innerWidth < 768) {
      this.sideshut = true;
      this.sideActive = !this.sideActive;
      this.$emit('side_event', this.sideActive);
      //@ts-ignore
      this.$refs.ham.classList.toggle('is-active');
      //@ts-ignore
      this.$refs.sidebar.classList.toggle('sidebar-active');
    }
  },
});
</script>

<style lang="scss" scoped>
// todo top context
.top-context {
  display: none;
}
.topContextShow {
  display: block;
}

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
  content: '';
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
    z-index: 100001;
    left: 170px;
    &:hover {
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
      content: '';
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
  .top-head {
    padding: 6px 5px;
    font-weight: 600;
    text-align: right;
  }
  .top-toggle {
    padding: 6px 10px 6px 5px;
    img {
      width: 16px;
      transition-property: transform;
      transition-duration: 0.15s;
      transition-timing-function: ease-in;
      cursor: pointer;
    }
    img.tog-active {
      transform: rotate(180deg);
    }
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
