<script setup>
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>

<template>
    <Link :href="'/'">
        <ApplicationLogo class="w-60 rounded-md shadow-blue-300 shadow-2xl"></ApplicationLogo>
    </Link>
</template>
