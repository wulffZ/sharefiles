<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { DarkMode } from 'flowbite-svelte';


</script>

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