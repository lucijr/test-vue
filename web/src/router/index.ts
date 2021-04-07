import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/customers",
    name: "customers",
    component: () => import("../components/CustomersList.vue")
  },
  {
    path: "/customers/:id",
    name: "customer-details",
    component: () => import("../components/Customer.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddCustomer.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
