import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);
import {auth} from "../firebase/index"
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to: any, from: any, next: any) => {
      if (!auth.currentUser) {
        next();
      } else next({ path: "/boards" });
    }
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    beforeEnter: (to: any, from: any, next: any) => {
      if (auth.currentUser) {
        next();
      } else next({ path: "/" });
    }
  },
  {
    path: "/boards",
    name: "Boards",
    component: () => import("../views/Boards.vue"),
    beforeEnter: (to: any, from: any, next: any) => {
      if (auth.currentUser) {
        next();
      } else next({ path: "/" });
    },
    children: [
      {
        path: ":_slug",
        name: "Board",
        component: () => import("../views/Board.vue"),
        params: true
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
