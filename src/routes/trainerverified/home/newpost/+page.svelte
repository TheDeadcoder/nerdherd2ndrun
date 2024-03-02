<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { popup } from '@skeletonlabs/skeleton';

	import 'quill/dist/quill.snow.css';

	let quill;
	let editor;

	let title;
	let description;
	let content;
	let timetoread;
	let tags;

	export let data;
	let { session, supabase, teacherNow } = data;
	$: ({ session, supabase, teacherNow } = data);

	onMount(async () => {
		const Quill = await import('quill');
		quill = new Quill.default(editor, {
			theme: 'snow',
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block', 'link']
				]
			},
			placeholder: 'Body of the article goes here...'
		});
	});
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}
	function makeStrong() {
		content = quill.root.innerHTML;
		//console.log(content);
	}
</script>

<div class="min-h-screen mt-3 ml-16 mr-16">
	<h1 class="text-2xl font-extrabold">Creating a New Blog</h1>
	<form
		use:enhance
		action="?/create"
		method="POST"
		class="mt-6"
		on:submit={() => {
			onSubmit();
		}}
	>
		<label for="title" class="label text-left mb-1 flex flex-row">
			<span class="font-semibold">Blog Title</span>
		</label>
		<input
			class="input mb-3 rounded-lg border-[0.5px] focus:outline-[#8ad4ff] focus:border-0"
			type="text"
			id="title"
			name="title"
			bind:value={title}
			placeholder="Enter The Title of the Blog"
		/>
		<label for="description" class="label text-left mb-1">
			<span class="font-semibold">Blog Description</span>
		</label>
		<input
			class="input mb-3 rounded-lg border-[0.5px] focus:outline-[#8ad4ff] focus:border-0"
			type="text"
			id="description"
			name="description"
			bind:value={description}
			placeholder="Enter Brief Description"
		/>
		<label for="timetoread" class="label text-left mb-1">
			<span class="font-semibold">Time</span>
		</label>
		<input
			class="input mb-3 rounded-lg border-[0.5px] focus:outline-[#8ad4ff] focus:border-0"
			type="number"
			id="timetoread"
			name="timetoread"
			bind:value={timetoread}
			placeholder="Time required to read (minutes)"
		/>
		<label for="tags" class="label text-left mb-1">
			<span class="font-semibold">Tags</span>
		</label>
		<input
			class="input mb-3 rounded-lg border-[0.5px] focus:outline-[#8ad4ff] focus:border-0"
			type="text"
			id="tags"
			name="tags"
			bind:value={tags}
			placeholder="Tags (separate by comma)"
		/>
		<input hidden id="content" name="content" bind:value={content} />
		<div class="grid gap-2">
			<label for="content" class="font-semibold">Blog Content</label>
			<div bind:this={editor} id="editor" />
		</div>
		<button
			type="submit"
			class="mt-8 btn font-semibold text-xl p-3 bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg"
			disabled={isLoading}
			on:click={makeStrong}
		>
			{#if isLoading}
				<span class="loading loading-spinner loading-xs"></span>
			{/if}
			Submit
		</button>
	</form>
</div>
