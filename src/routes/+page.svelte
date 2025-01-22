<script lang="ts">

    import {pb} from "$lib/pocketbase";
    import {Badge, Card} from "flowbite-svelte";
    import {ArrowRightOutline} from "flowbite-svelte-icons";

    'flowbite-svelte-icons'
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main class="flex justify-center flex-col max-w-5xl mx-auto mt-4">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 m-2 gap-6">
        {#await pb.collection('posts').getList() then posts}
            {#each posts.items as post}
                <Card>
                    <div class="flex flex-row">
                        <div class="w-4/5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{post.description}</p>
                            {#if post.tags}
                                <div class="flex flex-wrap gap-2">
                                    {#each post.tags as tag}
                                        <Badge>{tag}</Badge>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                        <div class="w-1/5">
                            <a href="/">
                                <ArrowRightOutline class="w-10 h-10 ms-2 text-orange-500"/>
                            </a>
                        </div>
                    </div>
                </Card>
            {/each}
        {/await}
    </ul>
</main>

