import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  console.log("auth.ts");
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const { id } = storeToRefs(useAuthStore());
  const user = await $fetch(`/api/user/${id}`);
  const token = useCookie("token"); // get token from cookies

  if (token.value) {
    // check if value exists
    authenticated.value = true;
    // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === "login") {
    return navigateTo("/");
  }

  if (to.params.id !== id.value && user.role !== "ADMIN") {
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});
