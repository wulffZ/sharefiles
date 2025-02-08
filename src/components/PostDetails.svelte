<script lang="ts">
    import {currentUser, pb} from "$lib/stores/pocketbase";
    import {env} from "$env/dynamic/public";
    import {goto, pushState} from "$app/navigation";
    import {createEventDispatcher} from "svelte";

    import {Modal, Button, Badge, Hr} from 'flowbite-svelte';
    import {
        DownloadOutline,
        TrashBinOutline,
        PenNibOutline,
        UserAddOutline,
        ExclamationCircleOutline
    } from "flowbite-svelte-icons";
    import Error from "./Error.svelte";

    let {
        post,
        isOpen = $bindable(),
        fileUrl = `${env.PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.file}`
    } = $props();

    let dispatch = createEventDispatcher();  // Create event dispatcher

    let isOwner = $state(post.user_id === $currentUser?.id);
    let confirmDelete = $state(false);
    let error = $state('');

    function closeModal() {
        isOpen = false;
        pushState(window.location.pathname, {});
    }

    async function remove() {
        try {
            await pb.collection('posts').delete(post.id)

            closeModal();
            dispatch("delete");
        } catch(err: any) {
            error = err?.response.message || "An unexpected error occurred. Please check the console and report."
        }
    }

    function download() {
        window.open(fileUrl, '_blank');
    }
</script>

<Modal
        title={post.title}
        bind:open={isOpen}
        autoclose
        outsideclose
        on:close={closeModal}
>
    <div class="space-y-4">
        <div class="flex flex-row justify-between">
            <div class="">
                <p>{post.description}</p>
            </div>
            <div class="flex flex-row">
                <UserAddOutline class="w-6 h-6"/>
                <p class="text-sm ml-1">
                    {post.expand?.user_id?.name ?? '?'}
                </p>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <div class="flex flex-wrap gap-2">
                {#each post.tags as tag}
                    <Badge>{tag}</Badge>
                {/each}
            </div>

            <div class="text-sm text-gray-500 text-right">
                <p>Created: {new Date(post.created).toLocaleDateString()}</p>
                <p>Updated: {new Date(post.updated).toLocaleDateString()}</p>
            </div>
        </div>
    </div>

    <svelte:fragment slot="footer">
        <div class="flex justify-between items-center w-full">
            {#if isOwner}
                <div class="flex flex-row gap-2">
                    <Button color="red" on:click={() => (confirmDelete = true)}>
                        <TrashBinOutline class="w-6 h-6"/>
                    </Button>

                    <Button color="green" on:click={() => goto('edit/' + post.id)}>
                        <PenNibOutline class="w-6 h-6"/>
                    </Button>
                </div>
            {/if}

            <div class="flex flex-row">
                <Button class="ml-4" on:click={download}>
                    <DownloadOutline class="w-6 h-6"/>
                </Button>
            </div>
        </div>
    </svelte:fragment>
</Modal>

<Modal bind:open={confirmDelete} size="xs" class="border-2" autoclose>
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"/>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure?</h3>
        <Button color="red" class="me-2" on:click={remove}>Yes, I'm sure</Button>
        <Button color="alternative">No, cancel</Button>
    </div>
</Modal>

{#if error}
    <Error error={error}/>
{/if}