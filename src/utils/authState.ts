import { createWs } from './sock';
// todo Helper function for persisting user and silent log in
import axios from 'axios';
import store from '@/store';
import { getCookie } from './index';
import { computed } from '@vue/composition-api';
import router from '@/router';

export default async () => {
  //todo check for refresh token
  const rtoken = getCookie('loggedIn');

  if (rtoken === 'true') {
    //todo get reactive token from store after getting new token
    const mainToken = computed(() => {
      return store.getters.getToken;
    });

    try {
      //todo new token
      axios({
        method: 'post',
        url: 'http://localhost:4000/token',
        withCredentials: true,
      }).then((res) => {
        //todo store token in state
        store.dispatch('setToken', res.data.accessToken).then(async () => {
          //todo silent login
          await axios({
            method: 'get',
            url: 'http://localhost:4000/user',
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
          url: 'http://localhost:4000/token',
          withCredentials: true,
        }).then((res) => {
          console.log(res);
          store.commit('setToken', res.data.accesToken);
        });
      } catch (err) {
        console.log(err);
        store.commit('adduser', null);
        store.commit('addToken', null);
      }
    }, 840000);
  }
};
