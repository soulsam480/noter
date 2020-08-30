import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "../firebase/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    beforeEnter: (to, from, next) => {
      if (auth.currentUser) {
        next();
      } else next({ path: "/" });
    },
  },
  {
    path: "/boards",
    name: "Boards",
    component: () => import("../views/Boards.vue"),
    beforeEnter: (to, from, next) => {
      if (auth.currentUser) {
        next();
      } else next({ path: "/" });
    },
  },
  {
    path: "/board/:_slug",
    name: "Board",
    component: () => import("../views/Board.vue"),
    params: true,
    beforeEnter: (to, from, next) => {
      if (auth.currentUser) {
        next();
      } else next({ path: "/" });
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
