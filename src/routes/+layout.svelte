<script lang="ts">
    import "../app.scss";
    import Navbar from "../components/Navbar.svelte";

    let { data, children, ...props} = $props(); // Get data from layout.server.ts
    let user = data.user;
</script>

<div class="min-h-screen max-w-7xl mx-auto mt-4" {...props}>
        <Navbar user={user}/>

        {@render children()}
</div>

