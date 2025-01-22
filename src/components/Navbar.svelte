<script>
    import {DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl, Spinner} from 'flowbite-svelte';
    import {currentUser} from "$lib/pocketbase";
    import {onMount} from "svelte";

    let loading = true;

    onMount(() => {
        return currentUser.subscribe(() => {
            loading = false;
        });
    });
</script>

{#if loading}
    <!-- Show spinner while loading -->
    <div class="flex items-center justify-center h-screen">
        <Spinner class="w-20 h-20" color="primary" />
    </div>
{:else if $currentUser}
    <Navbar color="form" class="xl:rounded-lg xl:mt-4">
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">sharefiles</span>
        </NavBrand>
        <NavHamburger />
        <NavUl>
            <NavLi href="/">Dash</NavLi>
            <NavLi href="/new">New</NavLi>

            <!-- Colour switch -->
            <DarkMode class="p-0" size="lg" />
        </NavUl>
    </Navbar>
{:else}
    <Navbar color="form" class="max-w-2xl mx-auto xl:rounded-lg xl:mt-4">
        <NavBrand>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">sharefiles</span>
        </NavBrand>
        <NavUl>
            <!-- Colour switch -->
            <DarkMode class="p-0" size="lg" />
        </NavUl>
    </Navbar>
{/if}