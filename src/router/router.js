import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "Home" */ "@/pages/Home.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});

export default router;
