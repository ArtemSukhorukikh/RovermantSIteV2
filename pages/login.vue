<script setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "../store/auth"; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated, id } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const error = ref("");
const router = useRouter();
const user = ref({
  username: null,
  password: null,
});
const login = async () => {
  error.value = "";
  try {
    await authenticateUser(user.value); // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated
    if (authenticated) {
      router.push({
        path: `/profile/${id.value}`,
      });
    }
  } catch (errorData) {
    error.value = "Ошибка аторизации, попробуйте снову чеез некоторое время.";
  }
};
</script>

<template>
  <UContainer class="items-center justify-center">
    <div>
      <span class="text-4xl font-semibold">Вход</span>
      <UFormGroup class="text-black" label="Эл. почта" required>
        <UInput
          color="indigo"
          variant="outline"
          placeholder="you@example.com"
          icon="i-heroicons-envelope"
          v-model="user.username"
        />
      </UFormGroup>
      <UFormGroup class="text-black" label="Пароль" required>
        <UInput
          color="indigo"
          variant="outline"
          placeholder="Пароль"
          type="password"
          v-model="user.password"
        />
      </UFormGroup>

      <UAlert
        v-if="error"
        icon="i-heroicons-command-line"
        color="red"
        variant="outline"
        :title="error"
      />

      <UButton
        class="mt-3 mr-7"
        color="indigo"
        variant="outline"
        @click.prevert="login"
        >Вход</UButton
      >
      <UButton class="mt-3" color="emerald" variant="outline">
        <NuxtLink to="/registration">Регистрация</NuxtLink>
      </UButton>
    </div>
  </UContainer>
</template>

<style>
/* html {
    background-image: url('/img/house.png');
    background-position: left bottom;
    background-repeat: no-repeat;
    background-size: auto;
} */
</style>
