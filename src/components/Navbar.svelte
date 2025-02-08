<script>
    import {DarkMode, Input, Navbar, NavBrand, NavHamburger, NavLi, NavUl, Spinner} from 'flowbite-svelte';
    import {currentUser} from "$lib/stores/pocketbase";
    import {onMount} from "svelte";
    import {searchQuery} from "$lib/stores/search";

    let loading = $state(true);

    onMount(() => {
        return currentUser.subscribe(() => {
            loading = false;
        });
    });
</script>

{#if loading}
    <div class="flex items-center justify-center h-screen">
        <Spinner class="w-20 h-20" color="primary"/>
    </div>
{:else if $currentUser}
    <Navbar color="form" class="xl:rounded-lg xl:mt-4 flex items-center justify-between px-4">
        <div class="flex items-center gap-2">
            <NavBrand href="/" class="ml-2 mb-1">
            <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                sharefiles
            </span>
            </NavBrand>
        </div>

        <div class="flex items-center gap-4 xl:ml-auto">
            <!-- Desktop search bar -->
            <Input id="search-navbar"
                   class="max-h-10 xl:w-40 dark:bg-gray-700 max-w-32 flex-grow-0 hidden xl:block"
                   placeholder="Search..."
                   name="query"
                   bind:value={$searchQuery}
            />
        </div>

        <NavHamburger/>

        <!-- Nav Links -->
        <NavUl>
            <NavLi href="/">Dash</NavLi>
            <NavLi href="/new">New</NavLi>
            <NavLi href="/invite">Invite</NavLi>
        </NavUl>
        <DarkMode class="p-2 hidden xl:inline-flex" size="lg"/>

        <!-- Mobile search bar -->
        <div class="flex xl:hidden w-full mt-2">
            <Input id="search-navbar"
                   class="w-full max-h-10 dark:bg-gray-700"
                   placeholder="Search..."
                   name="query"
                   bind:value={$searchQuery}
            />

            <DarkMode class="p-2" size="lg"/>
        </div>
    </Navbar>
{:else}
    <Navbar color="form" class="max-w-2xl mx-auto xl:rounded-lg xl:mt-4">
        <NavBrand>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">sharefiles</span>
        </NavBrand>
        <NavUl>
            <!-- Colour switch -->
            <DarkMode class="p-0" size="lg"/>
        </NavUl>
    </Navbar>
{/if}