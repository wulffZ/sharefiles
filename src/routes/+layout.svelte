<script lang="ts">
    import "../app.scss";
    import {onMount} from "svelte";
    import keycloak from '$lib/keycloak/keycloak';
    import {userStore} from "$lib/store/userStore";
    import { Spinner } from 'flowbite-svelte';
    import Navbar from "../components/Navbar.svelte";

    let { children, ...props } = $props();

    onMount(async () => {
        try {
            await keycloak.init({
                onLoad: 'login-required',
                checkLoginIframe: false
            });

            userStore.update((user) => {
                const accessToken = keycloak.token
                const idToken = keycloak.idToken
                const refreshToken = keycloak.refreshToken

                user.setTokens(
                    accessToken ? accessToken : undefined,
                    idToken ? idToken : undefined,
                    refreshToken ? refreshToken : undefined,
                );
                return user;
            });
        } catch (error) {
            console.error('Keycloak initialization failed', error);
        }
    });
</script>

<div class="min-h-screen max-w-7xl mx-auto mt-4" {...props}>
    {#if $userStore.isAuthenticated}
        <Navbar/>

        {@render children()}
    {:else}
        <Spinner />
    {/if}

</div>
