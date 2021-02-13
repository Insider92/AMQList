import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/search",
      name: "search",
      component: () => import("./components/Search")
    },
    {
      path: "/songs",
      alias: "/songs",
      name: "songs",
      component: () => import("./components/Songs")
    },
    {
      path: "/songs/:id",
      name: "songs-details",
      component: () => import("./components/Song")
    },
    {
      path: "/add",
      name: "add-song",
      component: () => import("./components/AddSong")
    }
  ]
});