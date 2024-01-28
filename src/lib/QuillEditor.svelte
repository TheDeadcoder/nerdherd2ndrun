<!-- <script>
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';

	let quill;
	let editor;

	onMount(async () => {
		const Quill = await import('quill');
		quill = new Quill.default(editor, {
			theme: 'snow', // You can choose 'bubble' for a different style
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block']
				]
			},
			placeholder: 'Compose an epic...'
		});
	});

	async function savePost() {
		const contentHTML = quill.root.innerHTML;
		// or for Delta format: const contentDelta = quill.getContents();

		// TODO: Send contentHTML or contentDelta to your backend service
		console.log(contentHTML); // For testing purposes
		// You can use fetch() to send data to your backend
	}
</script>

<div bind:this={editor} class="editor"></div>
<button class="btn fill-green-300" on:click={savePost}>Save Post</button>

<style>
	.editor {
		height: 400px;
	}
</style> -->
<script>
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';

	let quill;
	let editor;
	let showEditor = true; // Reactive variable to control editor display
	let savedContent = ''; // Variable to store saved content

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
			placeholder: 'Compose an epic...'
		});
	});

	async function savePost() {
		savedContent = quill.root.innerHTML; // Save the content
		showEditor = false; // Hide the editor
		// TODO: Send savedContent to your backend service
		console.log(savedContent); // For testing purposes
		// You can use fetch() to send data to your backend
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
	.fill-green-300 {
		/* Your styles for save button */
	}
	.fill-blue-300 {
		/* Your styles for edit button */
	}
</style>
