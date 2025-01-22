<script>
    import {Toast} from "flowbite-svelte";
    import {ExclamationCircleSolid} from "flowbite-svelte-icons";

    let {error} = $props();
</script>

{#if error}
    <div class="fixed bottom-5 right-5">
        <Toast>
            <svelte:fragment slot="icon">
                <ExclamationCircleSolid class="w-5 h-5"/>
            </svelte:fragment>
            {#each Object.entries(error.data) as [title, detailedError]}
                <p>{title}: {detailedError.message}</p>
            {/each}
        </Toast>
    </div>
{/if}