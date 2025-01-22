<script lang="ts">

    import {Button, Input, Label, Toast, Hr} from "flowbite-svelte";
    import {ExclamationCircleSolid} from "flowbite-svelte-icons";
    import {goto} from "$app/navigation";
    import {pb} from "$lib/pocketbase";

    let email: string;
    let password: string;
    let error: string;

    async function login() {
        error = ''; // Clear previous error.

        try {
            await pb.collection('users').authWithPassword(email, password);

            await goto("/");
        } catch (err: any) {
            error = err?.response.message || "An unexpected error occurred. Please check the console and report.";
        }
    }
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<form
        class="max-w-xl mx-auto mt-6"
        onsubmit={login}
>
    <p class="tracking-tight leading-none text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Welcome back.</p>

    <div class="mt-2">
        <Label for="default-input" class="block mb-2">Email and password</Label>
        <Input id="default-input" placeholder="Email" bind:value={email} name="email" required/>
        <Input id="default-input" placeholder="Password" bind:value={password} name="password" class="mt-2" required/>
    </div>

    <div class="flex flex-row justify-between mt-4">
        <button class="text-gray-900 dark:text-white" onclick={() => goto("/register")}>No account? <span
                class="underline text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700 dark:text-white">Register.</span>
        </button>
        <Button
                type="submit"

        >Log in
        </Button>
    </div>

    {#if error}
        <div class="fixed bottom-5 right-5">
            <Toast>
                <svelte:fragment slot="icon">
                    <ExclamationCircleSolid class="w-5 h-5"/>
                </svelte:fragment>
                <p>{error}</p>
            </Toast>
        </div>
    {/if}
</form>

