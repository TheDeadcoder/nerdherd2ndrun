<script lang="ts">
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let url;
	export let supabase: SupabaseClient;
	const dispatch = createEventDispatcher();

	let quill;
	let editor;
	let showEditor = true; // Reactive variable to control editor display
	let savedContent = ''; // Variable to store saved content

	function contentToBlob(content) {
		return new Blob([content], { type: 'text/html' });
	}

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

	async function savePost() {
		// savedContent = quill.root.innerHTML; // Save the content
		savedContent = quill.root.innerHTML;
		showEditor = false; // Hide the editor
		const currentTime = new Date().toISOString();
		const contentBlob = new Blob([savedContent], { type: 'text/html' });
		const filePath = `content_${currentTime}.html`;
		console.log('ami upload er age asi');
		console.log(supabase);
		const { error: err } = await supabase.storage
			.from('okk') // Replace with your actual storage name
			.upload(filePath, contentBlob, {
				cacheControl: '3600',
				upsert: false // Set to true if you want to overwrite existing files with the same name
			});

		if (err) {
			console.error('Error uploading file: ', err);
			// Handle the error appropriately
			return;
		}
		setTimeout(() => {
			dispatch('upload');
		}, 100);

		let { data: res2 } = await supabase.storage
			.from('okk')
			.getPublicUrl(`content_${currentTime}.html`);

		url = res2;

		// console.log(savedContent);
	}

	function editPost() {
		showEditor = true; // Show the editor for editing
	}
</script>

{#if showEditor}
	<div bind:this={editor} class="editor"></div>
	<button class="btn variant-filled-success text-xl font-semibold" on:click={savePost}
		>Save Post</button
	>
{:else}
	<div class="saved-content">{@html savedContent}</div>
{/if}

<style>
	.editor {
		height: 400px;
	}
	.saved-content {
		border: 1px solid #ccc;
		padding: 20px;
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.btn {
		margin-top: 20px;
	}
</style>
