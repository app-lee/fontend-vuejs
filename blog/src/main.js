import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

//import vue route
import VueRouter from "vue-router";
Vue.use(VueRouter);

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

const routes = [
  { path: "/", component: HomePage, name: "homepage" },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard, name: "dashboard" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
