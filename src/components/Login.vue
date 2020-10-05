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
            <!--//todo these are tab navs-->
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
            <!--//todo these are tab content forms-->
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <!--//todo Login form-->
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
                  <div class="text-center">
                    <label>Login with Social Media</label>
                    <div>
                      <span @click="googleLogin" data-dismiss="modal"
                        ><img
                          class="login-logo"
                          src="../assets/google.svg"
                          alt=""
                      /></span>
                    </div>
                  </div>
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
import { auth, googleProvider } from "../firebase/index";
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      email: "" as string,
      pass: "" as string,
    };
  },
  props: [],
  computed: {},
  methods: {
    async googleLogin() {
      auth
        .signInWithPopup(googleProvider)
        .then(() => {
          this.email = "";
          this.pass = "";
        })
        .catch((error) => {
          this.email = "";
          this.pass = "";
          window.alert(error.message);
        });
    },
    async login() {
      auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.email = "";
          this.pass = "";
        })
        .catch((error) => {
          this.email = "";
          this.pass = "";
          window.alert(error.message);
        });
    },
    async signUp() {
      auth
        .createUserWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.email = "";
          this.pass = "";
        })
        .catch((err) => {
          this.email = "";
          this.pass = "";
          window.alert(err.message);
        });
    },
  },
});
</script>

<style lang="scss" scoped></style>
