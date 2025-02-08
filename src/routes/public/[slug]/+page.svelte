<script lang="ts">
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {Badge, Button, Card, Spinner} from "flowbite-svelte";
    import {goto} from "$app/navigation";
    import {DownloadOutline, LinkOutline, PenNibOutline, TrashBinOutline, UserAddOutline} from "flowbite-svelte-icons";
    import {env} from "$env/dynamic/public";
    import {pb} from "$lib/stores/pocketbase";
    import NotFound from "../../../components/NotFound.svelte";

    let {
        post,
        publicLink,
        slug = $page.params.slug,
        fileUrl
    } = $props();
    let error = $state('');
    let loading = $state(false)

    onMount(() => {
        loading = true;

        get();
    });

    async function get() {
        // Fetch publicLink record
        try {
            publicLink = await pb.collection('publicLinks').getFirstListItem(`slug="${slug}"`);
        } catch (err: any) {
            error = err?.message || "An unexpected error occurred. Please check the console and report.";
        }

        // Fetch actual post
        try {
            post = await pb.collection('posts').getOne(publicLink.post_id)

            fileUrl = `${env.PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.file}`
        } catch (err: any) {
            error = err?.message || "An unexpected error occurred. Please check the console and report.";
        }

        loading = false;
    }

    function download() {
        window.open(fileUrl, '_blank');
    }
</script>

<main class="max-w-xl mx-auto mt-6">
    {#if loading}
        <div class="flex justify-center items-center col-span-full">
            <Spinner size="w-10 h-10 m-10 ease-in"/>
        </div>
    {:else if post}
        <Card class="" size="lg" padding="xl">
            <div class="flex justify-between items-center">
                <div>
                    <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{post.title}</h5>
                    <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{post.description}</p>
                </div>
                <div class="text-sm text-gray-500 text-right">
                    <p>Created: {new Date(post.created).toLocaleDateString()}</p>
                    <p>Updated: {new Date(post.updated).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="justify-between items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">

                <div class="flex flex-wrap gap-2">
                    {#each post.tags as tag}
                        <Badge>{tag}</Badge>
                    {/each}
                </div>

                <Button class="ml-4" on:click={download}>
                    <DownloadOutline class="w-6 h-6"/>
                </Button>
            </div>
        </Card>
    {:else}
        <NotFound/>
    {/if}
</main>

