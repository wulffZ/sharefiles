<script lang="ts">

    import {Button, Input, Label, Toast, Hr} from "flowbite-svelte";
    import {ExclamationCircleSolid} from "flowbite-svelte-icons";
    import {enhance} from '$app/forms';
    import {goto} from "$app/navigation";


    let {form} = $props();
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<form
        class="max-w-xl mx-auto mt-6"
        enctype="multipart/form-data"
        method="post"
        use:enhance
>
    <p class="tracking-tight leading-none text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Welcome back.</p>

    <div class="mt-2">
        <Label for="default-input" class="block mb-2">Name & email</Label>
        <Input id="default-input" placeholder="Email" name="email" required/>
        <Input id="default-input" placeholder="Password" name="password" class="mt-2" required/>
    </div>

    <div class="flex flex-row justify-between mt-4">
        <p class="text-gray-900 dark:text-white" onclick={() => goto("/register")}>No account? <span class="underline text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700 dark:text-white">Register.</span></p>
        <Button
                type="submit"

        >Log in
        </Button>
    </div>

    {#if form?.errors}
        <div class="error">
            <Toast position="bottom-right">
                <svelte:fragment slot="icon">
                    <ExclamationCircleSolid class="w-5 h-5"/>
                    <span class="sr-only">Warning icon</span>
                </svelte:fragment>
                <p>{ form?.errors.email }</p>
                <p>{ form?.errors.password }</p>
            </Toast>
        </div>
    {/if}
</form>

