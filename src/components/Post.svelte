<script lang="ts">
  import { pushState } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { createEventDispatcher } from "svelte";
  import { determineFileType } from "$lib/utils/fileUtils";
  import { env } from "$env/dynamic/public";

  import {
    ArrowRightOutline,
    ImageOutline,
    FileOutline,
    FileVideoOutline,
    FileMusicOutline,
    FileCodeOutline,
  } from "flowbite-svelte-icons";
  import { Badge, Card } from "flowbite-svelte";
  import PostDetails from "./PostDetails.svelte";

  let { post } = $props();
  let isModalOpen = $state(false);
  let fileType = $state("");
  let fileContent = $state("");
  let fileUrl = post.file; // Assuming post.file contains the URL
  let dispatch = createEventDispatcher<{
    delete: undefined;
  }>();

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

  $effect(() => {
    determineFileType(post.file, fileUrl).then((result) => {
      fileType = result.fileType;
      if (result.fileContent) fileContent = result.fileContent;
    });
  });
</script>

<Card padding="md">
  <button type="button" onclick={open} class="w-full text-left">
    <div class="flex flex-col">
      {#if fileType === "image"}
        <img
          src={`${env.PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.file}`}
          alt="Post thumbnail"
          class="object-cover w-auto h-32 mx-auto hover:h-48 transition-all duration-300 cursor-pointer"
        />
      {:else if fileType === "pdf"}
        <FileOutline class="w-16 h-32 text-red-500 mx-auto" />
      {:else if fileType === "video"}
        <FileVideoOutline class="w-16 h-32 text-purple-500 mx-auto" />
      {:else if fileType === "audio"}
        <FileMusicOutline class="w-16 h-32 text-green-500 mx-auto" />
      {:else if fileType === "text"}
        <FileCodeOutline class="w-16 h-32 text-gray-500 mx-auto " />
      {:else}
        <FileOutline class="w-16 h-32 text-gray-500 mx-auto" />
      {/if}
      <div class="flex flex-row justify-between items-center">
        <h5
          class="my-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
        >
          span{post.title}
        </h5>
      </div>
      <div class="mb-1 flex flex-row justify-between">
        <p class="text-sm text-gray-500">
          Last Updated: {new Date(post.updated).toLocaleDateString()}
        </p>
      </div>
    </div>
  </button>
  <div class="flex flex-wrap gap-2 mt-auto">
    {#each post.tags as tag}
      <Badge>{tag.toUpperCase()}</Badge>
    {/each}
  </div>
</Card>
<!-- <Card>
  <div class="flex flex-row">
    <div class="w-4/5">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
      >
        {post.title}
      </h5>
      <p
        class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight line-clamp-8"
      >
        {post.description}
      </p>
      <p class="text-sm text-gray-500">
        {new Date(post.updated).toLocaleDateString()}
      </p>
    </div>
    <div class="w-1/5">
      <button onclick={open}>
        <ArrowRightOutline class="w-8 h-8 mt-1 text-orange-500" />
      </button>
    </div>
  </div>
  <div class="flex flex-wrap gap-2 mt-auto">
    {#each post.tags as tag}
      <Badge>{tag}</Badge>
    {/each}
  </div>
</Card> -->

<PostDetails {post} bind:isOpen={isModalOpen} on:delete={handleRemove} />
