<script lang="ts">
    import { currentUser, pb } from "$lib/stores/pocketbase";
    import Post from "../components/Post.svelte";
    import { Heading, P, Spinner } from "flowbite-svelte";
    import { searchQuery } from "$lib/stores/search";
    import { onMount, onDestroy } from "svelte";

    let debouncedTimeout: number;
    let posts = null;
    let loading = false;
    let unsubscribeSearchQuery: () => void;

    async function getPosts(query: string) {
        try {
            loading = true;

            if (query) {
                posts = await pb.collection('posts').getList(1, 50, {
                    filter: `(title?~"${query}" || description?~"${query}" || tags?~"${query}")`
                });
            } else {
                posts = await pb.collection('posts').getList();
            }
        } catch (error) {
            console.error('Search error:', error);
            posts = { items: [] };
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        unsubscribeSearchQuery = searchQuery.subscribe((query) => {
            if (debouncedTimeout) clearTimeout(debouncedTimeout);

            debouncedTimeout = setTimeout(() => {
                getPosts(query);
            }, 500);
        });

        if (!searchQuery) {
            getPosts('');
        }
    });

    onDestroy(() => {
        if (debouncedTimeout) clearTimeout(debouncedTimeout);
        if (unsubscribeSearchQuery) unsubscribeSearchQuery();
    });
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main class="flex justify-center flex-col max-w-5xl mx-auto mt-4">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 m-2 gap-6">
        {#if loading}
            <!-- Show spinner while loading -->
            <div class="flex justify-center items-center col-span-full">
                <Spinner size="w-10 h-10 m-10 ease-in" />
            </div>
        {:else if posts && posts.items.length > 0}
            <!-- Show posts if results are found -->
            {#each posts.items as post}
                <Post {post} />
            {/each}
        {:else}
            <!-- Show no results message if posts are empty -->
            <div class="flex flex-col">
                <Heading tag="h2" customSize="text-4xl font-extrabold">
                    No results <span class="text-orange-500">:(</span>
                </Heading>
                <P class="my-4 text-gray-500">Try searching for keywords in the title, description, or tags.</P>
            </div>
        {/if}
    </ul>
</main>
