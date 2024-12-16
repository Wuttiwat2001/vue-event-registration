import * as vueRouter from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import EventRegistrationPage from "@/views/EventRegistrationPage.vue";
import Login from "@/views/Login.vue";
import NoFoundPage from "@/views/NotFoundPage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import AuthorizedPage from "@/views/AuthorizedPage.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/event",
    name: "eventRegistrationPage",
    component: EventRegistrationPage,
    meta: { isSecured: true },
  },
  {
    path: "/403",
    name: "authorizedPage",
    component: AuthorizedPage,
  },
  {
    path: "/404",
    name: "notFoundPage",
    component: NoFoundPage,
  },
  {
    path: "/500",
    name: "errorPage",
    component: ErrorPage,
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
      if (to.name === "notFoundPage" || to.name === "errorPage" || to.name === "authorizedPage") {
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
