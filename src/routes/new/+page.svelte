<script lang="ts">
    import {Label, Input, Textarea, MultiSelect, Helper, Fileupload} from 'flowbite-svelte';
    import {Tags} from "$lib/enums/tags";

    import type {PageData} from "./$types"
    let data: { data: PageData } = $props();

    console.log(data)

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

    console.log(tags);
</script>

<svelte:head>
    <title>New</title>
</svelte:head>

<form class="max-w-xl mx-auto mt-6">
    <p class="tracking-tight leading-none text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">New upload</p>
    <div class="mt-2">
        <Label for="default-input" class="block mb-2">Name & description</Label>
        <Input id="default-input" placeholder="Name" />
    </div>
    <Textarea {...textAreaProps} class="mt-2"/>

    <div class="mt-2">
        <div class="flex flex-row justify-between">
            <Label for="countries">Tags</Label>
            <Helper class="text-sm">
                Suggestions? <a class="font-medium text-primary-600 hover:underline dark:text-primary-500">Github</a>
            </Helper>
        </div>
        <MultiSelect items={tags} bind:value={selectedTags} class="mt-2"/>
    </div>

    <div class="mt-2">
        <Label class="py-2" for="larg_size">Large file input</Label>
        <Fileupload id="large_size" size="lg" />
    </div>
</form>
