import { createWs } from './../utils/sock';
import { Board, User, BoardStatus, UserData } from './../ entities/models';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { sock } from '@/utils/sock';
import { Promise } from 'core-js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {},
    } as User,
    TOKEN: '' as string,
    boards: [] as Board[],
    boardStatus: {} as BoardStatus,
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
    setBoards: (state, dat) => {
      if (dat) {
        state.boards = dat.map((el: any) => {
          return {
            ...el,
            data: JSON.parse(el.data),
            meta: JSON.parse(el.meta),
          };
        });

        state.boards.sort((a, b) => {
          return b.meta.stamp - a.meta.stamp;
        });
      }
    },
    setBoard: (state, data) => {
      state.boardStatus = data;
    },
    logoutUser: (state) => {
      state.user.data = null;
      state.user.loggedIn = false;
      state.boards = [];
    },
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
    REGISTER: ({ commit, dispatch, state }, user) => {
      return new Promise((resolve, reject) => {
        axios({
          url:
            process.env.NODE_ENV === 'production'
              ? process.env.VUE_APP_REGISTER
              : 'http://localhost:4000/register',
          method: 'post',
          withCredentials: true,
          data: {
            username: user.username,
            email: user.email,
            password: user.password,
            name: user.name,
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
            createWs(state.TOKEN);
            dispatch('getBoards', res.data.userId);
            resolve(res);
          })
          .catch((err) => {
            dispatch('USER', null);
            commit('setToken', null);
            reject(err);
          });
      });
    },
    LOGIN: ({ commit, dispatch, state }, user) => {
      return new Promise((resolve, reject) => {
        axios({
          url:
            process.env.NODE_ENV === 'production'
              ? process.env.VUE_APP_LOGIN
              : 'http://localhost:4000/login',
          method: 'post',
          withCredentials: true,
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
            createWs(state.TOKEN);
            dispatch('getBoards', res.data.userId);
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
    getBoards: () => {
      sock.emit('get-boards');
    },
    updateBoard: ({ commit, state }, dat: object) => {
      sock.emit('update-board', dat);
    },
    logout: ({ commit }) => {
      commit('logoutUser');
    },
    checkAuth: ({ state }): Promise<boolean> => {
      return new Promise((res, rej) => {
        if (state.user.loggedIn === true) {
          res(true);
        } else {
          rej(false);
        }
      });
    },
  },
  getters: {
    giveUser: (state): User => {
      return state.user;
    },
    getToken: (state) => {
      return state.TOKEN;
    },
    boards: (state): Board[] => {
      return state.boards;
    },
    boardStatus: (state): BoardStatus => {
      return state.boardStatus;
    },
    userStatus(state) {
      return state.user.loggedIn;
    },
    giveBoard: (state) => (id: string) => {
      return state.boards.find((el) => el.id === id);
    },
  },
  modules: {},
});
