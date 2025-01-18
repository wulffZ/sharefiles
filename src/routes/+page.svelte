<script lang="ts">
    import keycloak from "$lib/keycloak/keycloak";
    import {onMount} from "svelte";
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main class="flex justify-center flex-col">
    <div class="flex justify-center">
        <!--{#if authenticated}-->
        <!--    <p>Welcome, {keycloak.tokenParsed?.preferred_username}</p>-->
        <!--{:else}-->
        <!--    <p>Loading...</p>-->
        <!--{/if}-->
    </div>
</main>

