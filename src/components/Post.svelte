<script>
import {ArrowRightOutline} from "flowbite-svelte-icons";
import {Badge, Card} from "flowbite-svelte";

let { post } = $props();

</script>

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
                <ArrowRightOutline class="w-8 h-8 mt-1 text-orange-500"/>
            </a>
        </div>
    </div>
</Card>