<template>
  <div>
    <div v-if="user.loggedIn">
      <div class="row d-flex justify-content-center py-5">
        <div class="parent-c">
          <div class="row">
            <div class="col-4">
              <img :src="imgUrl" class="card-img-top" />
            </div>
            <div class="col-8">
              <div class="card-body">
                <h4 class="card-title">{{ user.data.name }}</h4>
                <div class="card-text">
                  <p>{{ user.data.email }}</p>
                </div>
                <button class="n-btn" @click="logout">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
    <div v-else>
      <p>Please Log In</p>
    </div>
    <center>Thank you for using Noter 👏🏼🎆</center>
  </div>
</template>

<script lang="ts">
import { auth } from '../firebase/index';
import Vue from 'vue';
//eslint-disable-next-line
import { User } from '@/ entities/models';

interface Data {
  imgUrl: string;
}

interface Computed {
  user: User;
}
interface Methods {
  logout: () => void;
}
export default Vue.extend<Data, Methods, Computed>({
  /*  name: "User", */
  data() {
    return {
      imgUrl: '',
    };
  },
  computed: {
    user() {
      return this.$store.getters.giveUser;
    },
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace({ path: '/' });
          this.$store.dispatch('fetchUser', null);
          this.$store.dispatch('Boards', null);
          this.$store.commit('setLoader');
        })
        .catch((err) => {
          window.alert(err);
        });
    },
  },
  metaInfo() {
    return {
      title: 'Home',
    };
  },
  created() {
    this.imgUrl = `https://avatars.dicebear.com/api/bottts/${this.user.data.uid}.svg`;
  },
});
</script>

<style lang="scss" scoped>
@media only screen and(max-width:768px) {
  .parent-c {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}
.parent-c {
  max-width: 50%;
  padding: 15px !important;
}
a {
  color: inherit !important;
  text-decoration: none !important;
  &:hover {
    color: inherit !important;
    text-decoration: none !important;
  }
}
.card {
  border: none !important;
}
.card-body {
  padding: 0 !important;
}
.card-img-top {
  margin: auto;
  display: block;
  max-width: 100%;
  border-radius: 10000px !important;
}
.row {
  align-items: center;
}
.img {
  width: 20px;
}
</style>
