<script lang="ts">
  import { pushState } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { createEventDispatcher } from "svelte";
  import { determineFileType } from "$lib/utils/fileUtils";
  import { env } from "$env/dynamic/public";
  import { searchQuery } from "$lib/stores/search";

  import {
    ArrowRightOutline,
    ImageOutline,
    FileOutline,
    FileVideoOutline,
    FileMusicOutline,
    FileCodeOutline,
    ChevronDownOutline,
    ArchiveOutline,
  } from "flowbite-svelte-icons";
  import { Badge, Card, Button } from "flowbite-svelte";
  import PostDetails from "./PostDetails.svelte";

  interface Post {
    id: string;
    title: string;
    file: string;
    tags: string[];
    updated: string;
    collectionId: string;
  }

  export let post: Post;
  let isModalOpen = false;
  let fileType = "";
  let fileContent = "";
  let fileUrl = post.file;
  let displayTag: string;

  const dispatch = createEventDispatcher<{
    delete: undefined;
  }>();

  $: query = $searchQuery?.toUpperCase() ?? "";
  $: matchingTags = query
    ? post.tags.filter((tag) => tag.toUpperCase().includes(query))
    : [];

  onMount(() => {
    const currentPostId = $page.url.searchParams.get("id");

    if (currentPostId === post.id) {
      open();
    }
  });

  function open() {
    pushState(`?id=${post.id}`, {});
    isModalOpen = true;
  }

  function handleRemove(event: CustomEvent) {
    dispatch("delete", event.detail);
  }

  $: {
    determineFileType(post.file, fileUrl).then((result) => {
      fileType = result.fileType;
      if (result.fileContent) fileContent = result.fileContent;
    });
  }
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
      {:else if fileType === "zip"}
        <ArchiveOutline class="w-16 h-32 text-yellow-500 mx-auto" />
      {:else}
        <FileOutline class="w-16 h-32 text-gray-500 mx-auto" />
      {/if}
      <div class="flex flex-row justify-between items-center">
        <h5
          class="my-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
        >
          {#if query}
            {@html post.title
              .split(" ")
              .map((word) =>
                word.toUpperCase().includes(query)
                  ? `<span class="text-purple-500">${word}</span>`
                  : word
              )
              .join(" ")}
          {:else}
            {post.title}
          {/if}
        </h5>
      </div>
      <div class="mb-1 flex flex-row justify-between">
        <p class="text-sm text-gray-500">
          Last Updated: {new Date(post.updated).toLocaleDateString()}
        </p>
      </div>
    </div>
  </button>
  <div class="flex flex-wrap gap-2 mt-auto items-center">
    <Badge>{(post.file.split(".").pop() ?? "").toUpperCase()}</Badge>
    {#if query && matchingTags.length > 0}
      {#each matchingTags as tag}
        <Badge color="purple">
          <span>{tag.toUpperCase()}</span>
        </Badge>
      {/each}
    {/if}
    {#if post.tags.length > matchingTags.length}
      <Badge>+ {post.tags.length - matchingTags.length}</Badge>
    {/if}
  </div>
</Card>

<PostDetails {post} bind:isOpen={isModalOpen} on:delete={handleRemove} />
