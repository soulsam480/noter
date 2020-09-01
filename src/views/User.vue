<template>
  <div>
    <br />
    <div v-if="user.loggedIn">
      <div class="row d-flex justify-content-center">
        <div class="col-4 parent-c">
          <div class="row">
            <div class="col-4">
              <img :src="imgUrl" class="card-img-top" />
            </div>
            <div class="col-8">
              <div class="card-body">
                <h4 class="card-title">{{ user.data.name }}</h4>
                <div class="card-text">
                  <p>Email: {{ user.data.email }}</p>
                  <p>User ID : {{ user.data.uid }}</p>
                </div>
                <button class="btn btn-info btn-sm">
                  <router-link :to="{ path: '/boards' }">My Boards</router-link>
                </button>
                <button class="btn btn-danger btn-sm" @click="logout">
                  Log Out
                </button>
              </div>
            </div>
          </div>
          <div class="card"></div>
        </div>
      </div>

      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "../firebase/index";
export default {
  name: "User",
  data() {
    return {
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({ user: "giveUser" }),
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace({ path: "/" });
          this.$store.dispatch("fetchUser", null);
          this.$store.commit("Boards", null);
        })
        .catch((err) => {
          window.alert(err);
        });
    },
  },
  metaInfo() {
    return {
      title: ` ${this.user.data.name}`,
    };
  },
  created() {
    this.imgUrl = `https://api.adorable.io/avatars/285/${this.user.data.uid}.png`;
  },
};
</script>

<style lang="scss" scoped>
@media only screen and(max-width:768px) {
  .parent-c {
    flex: 0 0 100%;
    max-width: 100%;
  }
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
</style>
