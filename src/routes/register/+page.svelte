<script lang="ts">

    import {Button, Hr, Input, Label} from "flowbite-svelte";
    import {pb} from "$lib/stores/pocketbase";
    import {goto} from "$app/navigation";
    import Error from "../../components/Error.svelte";

    let form = {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        error: ''
    }

    async function register() {
        form.error = ''; // Clear previous error.

        try {
            console.log(form)
            await pb.collection('users').create(form);

            await goto('/');
        } catch (err: any) {
            form.error = err?.response || 'An unexpected error occurred. Please check the console and report.';
        }
    }
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<form
        class="max-w-xl mx-auto mt-6"
        onsubmit={register}
>
    <p class="tracking-tight leading-none text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Welcome to
        sharefiles!</p>

    <div class="mt-2">
        <Label for="default-input" class="block mb-2">Name and email</Label>
        <Input id="default-input" placeholder="Name" bind:value={form.username} name="name" required/>
        <Input id="default-input" placeholder="Email" bind:value={form.email} name="email" class="mt-2" required/>
    </div>

    <Hr classHr="w-96 h-1 mx-auto my-4 rounded md:my-8"/>

    <div class="mt-4">
        <Label for="default-input" class="block mb-2">Password</Label>
        <Input id="default-input" placeholder="Password" bind:value={form.password} name="password" type="password"
               required/>
        <Input id="default-input" class="mt-2" placeholder="Confirm password" bind:value={form.passwordConfirm}
               name="passwordConfirm" type="password"
               required/>
    </div>

    <div class="flex flex-row justify-between mt-4">
        <button class="text-gray-900 dark:text-white" onclick={() => goto("/login")}>Log in <span
                class="underline text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700 dark:text-white">instead.</span>
        </button>
        <Button
                type="submit"
                formaction="?/create"
        >Register
        </Button>
    </div>

    <Error error={form.error}/>
</form>

