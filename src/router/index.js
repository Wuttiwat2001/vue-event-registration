import * as vueRouter from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import Home from "@/views/Home.vue";
import EventRegistration from "@/views/EventRegistration.vue";
import EventCreate from "@/views/EventCreate.vue";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/event",
    name: "eventRegistration",
    component: EventRegistration,
    meta: { showContent: true, isSecured: true },
    children: [
      {
        path: "create",
        name: "eventCreate",
        component: EventCreate,
        meta: { showContent: false, isSecured: true },
      },
      // {
      //   path: "edit/:id",
      //   name: "eventEdit",
      //   component: EventEdit,
      //   meta: { showContent: false },
      // },
    ],
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();


  if (to.matched.some((record) => record.meta.isSecured)) {
    if (authStore.user.isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (authStore.user.isLoggedIn) {
      // if (to.name === "NotFound") {
      //   next();
      // } else {
        router.push("/event");
      // }
    } else {
      next();
    }
  }
});

export default router;
