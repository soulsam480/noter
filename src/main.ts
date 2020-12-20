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

authState();

/* const user = store.getters.giveUser;
if (user.loggedIn === true) {
 
} */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
