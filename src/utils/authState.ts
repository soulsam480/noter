import { createWs } from './sock';
import axios from 'axios';
import store from '@/store';
import { getCookie } from './index';
import { computed } from '@vue/composition-api';
import router from '@/router';

export default async () => {
  const rtoken = getCookie('loggedIn');

  if (rtoken === 'true') {
    const mainToken = computed(() => {
      return store.getters.getToken;
    });

    try {
      axios({
        method: 'post',
        url:
          process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_TOKEN
            : 'http://localhost:4000/token',
        withCredentials: true,
      }).then((res) => {
        store.dispatch('setToken', res.data.accessToken).then(async () => {
          await axios({
            method: 'get',
            url:
              process.env.NODE_ENV === 'production'
                ? process.env.VUE_APP_USER
                : 'http://localhost:4000/user',
            headers: {
              Authorization: `Bearer ${mainToken.value}`,
            },
          })
            .then((res) => {
              store.dispatch('USER', {
                email: res.data.email,
                username: res.data.username,
                name: res.data.name,
                uid: res.data.userId,
                img: res.data.imgUrl,
              });
              createWs(mainToken.value);
              store.dispatch('getBoards', res.data.userId);
              router.push('/boards');
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    } catch (err) {
      console.log(err);
    }

    setTimeout(async () => {
      try {
        axios({
          method: 'post',
          url:
            process.env.NODE_ENV === 'production'
              ? process.env.VUE_APP_TOKEN
              : 'http://localhost:4000/token',
          withCredentials: true,
        }).then((res) => {
          console.log(res);
          store.commit('setToken', res.data.accessToken);
        });
      } catch (err) {
        console.log(err);
        store.commit('adduser', null);
        store.commit('addToken', null);
      }
    }, 840000);
  }
};
