import * as vueRouter from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import EventRegistration from "@/views/EventRegistration.vue";
import Login from "@/views/Login.vue";
import NoFound from "@/views/NotFound.vue";

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
    meta: { isSecured: true },
  },
  {
    path: "/404",
    name: "NotFound",
    component: NoFound,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
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
      if (to.name === "NotFound") {
        next();
      } else {
        router.push("/event");
      }
    } else {
      next();
    }
  }
});

export default router;
