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

            {#if typeof error === 'string'}
                <p>{error}</p>
            {/if}

            {#if error.data}
                {#if Object.keys(error.data).length > 0}
                    {#each Object.entries(error.data) as [title, detailedError]}
                        <p>{title}: {detailedError.message}</p>
                    {/each}
                {/if}

                {#if error.message}
                    <p>{error.message}</p>
                {/if}
            {/if}
        </Toast>
    </div>
{/if}