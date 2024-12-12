import * as vueRouter from "vue-router";
import Home from "@/views/Home.vue";
import EventRegistration from "@/views/EventRegistration.vue";
import EventCreate from "@/views/EventCreate.vue";

const routes = [
  {
    path: "/event",
    name: "eventRegistration",
    component: EventRegistration,
    meta: { showContent: true }, 
    children: [
      {
        path: "create",
        name: "eventCreate",
        component: EventCreate,
        meta: { showContent: false },
      },
      // {
      //   path: "edit/:id",
      //   name: "eventEdit",
      //   component: EventEdit,
      //   meta: { showContent: false },
      // },
    ],
  }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(import.meta.env.BASE_URL),
  routes,
});



export default router;
