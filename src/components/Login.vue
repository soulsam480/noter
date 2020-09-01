<template>
  <div>
    <div
      class="modal fade"
      id="staticBackdrop"
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
                    class="btn btn-primary"
                    @click="login"
                  >
                    Login
                  </button>
                </form>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
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
                    class="btn btn-primary"
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

<script>
import { auth } from "../firebase/index";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  props: [],
  computed: {},
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.email = "";
          this.pass = "";
          this.$router.replace({ path: "/user" });
        })
        .catch(function(error) {
          this.email = "";
          this.pass = "";
          window.alert(error.message);
        });
    },
    signUp() {
      auth
        .createUserWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.email = "";
          this.pass = "";
          this.$router.replace({ path: "/user" });
        })
        .catch((err) => {
          this.email = "";
          this.pass = "";
          window.alert(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
