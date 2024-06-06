<script setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const router = useRouter();


const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>

<template>
    <div class="bg-white">
        <div class="menu-bar">
            <img src="/img/i_company_logo.png" />
            <p class="text-3xl font-semibold text-zinc-950">Интеллектуальная Поддержка Предпринимателей</p>
            <UButton v-if="!authenticated" class="auth-btn" color="indigo" variant="solid">
                <nuxt-link class="text-white text-lg" to="/login">Вход</nuxt-link>
            </UButton>
            <div v-else class="auth-btn">
                <UButton  color="indigo" variant="solid" @click="logout">
                    Выход
                </UButton>
            </div>
        </div>
        <slot />
    </div>
</template>