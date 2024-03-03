<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import { enhance } from '$app/forms';
	import BookCategory from '../../../lib/Book_category.svelte';
	import OverlayPdf from '$lib/OverlayPdf.svelte';
	import { isOverlayPdf } from '../../../stores/OverlayPdf';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, Table } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	export let data;
	let title;
	let author;
	let edition;
	let content;
	let tags;
	let coverimg;
	let price;
	let showaddmodal = false;

	function addclassmodal() {
		console.log(showaddmodal);
		showaddmodal = true;
	}

	function closeclassmodal() {
		showaddmodal = false;
	}

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
		showaddmodal = false;
	}

	let { session, supabase, tagsToBooksMap, teacherNow } = data;
	$: ({ session, supabase, tagsToBooksMap, teacherNow } = data);

	// let categoryName = ['Children Book', 'Science', 'Art', 'Finance'];
	let url = '';

	$: console.log(url);

	const handleSignOut = async () => {
		//	await data.supabase.auth.signOut();
		window.open('/accessType', '_self');
	};
</script>

<main class="dark:bg-[#212020] min-h-screen dark:text-[#f3f2f2] ">
	<div>
		<button
			class="btn bg-green-400 rounded-lg text-2xl font-semibold mt-10 ml-6 dark:text-[#e1e1e1] dark:bg-[#3b6f8e]"
			on:click={addclassmodal}
		>
			+ Add book
		</button>
	</div>
	<div class="ml-8 mt-16 blur-xl={isLoading}">
		{#if isLoading}
			<div class="items-center justify-center">
				<div aria-label="Loading..." role="status" class="flex items-center space-x-2">
					<svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
						<line
							x1="128"
							y1="32"
							x2="128"
							y2="64"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						></line>
						<line
							x1="195.9"
							y1="60.1"
							x2="173.3"
							y2="82.7"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						></line>
						<line
							x1="224"
							y1="128"
							x2="192"
							y2="128"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						>
						</line>
						<line
							x1="195.9"
							y1="195.9"
							x2="173.3"
							y2="173.3"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						></line>
						<line
							x1="128"
							y1="224"
							x2="128"
							y2="192"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						>
						</line>
						<line
							x1="60.1"
							y1="195.9"
							x2="82.7"
							y2="173.3"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						></line>
						<line
							x1="32"
							y1="128"
							x2="64"
							y2="128"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						></line>
						<line
							x1="60.1"
							y1="60.1"
							x2="82.7"
							y2="82.7"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="24"
						>
						</line>
					</svg>
					<span class="text-4xl font-medium text-gray-500">Uploading...</span>
				</div>
			</div>
		{:else}
			<div class="mt-2">
				{#each Object.entries(tagsToBooksMap) as [tag, books]}
					<BookCategory categoryName={tag} {books} bind:url></BookCategory>
				{/each}
			</div>
		{/if}
	</div>
	{#if showaddmodal}
		<div
			class="fixed inset-0 bg-sky-200 bg-opacity-50 flex justify-center items-center z-50 transition-opacity dark:text-[#e1e1e1] dark:bg-[#07070763]"
		>
        <div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4 max-h-screen overflow-y-auto dark:text-[#e1e1e1] dark:bg-[#070707]">
			<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Resource</h2>
					<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/upload"
					method="POST"
					on:submit={() => {
						onSubmit();
					}}
					enctype="multipart/form-data"
				>
					<div class="space-y-3">
						<label class="label text-left mb-2">
							<span>Resource Title</span>

							<input
								class="input border-[.5px]"
								type="text"
								id="title"
								name="title"
								bind:value={title}
								disabled={isLoading}
								placeholder="Enter The Title of the Resource"
							/>
						</label>
						<label class="label text-left mb-2">
							<span>Resource authors</span>
							<input
								class="input border-[.5px]"
								type="text"
								placeholder="Who are the authors... (separate by comma)"
								id="author"
								name="author"
								bind:value={author}
								disabled={isLoading}
							/>
							<!-- <div class="mt-2 flex flex-wrap">
								{#each author as value, i}
									<div
										class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
									>
										{value}
										<button class="ml-2 text-red-500" on:click={() => removeValue(i, 'author')}
											>x</button
										>
									</div>
								{/each}
							</div> -->
						</label>
						<label class="label text-left mb-2">
							<span>Resource Edition</span>

							<input
								class="input border-[.5px]"
								type="number"
								id="edition"
								name="edition"
								bind:value={edition}
								disabled={isLoading}
								placeholder="What is the Edition"
							/>
						</label>
						<label class="label text-left mb-2">
							<span>Market Price</span>

							<input
								class="input border-[.5px]"
								type="number"
								id="price"
								name="price"
								bind:value={price}
								disabled={isLoading}
								placeholder="What is the Price of the book"
							/>
						</label>
						<label class="label text-left mb-2">
							<span>Resource Tags</span>
							<input
								class="input border-[.5px]"
								type="text"
								placeholder="What are the tags...(separate by comma)"
								id="tags"
								name="tags"
								disabled={isLoading}
								bind:value={tags}
							/>
							<!-- <div class="mt-2 flex flex-wrap">
								{#each tags as value, i}
									<div
										class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
									>
										{value}
										<button class="ml-2 text-red-500" on:click={() => removeValue1(i, 'tags')}
											>x</button
										>
									</div>
								{/each}
							</div> -->
						</label>

						<label class="label text-left mb-2">
							<span>Resource Content</span>

							<input
								class="input border-[.5px]"
								type="file"
								id="content"
								name="content"
								disabled={isLoading}
								bind:value={content}
							/>
						</label>
						

						<label class="label text-left mb-2">
							<span>Cover Photo (optional)</span>

							<input
								class="input border-[.5px]"
								type="file"
								id="coverimg"
								name="coverimg"
								disabled={isLoading}
								bind:value={coverimg}
							/>
						</label>
						<button
							type="submit"
							class="btn variant-filled-primary text-xl font-semibold"
							disabled={isLoading}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	{#if $isOverlayPdf}
		<OverlayPdf {url} />
	{/if}
	<!-- <pre>{JSON.stringify(tagsToBooksMap, null, 2)}</pre> -->
	<Footer />
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

	.anim-progress-bar {
		transform-origin: 0% 50%;
		animation: anim-progress-bar 2s infinite linear;
	}
	@keyframes anim-progress-bar {
		0% {
			transform: translateX(50%) scaleX(0.5);
		}
		50% {
			transform: translateX(0) scaleX(0.5);
		}
		100% {
			transform: translateX(50%) scaleX(0.5);
		}
	}
</style>
