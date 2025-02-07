<script>
    import {Heading, P} from "flowbite-svelte";
    import {goto} from "$app/navigation";
</script>

<div class="flex justify-center flex-col max-w-5xl mx-auto mt-4">
    <Heading tag="h2" customSize="text-4xl font-extrabold">
        This page doesn't exist <span class="text-orange-500">:(</span>
    </Heading>
    <P class="my-4 text-gray-500">Wanna go back to the
        <button class="text-gray-900 dark:text-white" onclick={() => goto("/")}><span
                class="underline text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700 dark:text-white">dashboard?</span>
        </button>
    </P>
</div>