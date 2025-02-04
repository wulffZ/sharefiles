<script>
    import { Modal, Button } from 'flowbite-svelte';
    import { fade, fly } from 'svelte/transition';
    import { pushState } from "$app/navigation";
    import { page } from "$app/stores";

    let {
        post,
        isOpen = $bindable()
    } = $props();

    function closeModal() {
        isOpen = false;
        pushState(window.location.pathname, {});
    }
</script>

<Modal
        title={post.title}
        bind:open={isOpen}
        autoclose
        outsideclose
        on:close={closeModal}
        transition={fly}
        transitionConfig={{ duration: 300, y: 50 }}
>
    <div class="space-y-4"
         in:fade={{ duration: 300 }}
         out:fade={{ duration: 300 }}
    >
        <p>{post.description}</p>

    </div>

    <svelte:fragment slot="footer">
        <Button on:click={closeModal}>Close</Button>
    </svelte:fragment>
</Modal>