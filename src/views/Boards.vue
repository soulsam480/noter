<template>
  <div>
    <div
      v-if="this.$route.fullPath === '/boards'"
      class="container boards-intro"
    >
      <br />
      <h4>Hi {{ user.data.name }} 👋🏼 !</h4>
      <h3 class="">👏🏼 Welcome to <em>Noter</em> 👏🏼</h3>
      <br />
      <h5>
        <em>Noter</em> is very easy to begin with 💥 ! Just create a
        <span class="n-btn" @click="createBoard">Board</span> and start
        Exploring 🤯 .
      </h5>
      <small class="text-muted"
        >Pro Tip: add an emoji in board title for better experience!
      </small>
      <br />
      <br />
      <h4>What <em> Noter </em> can Do 😁</h4>
      <ul class="b-ul">
        <li><h5>Content Blocks</h5></li>
        <li>Paragraphs</li>
        <li>Headings</li>
        <li>Lists</li>
        <li>Checklists</li>
        <li>Code Blocks</li>
        <li>Links with Preview</li>
        <li>Tables</li>
        <li>Images (from link)</li>
      </ul>
      <br />
      <h4>What's in store for <em>Noter</em> 😋 ?</h4>
      <ul class="b-ul">
        <li>Board sharing support is coming sooon !</li>
        <li>Image Support inside Blocks. (uploadable)</li>
        <li>Improvement in error handling.</li>
        <li>Refining the end-user experience.</li>
        <li>Accessibility Improvements.</li>
        <li>Some major Bug Fixes !</li>
      </ul>
    </div>

    <div>
      <router-view :key="this.$route.params._slug"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Vue from "vue";
import { User } from 'firebase';
import { Board } from '@/ entities/models';
//todo interfaces 

interface Computed{
  user: User;
  boards: Board[];
}

interface Methods{
  createBoard: ()=>void
}

interface Data{

}

export default Vue.extend<Computed, Methods,Data>({
  name: "Boards",
  computed: {
  /*   ...mapGetters({ boards: "boards", user: "giveUser" }), */
      user() {
      return this.$store.getters.giveUser as User;
    },
    boards() {
      return this.$store.getters.boards;
    },
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
  components: {},
});
</script>

<style lang="scss" scoped>
.nav-link {
  color: black;
  &:hover {
    text-decoration: underline;
  }
}
.b-ul {
  li {
    margin-bottom: 7px;
  }
}
</style>
