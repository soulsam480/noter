import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
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
  },
  {
    path: "/boards",
    name: "Boards",
    component: () => import("../views/Boards.vue"),
  },
  {
    path: "/board/:_slug",
    name: "Board",
    component: () => import("../views/Board.vue"),
    params: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
