/*
 * @Author: guowu
 * @Date: 2021-04-07 10:36:07
 * @LastEditTime: 2021-04-07 11:20:00
 */
import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import("@/views/Home.vue"),
  },

];

const router = new VueRouter({
  routes,
});

export default router;
