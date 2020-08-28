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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="text-center">Please Login</h3>
          </div>
          <div class="modal-body">
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
          this.$router.replace({ path: "/user" });
        })
        .catch(function(error) {
          window.alert(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
