<script lang="ts">
    import "../app.scss";
    import Navbar from "../components/Navbar.svelte";
    import {onMount} from "svelte";
    import {pb} from "$lib/pocketbase";
    import {goto} from "$app/navigation";

    let {children, ...props} = $props();

    onMount(() => {
        if (pb.authStore.isValid) {
            // If authorized but on /login or /register, go to dashboard.
            if (window.location.pathname === '/login' || window.location.pathname === '/register') {
                goto('/');
            }
        } else if (window.location.pathname !== '/register') {
            goto('/login')
        }
    });
</script>

<div class="min-h-screen max-w-7xl mx-auto" {...props}>
    <Navbar/>

    {@render children()}
</div>

