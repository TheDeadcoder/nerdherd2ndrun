<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data;

	let { session, supabase, classNow, teacherNow, notes } = data;
	$: ({ session, supabase, classNow, teacherNow, notes } = data);

	import { isRunningClass } from '../../../../../stores/isRunningClass';
	const { classid } = $page.params;

	const images = {
		text: 'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/txt-svgrepo-com.svg',
		javascript:
			'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/javascript-svgrepo-com.svg',
		typescript:
			'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/typescript-logo-svgrepo-com.svg',
		html: 'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/html-5-svgrepo-com.svg',
		css: 'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/css-3-svgrepo-com.svg'
	};
	function getImage(variant) {
		return images[variant];
	}

	let title;
	let lang;
	let showaddmodal = false;
	function addclassmodal() {
		showaddmodal = true;
		console.log('click new class');
	}
	const hasAccess = (note) => {
		const access = note.access || []; // Assume an empty array if no access is specified
		return access.includes(teacherNow.id);
	};

	function closeclassmodal() {
		showaddmodal = false;
	}

	function goEditNote(val) {
		window.open(`/trainerverified/runningclass/${classNow.id}/notespec/${val}/modify`, '_self');
	}

	function goViewNote(val) {
		window.open(`/trainerverified/runningclass/${classNow.id}/notespec/${val}/view`, '_self');
	}

	onMount(() => {
		isRunningClass.set({ classid: classid, isClass: true });
	});
	onDestroy(() => {
		isRunningClass.set({ classid: '', isClass: false });
	});
</script>

