<script lang="ts">
	// @ts-nocheck

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, Table } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import 'quill/dist/quill.snow.css';

	let quill;
	let editor;

	let title;
	let description;
	let content;
	let timetoread;
	let tags;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	export let data;
	let { session, supabase, teacherNow } = data;
	$: ({ session, supabase, teacherNow } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};
	function navigateToHome() {
		window.open(`/protected/home`, '_self');
	}
	function navigateToCommunity() {
		window.open(`/protected/community`, '_self');
	}
	function navigateToLearning() {
		window.open(`/protected/learning`, '_self');
	}
	function navigateToProjects() {
		window.open(`/protected/projects`, '_self');
	}
	function navigateToProfile() {
		window.open(`/protected/profile`, '_self');
	}
	function openAddForm() {
		window.open(`/protected/community/newpost`, '_self');
	}
	function formatDate(dateString) {
		const dateObj = new Date(dateString);
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
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
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}
	function makeStrong() {
		content = quill.root.innerHTML;
		console.log(content);
	}
</script>

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
			<a href="/library" class="flex items-center p-1 font-bold"
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
		<div use:popup={popupClick}>
			<Avatar src={teacherNow.image} width="w-10" rounded="rounded-full" />
		</div>

		<div data-popup="popupClick" class="h-32 absolute">
			<ul class="text-lg font-semibold bg-sky-300 ml-0">
				<li class="mt-2 mb-3 p-2">
					<a href="/trainerverified/profile" class="flex items-center font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/user-person-profile-block-account-circle-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-7 mr-1 hover:rotate-12"
						/>
						Profile</a
					>
				</li>
			</ul>
		</div>
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
<div class="min-h-screen mt-32 ml-16 mr-16">
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
			<span>Blog Title</span>
		</label>
		<input
			class="input mb-3"
			type="text"
			id="title"
			name="title"
			bind:value={title}
			placeholder="Enter The Title of the Blog"
		/>
		<label for="description" class="label text-left mb-1">
			<span>Blog Description</span>
		</label>
		<input
			class="input mb-3"
			type="text"
			id="description"
			name="description"
			bind:value={description}
			placeholder="Enter Brief Description"
		/>
		<label for="timetoread" class="label text-left mb-1">
			<span>Time</span>
		</label>
		<input
			class="input mb-3"
			type="number"
			id="timetoread"
			name="timetoread"
			bind:value={timetoread}
			placeholder="Minutes required to read"
		/>
		<label for="tags" class="label text-left mb-1">
			<span>Tags</span>
		</label>
		<input
			class="input mb-3"
			type="text"
			id="tags"
			name="tags"
			bind:value={tags}
			placeholder="Tags (separate by comma)"
		/>
		<input hidden id="content" name="content" bind:value={content} />
		<div class="grid gap-2">
			<label for="content">Blog Content</label>
			<div bind:this={editor} id="editor" />
		</div>
		<button
			type="submit"
			class="btn btn-accent mt-8 w-full"
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
</style>
