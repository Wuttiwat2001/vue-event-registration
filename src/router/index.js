import * as vueRouter from "vue-router";
import Home from "@/views/Home.vue";
import EventRegistration from "@/views/EventRegistration.vue";

const routes = [
  {
    path: "/",
    name: "eventRegistration",
    component: EventRegistration,
  }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(import.meta.env.BASE_URL),
  routes,
});



export default router;
