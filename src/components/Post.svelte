<script lang="ts">
  import { pushState } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { createEventDispatcher } from "svelte";

  import { ArrowRightOutline } from "flowbite-svelte-icons";
  import { Badge, Card } from "flowbite-svelte";
  import PostDetails from "./PostDetails.svelte";

  let { post } = $props();
  let isModalOpen = $state(false);
  let dispatch = createEventDispatcher();

  onMount(() => {
    const currentPostId = page.url.searchParams.get("id");

    if (currentPostId === post.id) {
      open();
    }
  });

  function open() {
    pushState(`?id=${post.id}`, {});
    isModalOpen = true;
  }

  function handleRemove(event: CustomEvent) {
    dispatch("delete", event.detail); // Forward event to parent
  }
</script>

<Card>
  <div class="flex flex-row">
    <div class="w-4/5">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {post.title}
      </h5>
      <p
        class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight"
      >
        {post.description}
      </p>
      {#if post.tags}
        <div class="flex flex-wrap gap-2">
          {#each post.tags as tag}
            <Badge>{tag}</Badge>
          {/each}
        </div>
      {/if}
    </div>
    <div class="w-1/5">
      <button onclick={open}>
        <ArrowRightOutline class="w-8 h-8 mt-1 text-orange-500" />
      </button>
    </div>
  </div>
</Card>

<PostDetails {post} bind:isOpen={isModalOpen} on:delete={handleRemove} />
