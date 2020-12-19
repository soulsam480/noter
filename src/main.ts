import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueMeta from 'vue-meta';
import VueCompositionAPI from '@vue/composition-api';
import authState from './utils/authState';
Vue.use(VueCompositionAPI);
Vue.use(VueMeta);

//firebase auth fires each time the auth state is changed
Vue.config.productionTip = false;

/* auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch("fetchUser", user);
    store.commit("Boards", user.uid);
    router.push({ path: "/boards" });
  } else {
    store.dispatch("fetchUser", null);
    store.commit("Boards", []);
  }
}); */

authState();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
