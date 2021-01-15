import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase';
import VueMeta from 'vue-meta';

Vue.use(VueMeta);
//firebase auth fires each time the auth state is changed
Vue.config.productionTip = false;
store.commit('setLoader');
auth.onAuthStateChanged(async (user) => {
  if (user) {
    store.dispatch('fetchUser', user);
    await store.dispatch('Boards', user.uid).then(() => {
      router.push({
        path: (router.currentRoute.query.redirect as string) ?? '/boards',
      });
      setTimeout(() => {
        store.commit('setLoader');
      }, 1000);
    });
  } else {
    store.commit('setLoader');
    store.dispatch('fetchUser', null);
    store.dispatch('Boards', null);
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
