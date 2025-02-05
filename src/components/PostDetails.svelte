<script>
    import {Modal, Button, Badge} from 'flowbite-svelte';
    import {pushState} from "$app/navigation";
    import {DownloadOutline} from "flowbite-svelte-icons";
    import {env} from "$env/dynamic/public";

    let {
        post,
        isOpen = $bindable(),
        fileUrl = `${env.PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.file}`
    } = $props();

    function closeModal() {
        isOpen = false;
        pushState(window.location.pathname, {});
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
        <p>{post.description}</p>
        <div class="flex flex-wrap gap-2">
            {#each post.tags as tag}
                <Badge>{tag}</Badge>
            {/each}
        </div>
    </div>

    <svelte:fragment slot="footer">
        <Button on:click={download}>
           Download <DownloadOutline class="w-6 h-6 ml-2"/>
        </Button>
    </svelte:fragment>
</Modal>