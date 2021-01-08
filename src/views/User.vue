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

                <button class="n-btn btn-sm" @click="logout">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
//eslint-disable-next-line
import { User } from '@/ entities/models';
import Axios from 'axios';

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
    async logout() {
      await Axios({
        url: 'http://localhost:4000/logout',
        withCredentials: true,
      }).then(() => {
        this.$store
          .dispatch('logout')
          .then(() => {
            this.$router.push('/');
          })
          .catch(() => {
            this.$router.push('/');
          });
      });
    },
  },
  metaInfo() {
    return {
      title: 'Home',
    };
  },
  created() {
    this.imgUrl = `https://avatars.dicebear.com/4.5/api/bottts/${this.user.data?.uid}.svg`;
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
</style>
