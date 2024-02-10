<script lang="ts">
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import {createEventDispatcher} from 'svelte'

	export let url;
	export let supabase: SupabaseClient;

	let quill;
	let editor;
	let content;
	let showEditor = true; // Reactive variable to control editor display
	let savedContent = ''; // Variable to store saved content

	const dispatch = createEventDispatcher();

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
		const { data: dtt, error: err } = await supabase.storage
			.from('finl') // Replace with your actual storage name
			.upload(filePath, contentBlob, {
				cacheControl: '3600',
				upsert: false // Set to true if you want to overwrite existing files with the same name
			});

		if (err) {
			console.error('Error uploading file: ', err);
			// Handle the error appropriately
			return;
		}

		let { data: res2 } = await supabase.storage
			.from('finl')
			.getPublicUrl(`content_${currentTime}.html`);

		url = res2.publicUrl;
		console.log(url);
		console.log('Upload done');

		dispatch('editBtnOpen',showEditor)
	}

	function editPost() {
		showEditor = true; // Show the editor for editing
		dispatch('editBtnOpen',showEditor)

	}
</script>

{#if showEditor}
	<div bind:this={editor} class="editor"></div>
	<input type="hidden" name="content" value={url} />
	<button type="submit" class="font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/4 text-center" on:click={savePost}
		>Done with Editing</button
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
