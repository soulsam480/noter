import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    boards: [],
  },
  mutations: {
    setLogIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    },
    Boards: (state, uid) => {
      db.ref(`/Users/${uid}/Boards/`).on("value", (snap) => {
        state.boards = [];
        snap.forEach((csnap) => {
          if (!state.boards.find((el) => el.key === csnap.key)) {
            state.boards.push({
              key: csnap.key,
              data: csnap.val().data,
              meta: csnap.val().meta,
            });
          }
        });
      });
    },
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
          eVer: user.emailVerified,
        });
      } else {
        commit("setUser", null);
      }
    },
  },
  getters: {
    giveUser: (state) => {
      return state.user;
    },
    boards: (state) => {
      return state.boards;
    },
  },
  modules: {},
});
