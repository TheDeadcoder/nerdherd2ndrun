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

<main>
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
	<div>
		<button class="btn variant-filled-primary text-xl font-semibold mt-10" on:click={addclassmodal}>
			Add book
		</button>
	</div>
	<div class="grid grid-cols-7 ml-8 mt-16">
		<div class="mt-2">
			{#each Object.entries(tagsToBooksMap) as [tag, books]}
				<BookCategory categoryName={tag} {books} bind:url></BookCategory>
			{/each}
		</div>
	</div>
	{#if showaddmodal}
		<div
			class="fixed inset-0 bg-sky-200 bg-opacity-50 flex justify-center items-center z-50 transition-opacity"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
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
								class="input"
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
								class="input"
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
								class="input"
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
								class="input"
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

							<input class="input" type="file" id="content" name="content" bind:value={content} />
						</label>

						<label class="label text-left mb-3">
							<span>Cover Photo (optional)</span>

							<input
								class="input"
								type="file"
								id="coverimg"
								name="coverimg"
								bind:value={coverimg}
							/>
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
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
	<pre>{JSON.stringify(tagsToBooksMap, null, 2)}</pre>
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
