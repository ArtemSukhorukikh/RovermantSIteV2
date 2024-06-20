<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});

const route = useRoute();
const id = Number(route.params.id);

const { data } = await useFetch(`/api/user/${id}`);
let user = ref(data);

async function reloadUser() {
  const { data } = await useFetch(`/api/user/${id}`);
  user = ref(data);
}
</script>

<template>
  <UContainer class="mt-32">
    <UserPage
      v-if="user && user.role !== 'ADMIN'"
      :user="user"
      @updateUser="reloadUser"
    />
    <AdminPage v-else />
  </UContainer>
</template>
