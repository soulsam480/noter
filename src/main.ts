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

Vue.config.productionTip = false;

const main = () => {
  store.watch(
    (state) => state.user.loggedIn,
    (val) => {
      if (!val) {
        router.push('/');
      } else {
        router.currentRoute.query.redirectTo
          ? router.push({
              path: router.currentRoute.query.redirectTo as string,
            })
          : router.push('/boards');
      }
    },
  );
};

main();

authState();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
