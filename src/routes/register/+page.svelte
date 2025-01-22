<script lang="ts">

    import {Button, Hr, Input, Label, Toast} from "flowbite-svelte";
    import {ExclamationCircleSolid} from "flowbite-svelte-icons";
    import {enhance} from '$app/forms';

    let { form } = $props();


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
    <p class="tracking-tight leading-none text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Welcome to sharefiles!</p>

    <div class="mt-2">
        <Label for="default-input" class="block mb-2">Name & email</Label>
        <Input id="default-input" placeholder="Name" name="name" required/>
        <Input id="default-input" placeholder="Email" name="email" class="mt-2" required/>
    </div>

    <Hr classHr="w-96 h-1 mx-auto my-4 rounded md:my-8" />

    <div class="mt-4">
        <Label for="default-input" class="block mb-2">Password</Label>
        <Input id="default-input" placeholder="Password" name="password" required/>
        <Input id="default-input" placeholder="Confirm password" name="passwordConfirm" class="mt-2" required/>
    </div>

    <div class="flex flex-row justify-end mt-4">
        <Button
                type="submit"
                formaction="?/create"
        >Register
        </Button>
    </div>

    {#if form?.errors}
        <div class="error">
            <Toast position="bottom-right">
                <svelte:fragment slot="icon">
                    <ExclamationCircleSolid class="w-5 h-5" />
                    <span class="sr-only">Warning icon</span>
                </svelte:fragment>
                <p>{ form?.errors.name }</p>
                <p>{ form?.errors.email }</p>
                <p>{ form?.errors.password }</p>
                <p>{ form?.errors.password_confirmation }</p>
            </Toast>
        </div>
    {/if}
</form>

