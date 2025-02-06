<script lang="ts">
    import {Button, Heading, Modal, P} from 'flowbite-svelte';
    import {v4 as uuidv4} from 'uuid';
    import {ExclamationCircleOutline} from 'flowbite-svelte-icons';
    import Error from "../../components/Error.svelte";
    import {pb} from "$lib/stores/pocketbase.js";

    let confirmModal = $state(false);
    let inviteCode = $state('');
    let error = $state('');

    let form = {
        code: '',
        expired: false,
    }

    async function create() {
        const uuid = uuidv4();

        form.code = uuid;
        form.expired = false;

        try {
            await pb.collection('invites').create(form);

            inviteCode = uuid;
        } catch (err: any) {
            error = err?.response.message || "An unexpected error occurred. Please check the console and report.";
        }
    }
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main class="flex flex-col max-w-7xl mx-auto mt-4">
    <div class="text-center mt-2">
        <Heading tag="h1" class="mb-4" customSize="text-3xl font-extrabold  md:text-4xl lg:text-5xl">Invite others to
            sharefiles
        </Heading>
        <P class="mb-4 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">This platform is meant for everyone to
            share their files. If you feel like someone should have access, you can create a one time invite code.</P>
        <P class="text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Please, use this with caution. Do not just
            give everyone access. If someone needs to view a single file once, use the temporary link feature. Full
            access is reserved for <span class="font-bold underline">close friends or relatives</span></P>

        <P class="mt-2 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-red-400 font-bold">Misuse may lead to account
            deletion!</P>
    </div>
    <div class="flex flex-row justify-end mt-4 ">
        <Button on:click={() => (confirmModal = true)}>Create</Button>
    </div>
</main>


<Modal bind:open={confirmModal} size="xs" autoclose>
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"/>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure?</h3>
        <Button color="red" class="me-2" on:click={create}>Yes, I'm sure</Button>
        <Button color="alternative">No, cancel</Button>
    </div>
</Modal>

{#if error}
    <Error error={error}/>
{/if}

{#if inviteCode}
    <P class="text-center mt-10 text-4xl dark:text-white font-bold ">
        {inviteCode}
    </P>
{/if}