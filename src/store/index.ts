import { Board, User, BoardStatus, UserData } from "./../ entities/models";
import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {},
    } as User,
    boards: [] as Board[],
    boardStatus: {} as BoardStatus
  },
  mutations: {
    setLogIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data: UserData) {
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
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      //todo BUG
      /**
       * ? exp
       * for the setlogin mutation two work properly, the user needs to be either null or an object
       * As in the user type , it can only be a object this may break the code
       * todo check this
       */
      commit("setLogIn", user !== null);
      if (user) {
        commit("setUser", {
          name: user.email.split("@")[0].toLowerCase(),
          email: user.email,
          img: user.photoURL,
          uid: user.uid,
          num: user.phoneNumber,
          eVer: user.emailVerified
        } as UserData);
      } else {
        commit("setUser", null);
      }
    }
  },
  getters: {
    giveUser: (state): User => {
      return state.user;
    },
    boards: (state): Board[] => {
      return state.boards;
    },
    boardStatus: (state): BoardStatus => {
      return state.boardStatus;
    }
  },
  modules: {}
});
