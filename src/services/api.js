import eventApi from "@/services/event.api";
import authApi from "@/services/auth.api";

export default {
  ...eventApi,
  ...authApi
};
