<script setup lang="ts">
    definePageMeta({
        middleware: [
            'auth'
        ],
        validate: async (route) => {
            // Check if the id is made up of digits
            return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
        }
    })

    const route = useRoute()
    const id = Number(route.params.id);
    const { data: user } = await useFetch(`/api/user/${id}`)
</script>

<template>
    <UContainer class="mt-32">
        <UserPage v-if="user?.role !== 'ADMIN'" :user="user"/>
    </UContainer>
</template>