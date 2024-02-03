<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import Quill from './QuillEd.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import QuillEd from './QuillEd.svelte';

	let list: string[] = [];

	let currentTile: number = 1;

	export let data;
	export let form;
	let { session, supabase, teacher, blog } = data;
	$: ({ session, supabase, teacher, blog } = data);

	let profileForm: HTMLFormElement;
	let title;
	let description;
	let content;
	let timetoread;
	let tags;

	let isEditing = false;
	function handleopeneditor() {
		isEditing = true;
	}

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

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
	async function fetchContent(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.text();
		} catch (e) {
			console.error('Failed to fetch content:', e);
			return 'Failed to load content';
		}
	}
	let contents = [];
	// Function to update the blog content after fetching
	async function updateContent(blog) {
		let currcontent = await fetchContent(blog.content);
		contents.push(currcontent);
	}

	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/trainerlogin', '_self');
	};
	onMount(async () => {
		for (let i = 0; i < blog.length; i++) {
			blog[i].fetchedContent = await fetchContent(blog[i].content);
			console.log(`Content for blog ${i}:`, blog[i].fetchedContent); // Log fetched content
		}
		blog = blog.slice(); // Trigger reactivity
	});
</script>

<main>
	<div>
		<nav class="appbar">
			<div class="logo-container">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					width={60}
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
					<a href="/library" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/book-opened-svgrepo-com%20(1).svg"
							alt="Dashboard Icon"
							class="h-5 mr-1 hover:rotate-12"
						/>
						Library</a
					>
				</li>
				<li>
					<a href="/library" class="flex items-center p-1 font-bold"
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
					<a href="/trainerverified/ai/gpt" class="flex items-center p-1 font-bold mr-3"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot.svg"
							alt="Dashboard Icon"
							class="h-5 mr-1 hover:rotate-12"
						/>
						Chatbot</a
					>
				</li>

				<LightSwitch class="mr-3" />
				<div use:popup={popupClick}>
					<Avatar src={teacher[0].image} width="w-10" rounded="rounded-full" />
				</div>

				<div data-popup="popupClick">
					<ul class="text-lg font-semibold bg-sky-300 ml-0">
						<li class="mt-2 mb-3">
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
			</ul>
		</nav>
	</div>
	<div class="w-full h-screen flex flex-row">
		<AppRail class="w-fit overflow-hidden">
			<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
				<a
					href="/trainerverified/home/recent"
					class="flex flex-col items-center justify-center p-3 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/clock-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Recent
				</a>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
				<a
					href="/trainerverified/home/my"
					class="flex flex-col items-center justify-center p-3 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/personal-account-account-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					My Articles
				</a>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
				<a
					href="/trainerverified/home/popular"
					class="flex flex-col items-center justify-center p-3 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/fire-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Popular
				</a>
			</AppRailTile>

			<AppRailTile bind:group={currentTile} name="tile-5" value={4} title="tile-5">
				<a
					href="/trainerverified/home/saved"
					class="flex flex-col items-center justify-center p-3 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-save-the-document-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Saved
				</a>
			</AppRailTile>

			<!-- --- -->
			<svelte:fragment slot="trail">
				<div class="mb-24 flex flex-col items-center justify-center" on:click={handleSignOut}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/power-button-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Logout
				</div>
			</svelte:fragment>
		</AppRail>
		{#if isEditing === false}
			<div class="w-3/4 p-6">
				<div class=" flex flex-row mb-10">
					<div class="flex flex-row">
						<div class="md:w-1/3 lg:w-1/3 mr-3">
							<label class="label">
								<span class="font-semibold">Search By Title</span>
								<input class="input border-0 rounded-sm hover:border-b-2" type="text" placeholder="Enter Name of the Article" />
							</label>
						</div>
						<div class="md:w-1/3 lg:w-1/3 mr-3">
							<label class="label">
								<span class="font-semibold">Search By Author</span>
								<input class="input border-0 rounded-sm hover:border-b-2" type="text" placeholder="Enter Name of the Author" />
							</label>
						</div>
						<div class=" md:w-1/3 lg:w-1/3 mr-3">
							<label class="label">
								<span class="font-semibold">Search By Tag</span>
								<InputChip bind:value={list} name="chips" placeholder="Enter Tags..." class="border-0 rounded-sm hover:border-b-2" />
							</label>
						</div>
					</div>

					<div class="w-1/6 mt-6 border-2 h-11">
						<button class=" btn font-bold text-[18px] py-4 bg-[#45d588] rounded-sm shadow-md hover:bg-[#15b141] hover:text-[19px] hover:shadow-lg w-[100%] h-[100%] ">
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110 "
								alt="Search Icon"
								width="20"
								height="20"
								style="vertical-align: middle;"
							/>
							Search
						</button>
					</div>
				</div>
				<div
					class="card w-1/3 fill-emerald-300 hover:shadow-xl hover:scale-105"
					on:click={handleopeneditor}
				>
					<div class="flex flex-row p-10">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/plus-add-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-10 w-10 mr-4 hover:rotate-12 hover:scale-105"
						/>
						<h1 class="font-bold">Add New Post</h1>
					</div>
				</div>
				<div class="h-screen flex flex-col mt-6 p-6 w-full">
					{#each blog as currblog, i}
						<div class="flex flex-row space-x-4">
							<div class="mr-24 hover:scale-105 w-1/2">
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blog5.png"
									alt="User Image"
									class="w-1/2 h-1/2 items-center justify-center object-contain object-center"
								/>

								<div class="flex flex-row">
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/299092_calendar_icon.svg"
										alt="User Image"
										class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
									/>
									<p class="text-sm mr-6">{formatDate(currblog.createdat)}</p>
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/stopwatch-svgrepo-com.svg"
										alt="User Image"
										class="w-5 h-5 mr-1 hover:scale-105 hover:rotate-12"
									/>
									<p class="text-sm">{currblog.timetoread} minutes read</p>
								</div>
								<h1 class="text-xl font-semibold mr-10">
									{currblog.title}
								</h1>
								<p class="text-sm font-semibold mr-10">
									{currblog.description}
								</p>
								<p>
									{#if currblog.fetchedContent}
										{@html currblog.fetchedContent}
									{:else}
										Loading...
									{/if}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<form class="w-4/5 p-6 space-y-3" method="POST" action="?/upload">
				<div>
					<label for="title">Title of the Article</label>
					<input id="title" name="title" type="text" value={title} />
				</div>
				<div>
					<label for="description">Short Description of the Article within 30 words</label>
					<input id="description" name="description" type="text" value={description} />
				</div>
				<div>
					<label for="timetoread">Time Required to Read</label>
					<input id="timetoread" name="timetoread" type="text" value={timetoread} />
				</div>

				<div>
					<label for="tags">Tags of the Article</label>
					<input id="tags" name="tags" type="text" value={tags} />
				</div>
				<div>
					<input type="hidden" name="content" value={content} />
				</div>
				<div>
					<QuillEd
						{supabase}
						bind:url={content}
						on:upload={() => {
							profileForm.requestSubmit();
						}}
					/>
				</div>
				<div>
					<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
						⚡Upload Blog⚡
					</button>
				</div>
			</form>
		{/if}
	</div>
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
</style>
