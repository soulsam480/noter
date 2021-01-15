<template>
  <div>
    <div class="context" ref="context">
      <ul class="context-options ">
        <span @click="deleteBoard"
          ><li class="context-option">Delete Board</li></span
        >
        <span>
          <li
            class="context-option"
            @click="createBoard"
            title="Create new Board!"
          >
            <b>+ </b> new Board
          </li>
        </span>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from '../firebase/index';
import { mapGetters } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'Context',
  props: ['command'],
  computed: {
    ...mapGetters({ user: 'giveUser' }),
  },
  methods: {
    close() {
      this.$emit('close-context');
    },
    createBoard() {
      const id = Math.random()
        .toString(20)
        .substr(2)
        .toUpperCase();
      this.$router.push({ name: 'Board', params: { _slug: id } });
    },
    deleteBoard() {
      db.ref(`/Users/${this.user.data.uid}/Boards/${this.command.key}`)
        .remove()
        .then(() => {
          if (this.$route.fullPath !== '/boards') {
            this.$router.push({ path: '/boards' });
          }
        });
      this.$emit('close-context');
    },
  },
  mounted() {
    //@ts-ignore
    this.$refs.context.style.left = `${this.command.left}px`;
    //@ts-ignore
    this.$refs.context.style.top = `${this.command.top}px`;
  },
});
</script>

<style lang="scss" scoped>
$bg-primary: #ffffff;
$primary: #101629;
$primary-light: #434449;
$secondary: #d4d4f5;
$secondary-light: #e1e1ff;
// ** context menu
.context {
  width: 150px;
  box-shadow: 0 5px 10px 0.5px #00000057;
  background-color: $secondary;
  position: absolute;
  z-index: 2000;
  border-radius: 2px;
  .context-options {
    list-style: none;
    padding: 5px 0;
    margin-bottom: 0;

    .context-option {
      font-size: 14px;
      padding: 5px 10px;
      display: block;
      cursor: pointer;
      a {
        display: block;
        color: $primary;
      }
      &:hover {
        background: $secondary-light;
      }
    }
    .context-close {
      margin: 0px 4px;
      float: right;
      height: 20px;
      width: 20px;
      display: block;
      border-radius: 2px;
      cursor: pointer;
      border: 0.5px solid $primary;
      padding: 2px;
      &:hover {
        background: $secondary-light;
      }
      // ** sidebar board list context fire 3dot button
      span:before,
      span:after {
        margin: 6px 0 0 -3px;
        position: absolute;
        width: 20px;
        height: 2.5px;
        background-color: red;
        border-radius: 2px;
        content: '';
        display: block;
      }
      span:before {
        transform: rotate(45deg);
      }
      span:after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
