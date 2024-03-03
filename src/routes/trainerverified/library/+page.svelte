<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import { enhance } from '$app/forms';
	import BookCategory from '../../../lib/Book_category.svelte';
	import OverlayPdf from '$lib/OverlayPdf.svelte';
	import { isOverlayPdf } from '../../../stores/OverlayPdf';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, Table } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';

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
	let showaddmodal = false;
//online
	let price;

	function addclassmodal() {
		console.log(showaddmodal);
		showaddmodal = true;
	}

	function closeclassmodal() {
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

<main  class="dark:bg-[#212020] min-h-screen dark:text-[#f3f2f2]">
	
	<div>
		<button class="btn dark:text-[#e1e1e1] dark:bg-[#3b6f8e] text-xl font-semibold m-10" on:click={addclassmodal}>
			Add book
		</button>
	</div>
	<div class="ml-8 mt-2">
		<div class="mt-2">
			{#each Object.entries(tagsToBooksMap) as [tag, books]}
				<BookCategory categoryName={tag} {books} bind:url></BookCategory>
			{/each}
		</div>
	</div>
	{#if showaddmodal}
		<div
			class="fixed inset-0 bg-sky-200 bg-opacity-50 flex justify-center items-center z-50 transition-opacity dark:text-[#e1e1e1] dark:bg-[#07070763]"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4 dark:text-[#e1e1e1] dark:bg-[#070707]">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Resource</h2>
					<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/upload"
					method="POST"
					on:submit={closeclassmodal}
					enctype="multipart/form-data"
				>
					<div class="space-y-6">
						<label class="label text-left mb-3">
							<span>Resource Title</span>

							<input
								class="input border-[.5px]"
								type="text"
								id="title"
								name="title"
								bind:value={title}
								placeholder="Enter The Title of the Resource"
							/>
						</label>
						<label class="label text-left">
							<span>Resource authors</span>
							<input
								class="input border-[.5px]"
								type="text"
								placeholder="Who are the authors... (separate by comma)"
								id="author"
								name="author"
								bind:value={author}
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
						<label class="label text-left mb-3">
							<span>Resource Edition</span>

							<input
								class="input border-[.5px]"
								type="number"
								id="edition"
								name="edition"
								bind:value={edition}
								placeholder="What is the Edition"
							/>
						</label>
						<label class="label text-left">
							<span>Resource Tags</span>
							<input
								class="input border-[.5px]"
								type="text"
								placeholder="What are the tags...(separate by comma)"
								id="tags"
								name="tags"
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

						<label class="label text-left mb-3">
							<span>Resource Content</span>

							<input class="input border-[.5px]" type="file" id="content" name="content" bind:value={content} />
						</label>
						

						<label class="label text-left mb-3">
							<span>Cover Photo (optional)</span>

							<input
								class="input border-[.5px]"
								type="file"
								id="coverimg"
								name="coverimg"
								bind:value={coverimg}
							/>
						</label>

						<!-- Online -->
						<label class="label text-left mb-3">
							<span>Price : </span>

							<input
								class="input border-[.5px]"
								type="number"
								id="price"
								name="price"
								bind:value={price}
								placeholder="Enter Price"
							/>
						</label>

						<button type="submit" class="btn dark:text-[#e1e1e1] dark:bg-[#3b6f8e] text-xl font-semibold">
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
</style>
