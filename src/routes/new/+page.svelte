<script lang="ts">
    import {Label, Input, Textarea, MultiSelect, Helper, Fileupload, Button, Toast} from 'flowbite-svelte';
    import {ExclamationCircleSolid} from 'flowbite-svelte-icons';
    import {enhance} from '$app/forms';
    import {Tags} from "$lib/enums/tags";

    let { form } = $props();

    let textAreaProps = {
        id: 'description',
        name: 'description',
        label: 'Description',
        rows: 4,
        placeholder: 'Additional information...'
    };

    let selectedTags = $state([]);
    const tags = Object.values(Tags).map((tag) => ({
        value: tag,
        name: tag,
    }));
</script>

<svelte:head>
    <title>New</title>
</svelte:head>

<form
        class="max-w-xl mx-auto mt-6"
        enctype="multipart/form-data"
        method="post"
        use:enhance
    >
    <p class="tracking-tight leading-none text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">New upload</p>

    <div class="mt-2">
        <Label for="default-input" class="block mb-2">Name & description</Label>
        <Input id="default-input" placeholder="Name" name="name" required/>
    </div>
    <Textarea {...textAreaProps} class="mt-2" name="description" required/>

    <div class="mt-2">
        <div class="flex flex-row justify-between">
            <Label for="countries">Tags</Label>
            <Helper class="text-sm">
                Suggestions? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Github</a>
            </Helper>
        </div>
        <MultiSelect items={tags} bind:value={selectedTags} name="tags" class="mt-2" required/>
    </div>

    <div class="mt-2">
        <Label class="py-2" for="file">Large file input</Label>
        <Fileupload id="file" name="file" size="lg" required/>
    </div>

    <div class="flex flex-row justify-end mt-4">
        <Button
                type="submit"
                formaction="?/create"
                >Submit
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
                <p>{ form?.errors.description }</p>
            </Toast>
        </div>
    {/if}
</form>
