<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import 'quill/dist/quill.snow.css';

	const { blogid } = $page.params;
	// import Message from './Message.svelte';
	export let data;

	let likeval = 0;
	let dislikeval = 0;
	let reacted = false;
	let reactionval = false;

	let { session, supabase, articleNow, teacherNow } = data;
	$: ({ session, supabase, articleNow, teacherNow } = data);
	let quill;
	let editor;

	let title = articleNow.title;
	let description = articleNow.description;
	let content = articleNow.content;
	let timetoread = articleNow.timetoread;
	let tags = articleNow.tags;

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
		quill.root.innerHTML = articleNow.content;
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

	const handleSignOut = async () => {
		await data.supabase.auth.signOut();

		window.open('/trainerlogin', '_self');
	};
</script>

<main class="bg-[#f4f6f7]">
	<nav class="appbar">
		<div class="logo-container flex items-center">
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
				class="transform transition duration-300 hover:rotate-12 w-[50px] mr-4"
				alt="title"
				width={50}
			/>
			<span class="company-name text-2xl font-extrabold">NerD</span><span
				class="company-name white-text text-2xl font-extrabold">Herd</span
			>
		</div>
		<ul class="links">
			<li>
				<a href="/trainerverified/home/recent" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Home</a
				>
			</li>
			<li>
				<a href="/trainerverified/library" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/book-opened-svgrepo-com%20(1).svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Library</a
				>
			</li>
			<li>
				<a href="/trainerverified/classes" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blackboard-class-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Class</a
				>
			</li>
			<li>
				<a href="/trainerverified/contest" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/championship-trophy-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Compete</a
				>
			</li>

			<li>
				<a href="/trainerverified/ai/gpt" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Chatbot</a
				>
			</li>

			<li>
				<a href="/trainerverified/planner" class="flex items-center p-1 font-bold mr-3"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/calendar-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Planner</a
				>
			</li>

			<!-- <LightSwitch class="mr-3" /> -->

			<li>
				<button on:click={handleSignOut}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-7 mr-1 hover:rotate-12"
					/>
				</button>
			</li>
		</ul>
	</nav>
	<div class="min-h-screen mt-3 ml-16 mr-16">
		<form action="?/deleteBlog" method="POST" class="mb-4">
			<button class="btn p-2 rounded-lg bg-red-300 hover:bg-red-500"> X Delete this Blog </button>
		</form>
		<h1 class="text-2xl font-extrabold">Editing your Blog</h1>
		<form
			use:enhance
			action="?/edit"
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
				placeholder={title}
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
				placeholder={description}
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
				placeholder={timetoread}
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
				placeholder={tags}
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
	<!-- <pre>{JSON.stringify(articleNow, null, 2)}</pre>
	<pre>{JSON.stringify(teacherNow, null, 2)}</pre>
	<pre>{JSON.stringify(commonuserNow, null, 2)}</pre> -->
</main>

<style>
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
	.appbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		border-bottom: 1px solid #ccc;
	}

	.links {
		display: flex;
		list-style: none;
		margin: 0;
	}

	.links li {
		margin-left: 2rem;
	}
	.links a {
		text-decoration: none;
		transition: color 0.2s ease-in-out;
	}

	.links a:hover {
		color: #007bff; /* Accent color from Skeleton UI */
	}
	.white-text {
		color: red;
	}
	.company-name {
		border: 1px solid black;
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 0.5rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
	.navbar {
		overflow: hidden;
		position: absolute; /* Set the navbar to fixed position */
		top: 0; /* Position the navbar at the top of the page */
		width: 100%; /* Full width */
		z-index: 5;
		background-color: rgb(188, 223, 253);
	}

	.logo-container {
		display: flex;
		align-items: center;
	}
	.chipi {
		background-color: #c1d4e3;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
</style>
