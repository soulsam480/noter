<template>
  <div class="parent">
    <ul class="child">
      <li @click="print">Print PDF</li>
      <!--       <li @click="deleteBoard">Delete</li>
 -->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
/* import { db } from "../firebase/index";
 */ import Vue from 'vue';
export default Vue.extend({
  name: 'TopContext',
  props: ['data'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ user: 'giveUser' }),
  },
  components: {},
  methods: {
    print() {
      this.$emit('close-top');
      setTimeout(() => {
        window.print();
      }, 300);
    },
    /*  deleteBoard() {
      this.$emit("close-top");
      db.ref(`/Users/${this.user.data.uid}/Boards/${this.data}`)
        .remove()
        .then(() => {
          if (this.$route.fullPath !== "/boards") {
            this.$router.push({ path: "/boards" });
          }
        });
    }, */
  },
});
</script>

<style lang="scss" scoped>
.parent {
  transition-property: display;
  transition-timing-function: ease;
  transition-duration: 1s;
  position: absolute;
  z-index: 2000;
  top: 36px;
  right: 10px;
  padding: 5px 0px 5px 0px;
  width: 150px;
  background-color: #d4d4f5;
  border-radius: 2px;
  box-shadow: 0 1px 7px 0.2px #35353557;
  ul {
    margin: 0;
    padding-inline-start: 0;
    list-style-type: none;
    li {
      padding: 2px 5px 2px 7px;
      cursor: pointer;
      &:hover {
        background: #e1e1ff;
      }
    }
  }
}
</style>
