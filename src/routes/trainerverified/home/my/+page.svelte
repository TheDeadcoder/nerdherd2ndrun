<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import Quill from '$lib/QuillEditor.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data;

	let list: string[] = [];
	let tagsofPost: string[] = ['web development', 'javascript'];
	let tagsofPost1: string[] = ['web development', 'mobile app development', 'framework comparison'];
	let currentTile: number = 1;

	$: calculateCountdown();

	let nextDonationDate: Date = new Date('2024-1-23');
	let daysLeft: number = 0;
	let hoursLeft: number = 0;
	let minutesLeft: number = 0;
	let secondsLeft: number = 0;

	function calculateCountdown() {
		const now: Date = new Date();
		const timeDifference: number = nextDonationDate - now; // Difference in milliseconds

		daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
	}
	let isEditing = false;
	function handleopeneditor() {
		isEditing = true;
	}

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

	let currentDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/trainerlogin', '_self');
	};
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
					<a href="/library" class="flex items-center p-1 font-bold mr-3"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/championship-trophy-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-5 mr-1 hover:rotate-12"
						/>
						Compete</a
					>
				</li>

				<LightSwitch class="mr-3" />
				<div use:popup={popupClick}>
					<Avatar
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/avro.jpg"
						width="w-10"
						rounded="rounded-full"
					/>
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
						<li class="mb-2">
							<a href="/library" class="flex items-center font-bold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="h-7 mr-1 hover:rotate-12"
								/>
								Logout</a
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
								<input class="input" type="text" placeholder="Enter Name of the Article" />
							</label>
						</div>
						<div class="md:w-1/3 lg:w-1/3 mr-3">
							<label class="label">
								<span class="font-semibold">Search By Author</span>
								<input class="input" type="text" placeholder="Enter Name of the Author" />
							</label>
						</div>
						<div class=" md:w-1/3 lg:w-1/3 mr-3">
							<label class="label">
								<span class="font-semibold">Search By Tag</span>
								<InputChip bind:value={list} name="chips" placeholder="Enter Tags..." />
							</label>
						</div>
					</div>

					<div class="w-1/6 mt-6">
						<button class="btn font-semibold bg-emerald-300 hover:bg-emerald-500">
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110 mr-2"
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
			</div>
		{:else}
			<div class="w-4/5 p-6">
				<Quill />
			</div>
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
