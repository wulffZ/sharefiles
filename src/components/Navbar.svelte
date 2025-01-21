<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { DarkMode } from 'flowbite-svelte';

    let { user } = $props();
</script>

{#if user}
    <Navbar rounded color="form">
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">sharefiles</span>
        </NavBrand>
        <NavHamburger />
        <NavUl>
            <NavLi href="/">Dash</NavLi>
            <NavLi href="/new">New</NavLi>

            <!-- colour switch -->
            <DarkMode class="p-0" size="lg"/>
        </NavUl>
    </Navbar>
{:else}
    <Navbar rounded color="form" class="max-w-2xl mx-auto">
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">sharefiles</span>
        </NavBrand>
        <NavUl>
            <!-- colour switch -->
            <DarkMode class="p-0" size="lg"/>
        </NavUl>
    </Navbar>
{/if}