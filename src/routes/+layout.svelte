<script lang="ts">
    import "../app.scss";
    import Navbar from "../components/Navbar.svelte";
    import {onMount} from "svelte";
    import {pb} from "$lib/stores/pocketbase";
    import {goto} from "$app/navigation";

    let {children, ...props} = $props();

    onMount(() => {
        const currentPath = window.location.pathname;
        const searchParams = window.location.search;

        if (pb.authStore.isValid) {
            // If authorized but on /login or /register, go to dashboard
            if (currentPath === '/login' || currentPath === '/register') {
                goto('/' + searchParams);
            }
        } else if (currentPath !== '/register') {
            goto('/login');
        }
    });
</script>

<div class="min-h-screen max-w-7xl mx-auto" {...props}>
    <Navbar/>

    {@render children()}
</div>

