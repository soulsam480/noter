<template>
  <div>
    <div
      class="modal fade"
      id="loginModal"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header d-flex justify-contents-center">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  >Login</a
                >
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  >Sign Up</a
                >
              </li>
            </ul>
          </div>
          <div class="modal-body ">
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      v-model="email"
                    />
                    <small id="emailHelp" class="form-text text-muted"
                      >We'll never share your email with anyone else.</small
                    >
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      v-model="pass"
                      v-on:keyup.enter="login"
                    />
                  </div>

                  <button
                    data-dismiss="modal"
                    class="n-btn"
                    style="width:100%; margin:0;"
                    @click="login"
                  >
                    Login
                  </button>
                  <br />
                  <br />
                </form>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <!--//todo Signup Form-->
                <form>
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      v-model="username"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail2">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                      v-model="email"
                    />
                    <small id="emailHelp" class="form-text text-muted"
                      >We'll never share your email with anyone else.</small
                    >
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword2">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword2"
                      v-model="pass"
                      v-on:keyup.enter="signUp"
                    />
                  </div>

                  <button
                    data-dismiss="modal"
                    style="width:100%; margin:0;"
                    class=" n-btn"
                    @click="signUp"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Login',
  data() {
    return {
      email: '',
      pass: '',
      username: '',
      name: '',
    };
  },
  props: [],
  computed: {},
  methods: {
    async login() {
      await this.$store
        .dispatch('LOGIN', {
          email: this.email,
          password: this.pass,
        })
        .then(() => {
          this.email = '';
          this.pass = '';
        })
        .catch(() => {
          this.email = '';
          this.pass = '';
        });
    },
    async signUp() {
      await this.$store
        .dispatch('REGISTER', {
          email: this.email,
          password: this.pass,
          username: this.username,
          name: this.name,
        })
        .then((res) => {
          console.log(res);
          this.email = '';
          this.pass = '';
        })
        .catch((err) => {
          this.email = '';
          this.pass = '';
          console.log(err);
        });
    },
  },
});
</script>

<style lang="scss" scoped></style>
