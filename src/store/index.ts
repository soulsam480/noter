import { Board, User, BoardStatus, UserData } from './../ entities/models';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {},
    } as User,
    TOKEN: '' as string,
    /*    boards: [] as Board[],
    boardStatus: {} as BoardStatus */
  },
  mutations: {
    setToken: (state, token: string) => {
      state.TOKEN = token;
    },
    setLogin(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data: UserData) {
      state.user.data = data;
    },
    /*     Boards: (state, uid) => {
      db.ref(`/Users/${uid}/Boards`).on("value", snap => {
        state.boards = [];
        snap.forEach(csnap => {
          if (!state.boards.find(el => el.key === csnap.key)) {
            state.boards.push({
              key: csnap.key as string,
              data: csnap.val().data,
              meta: csnap.val().meta,
            } as Board);
          }
        });
        state.boards.sort((a, b) => {
          return b.meta.stamp - a.meta.stamp;
        });
      });
    },
    setBoard: (state, data) => {
      state.boardStatus = data;
    } */
  },
  actions: {
    USER: ({ commit }, data) => {
      commit('setLogin', data !== null);
      if (data !== null) {
        commit('setUser', data);
      } else {
        commit('setLogin', false);
      }
    },
    REGISTER: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:4000/register',
          method: 'post',
          data: {
            username: user.username,
            email: user.email,
            password: user.password,
          },
        })
          .then((res) => {
            dispatch('USER', {
              email: res.data.email,
              username: res.data.username,
              name: res.data.name,
              uid: res.data.userId,
              img: res.data.imgUrl,
            } as UserData);
            commit('setToken', res.data.accessToken);
            resolve(res);
          })
          .catch((err) => {
            dispatch('USER', null);
            commit('setToken', null);
            reject(err);
          });
      });
    },
    LOGIN: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:4000/login',
          method: 'post',
          data: {
            email: user.email,
            password: user.password,
          },
        })
          .then((res) => {
            dispatch('USER', {
              email: res.data.email,
              username: res.data.username,
              name: res.data.name,
              uid: res.data.userId,
              img: res.data.imgUrl,
            } as UserData);
            commit('setToken', res.data.accessToken);
            resolve(res);
          })
          .catch((err) => {
            dispatch('USER', null);
            commit('setToken', null);
            reject(err);
          });
      });
    },
    setToken: ({ commit }, dat: string) => {
      commit('setToken', dat);
    },
  },
  getters: {
    giveUser: (state): User => {
      return state.user;
    },
    getToken: (state) => {
      return state.TOKEN;
    },
    /*    boards: (state): Board[] => {
      return state.boards;
    },
    boardStatus: (state): BoardStatus => {
      return state.boardStatus;
    } */
  },
  modules: {},
});
