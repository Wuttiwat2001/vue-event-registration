import * as vueRouter from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

//user
import Login from "@/views/user/Login.vue";
//admin
import LoginAdmin from "@/views/admin/LoginAdmin.vue";
import ManageEventRegistration from "@/views/admin/ManageEventRegistration.vue";

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
    path: "/admin/login",
    name: "admin-login",
    component: LoginAdmin,
  },
  {
    path: "/admin/manage-event-registration",
    name: "manage-event-registration",
    component: ManageEventRegistration,
    meta: { isSecured: true, role: "ADMIN" },
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
      if (to.meta.role && !authStore.user.roles.includes(to.meta.role)) {
        next("/403");
      } else {
        next();
      }
    } else {
      next("/login");
    }
  } else {
    if (authStore.user.isLoggedIn) {
      if (to.name === "notFoundPage" || to.name === "errorPage" || to.name === "authorizedPage") {
        next();
      } else {
        if (authStore.user.roles.includes("ADMIN")) {
          router.push("admin/manage-event-registration");
        } else {
          console.log("/admin/manage-event-registration")
          router.push("/admin/manage-event-registration");
        }
      }
    } else {
      next();
    }
  }
});

export default router;