<main>
	<nav class="appbar">
		<div class="logo-container">
			<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
		</div>
	</nav>
	<div class="ml-6 mt-6 mr-6">
		<button
			class="btn p-2 bg-green-300 hover:bg-green-400 rounded-lg mb-6"
			on:click={addclassmodal}
		>
			+ Add a New Notebook
		</button>
		<h1 class="font-extrabold text-xl">All Notes</h1>
	</div>
	<div class="grid grid-cols-4 gap-12 mt-4 ml-4">
		{#each notes as note}
			<div class="card rounded-lg shadow-lg hover:shadow-2xl p-4">
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/nredherd%20editor.png"
					alt="Dashboard Icon"
					class="w-full mr-3"
				/>
				<h1 class="font-mono font-bold text-xl mb-3">
					Name: {note.title}
				</h1>
				{#if note.userNow.bio}
					<a href="/viewonly/teacher/{note.userNow.id}" class="flex flex-row space-x-2">
						<img
							src={note.userNow.image}
							alt="Dashboard Icon"
							class="h-7 hover:rotate-12 rounded-full"
						/>
						<h1 class="font-semibold">
							{note.userNow.name}
						</h1>
					</a>
				{:else}
					<a href="/viewonly/student/{note.userNow.id}" class="flex flex-row space-x-2">
						<img
							src={note.userNow.image}
							alt="Dashboard Icon"
							class="h-7 hover:rotate-12 rounded-full"
						/>
						<h1 class="font-semibold">
							{note.userNow.name}
						</h1>
					</a>
				{/if}
				<div class="flex flex-row justify-between mt-3">
					<img src={getImage(note.lang)} alt="Dashboard Icon" class="h-12 hover:rotate-12" />
					{#if hasAccess(note)}
						<button
							class="btn p-2 bg-cyan-300 hover:bg-cyan-500 rounded-lg"
							on:click={() => goEditNote(note.id)}
							>Edit Note
						</button>
					{:else if note.owner === teacherNow.id}
						<button
							class="btn p-2 bg-cyan-300 hover:bg-cyan-500 rounded-lg"
							on:click={() => goEditNote(note.id)}
							>Edit Note
						</button>
					{:else}
						<button
							class="btn p-2 bg-cyan-300 hover:bg-cyan-500 rounded-lg"
							on:click={() => goViewNote(note.id)}
						>
							View Only
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	{#if showaddmodal}
		<div
			class="fixed inset-0 bg-sky-200 bg-opacity-50 flex justify-center items-center z-50 transition-opacity dark:text-[#e1e1e1]"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4 dark:bg-[#212020]">
				<div class="flex justify-between items-center mb-3">
					<h2 class="text-2xl font-bold">Add a new Notebook</h2>
					<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/upload"
					method="POST"
					on:submit={() => {
						closeclassmodal();
					}}
				>
					<div>
						<label class="label text-left mb-2">
							<span>NoteBook Title</span>

							<input
								class="input dark:placeholder:text-[#ffffff9e]"
								type="text"
								id="title"
								name="title"
								bind:value={title}
								placeholder="Enter The name of the Note book"
							/>
						</label>
						<label class="label text-left">
							<span class="font-semibold">Language*</span>
							<div class="flex flex-col space-y-3">
								<label class="label flex flex-row space-x-2 items-center">
									<input
										class="radio"
										type="radio"
										checked
										name="lang"
										value="text"
										id="text"
										bind:group={lang}
									/>

									<img
										src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/txt-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-3 hover:rotate-12"
									/>
									<h1 class="font-semibold">Text</h1>
								</label>
								<label class="label flex flex-row space-x-2 items-center">
									<input
										class="radio"
										type="radio"
										checked
										name="lang"
										value="javascript"
										id="javascript"
										bind:group={lang}
									/>

									<img
										src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/javascript-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-3 hover:rotate-12"
									/>
									<h1 class="font-semibold">javascript</h1>
								</label>
								<label class="label flex flex-row space-x-2 items-center">
									<input
										class="radio"
										type="radio"
										checked
										name="lang"
										value="typescript"
										id="typescript"
										bind:group={lang}
									/>

									<img
										src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/typescript-logo-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-3 hover:rotate-12"
									/>
									<h1 class="font-semibold">typescript</h1>
								</label>
								<label class="label flex flex-row space-x-2 items-center">
									<input
										class="radio"
										type="radio"
										checked
										name="lang"
										value="html"
										id="html"
										bind:group={lang}
									/>

									<img
										src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/html-5-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-3 hover:rotate-12"
									/>
									<h1 class="font-semibold">html</h1>
								</label>
								<label class="label flex flex-row space-x-2 items-center">
									<input
										class="radio"
										type="radio"
										checked
										name="lang"
										value="css"
										id="css"
										bind:group={lang}
									/>

									<img
										src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/css-3-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-3 hover:rotate-12"
									/>
									<h1 class="font-semibold">css</h1>
								</label>
							</div>
						</label>
						<!-- <label class="label text-left mb-2">
							<span>Language</span>
							<select bind:value={lang} class="select" id="lang" name="lang">
								<option value="text">
									<div class="flex flex-row space-x-1">
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/txt-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-6 mr-3 hover:rotate-12"
										/>
										<h1 class="font-semibold">Text</h1>
									</div>
								</option>
								<option value="javascript">
									<div class="flex flex-row space-x-1">
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/javascript-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-6 mr-3 hover:rotate-12"
										/>
										<h1 class="font-semibold">javascript</h1>
									</div>
								</option>
								<option value="typescript">
									<div class="flex flex-row space-x-1">
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/typescript-logo-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-6 mr-3 hover:rotate-12"
										/>
										<h1 class="font-semibold">typescript</h1>
									</div>
								</option>
								<option value="html">
									<div class="flex flex-row space-x-1">
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/html-5-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-6 mr-3 hover:rotate-12"
										/>
										<h1 class="font-semibold">html</h1>
									</div>
								</option>
								<option value="css">
									<div class="flex flex-row space-x-1">
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/css-3-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-6 mr-3 hover:rotate-12"
										/>
										<h1 class="font-semibold">css</h1>
									</div>
								</option>
							</select>
						</label> -->

						<button
							type="submit"
							class="btn mt-3 text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</main>

<style>
	.appbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		border-bottom: 1px solid #ccc;
	}

	.logo-container {
		display: flex;
		align-items: center;
	}

	.logo-container img {
		width: 50px;
		margin-right: 1rem;
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
	.sidebar-item {
		display: block;
		padding: 0.75rem 1rem;

		text-decoration: none;
		transition:
			background-color 0.2s,
			color 0.2s;
		border-radius: 0.375rem; /* Tailwind's rounded-md */
	}
	.sidebar-item.active,
	.sidebar-item:hover {
		background-color: #ebebeb; /* Tailwind's gray-100 */
	}

	.sidebar-item:active {
		background-color: #e5e7eb; /* Tailwind's gray-200 */
	}

	@media (prefers-color-scheme: dark) {
		.sidebar-item {
			color: #d1d5db; /* Tailwind's gray-300 */
		}

		.sidebar-item:hover {
			background-color: #374151; /* Tailwind's gray-700 */
			color: #ffffff; /* White text for better contrast */
		}

		.sidebar-item:active {
			background-color: #4b5563; /* Tailwind's gray-600 */
		}
	}
</style>
