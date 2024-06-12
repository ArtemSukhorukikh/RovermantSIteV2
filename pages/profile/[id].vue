<script setup lang="ts">
    import { useAuthStore } from '../../store/auth';
    import { useCompaniesStore } from '../../store/companies';

    definePageMeta({
        middleware: [
            'auth'
        ]
    })
    console.log('setup')

    const {id} = useAuthStore();
    const { getCompanies } = useCompaniesStore();

    if (id) {
        getCompanies(id)
    }
</script>

<template>

</template>