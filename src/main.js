import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./firebase";

//firebase auth fires each time the auth state is changed
Vue.config.productionTip = false;

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    store.dispatch("fetchUser", user);
    store.commit("Boards", user.uid);
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
