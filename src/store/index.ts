import { Board, User, BoardStatus } from './../ entities/models';
import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {}
    } as User,
    boards: [] as Board[],
    boardStatus: {} as BoardStatus
  },
  mutations: {
    setLogIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    },
    Boards: (state, uid) => {
      db.ref(`/Users/${uid}/Boards`).on("value", snap => {
        state.boards = [];
        snap.forEach(csnap => {
          if (!state.boards.find(el => el.key === csnap.key)) {
            state.boards.push({
              key: csnap.key as string,
              data: csnap.val().data,
              meta: csnap.val().meta
            });
          }
        });
        state.boards.sort((a, b) => {
          return b.meta.stamp - a.meta.stamp;
        });
      });
    },
    setBoard: (state, data) => {
      state.boardStatus = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("setLogIn", user !== null);
      if (user) {
        commit("setUser", {
          name: user.email.split("@")[0].toLowerCase(),
          email: user.email,
          img: user.photoURL,
          uid: user.uid,
          num: user.phoneNumber,
          eVer: user.emailVerified
        });
      } else {
        commit("setUser", {});
      }
    }
  },
  getters: {
    giveUser: state => {
      return state.user;
    },
    boards: state => {
      return state.boards;
    },
    boardStatus: state => {
      return state.boardStatus;
    }
  },
  modules: {}
});
