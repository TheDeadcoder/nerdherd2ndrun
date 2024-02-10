<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, TabGroup,Tab } from '@skeletonlabs/skeleton';
	import Quill from '$lib/QuillEditor.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, Table } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data

	let { session, supabase, blog } = data;
	$: ({ session, supabase, blog } = data);

	let list: string[] = [];
	let tagsofPost: string[] = ['web development', 'javascript'];
	let tagsofPost1: string[] = ['web development', 'mobile app development', 'framework comparison'];
	let currentTile: number = 0;

	$: calculateCountdown();

	let nextDonationDate: Date = new Date('2024-1-23');
	let daysLeft: number = 0;
	let hoursLeft: number = 0;
	let minutesLeft: number = 0;
	let secondsLeft: number = 0;
	let searchBarShow: number = 0;

	function calculateCountdown() {
		const now: Date = new Date();
		const timeDifference: number = nextDonationDate - now; // Difference in milliseconds

		daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
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

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};
	const popupHover1: PopupSettings = {
		event: 'hover',
		target: 'popupHover1',
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
<<<<<<< HEAD
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
=======
		<div class="navbar">
			<nav class="appbar">
				<div class="logo-container flex items-center">
>>>>>>> cf056faaed85afeb33db6cf4395339275de61952
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
						<Avatar
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/avro.jpg"
							width="w-10"
							rounded="rounded-full"
						/>
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
							<li class="mb-2 p-2">
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
			<TabGroup class="w-full h-14 bg-[#e6f5ff]  mt-2 flex justify-center">
				<Tab bind:group={currentTile} name="tab1" value={0} class="hover:scale-105 hover:bg-[#c8e4f7]">
		
					<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment>
					<span>(label 1)</span>
			 -->
					<a
						href="/trainerverified/home/recent"
						class="flex items-center justify-center p-2 font-semibold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/clock-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 w-6 m-1  hover:scale-105 hover:bg-[#c8e4f7]"
						/>
						Recent
					</a>
				</Tab>
				<Tab bind:group={currentTile} name="tab2" value={1} class="hover:scale-105 hover:bg-[#c8e4f7]">
					<a
						href="/trainerverified/home/my"
						class="flex  items-center justify-center p-2 font-semibold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/personal-account-account-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 w-6 m-1  hover:scale-105 hover:bg-[#c8e4f7]"
						/>
						My Articles
					</a>
				</Tab>
				<Tab bind:group={currentTile} name="tab3" value={2} class="hover:scale-105 hover:bg-[#c8e4f7]">
					<a
						href="/trainerverified/home/popular"
						class="flex  items-center justify-center p-2 font-semibold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/fire-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 w-6 m-1   hover:scale-105 hover:bg-[#c8e4f7]"
						/>
						Popular
					</a>
				</Tab>
				<Tab bind:group={currentTile} name="tab3" value={3} class="hover:scale-105 hover:bg-[#c8e4f7]">
					<a
						href="/trainerverified/home/saved"
						class="flex items-center justify-center p-2 font-semibold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-save-the-document-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 w-6 m-1"
						/>
						Saved
					</a>
				</Tab>
				<Tab bind:group={currentTile} name="tab3" value={4} class="hover:scale-105 hover:bg-[#c8e4f7]">
					<button class="flex items-center justify-center p-2 font-semibold" on:click={()=> searchBarShow = searchBarShow^1}>
						<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110 h-6 w-6 m-1"
								alt="Search Icon"
								style="vertical-align: middle;"
							/>
							Search
					</button>
				</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					
				</svelte:fragment>
			</TabGroup>
		
			<div class={searchBarShow?"p-2 bg-slate-200":"hidden p-2"}>
				<div class=" flex flex-row mb-1 justify-center">
					<div class="flex flex-row ">
						<div class="md:w-1/3 lg:w-1/3 mr-3">
							<label class="label">
								<span class="pl-1">Search By Title</span>
								<input class="input rounded-xl border-[1px] bg-slate-200" type="text" placeholder="Enter Name of the Article" />
							</label>
						</div>
						<div class="md:w-1/3 lg:w-1/3 mr-3">
							<label class="label">
								<span class="pl-1">Search By Author</span>
								<input class="input rounded-xl border-[1px] bg-slate-200" type="text" placeholder="Enter Name of the Author" />
							</label>
						</div>
						<div class=" md:w-1/3 lg:w-1/3 mr-3">
							<label class="label ">
								<span class="">Search By Tag</span>
								<InputChip bind:value={list} class="input rounded-full border-[1px] bg-slate-200" name="chips" placeholder="Enter Tags..." />
							</label>
						</div>
					</div>
					<div class="w-1/6 mt-6 border-2 h-11">
						<button
							class=" btn font-bold text-[18px] py-4 bg-[#45d588] rounded-sm shadow-md hover:bg-[#15b141] hover:text-[19px] hover:shadow-lg w-[100%] h-[100%]"
						>
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								alt="Search Icon"
								width="20"
								height="20"
								style="vertical-align: middle;"
							/>
							Search
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="w-full h-screen flex flex-row mt-[120px] justify-center">
		<div class="w-4/5">
			
			<div class="grid grid-cols-4 mt-6 p-6 w-full">
				{#each blog as currblog, i}
					<div class="m-3 overflow-hidden bg-white hover:bg-[#efeded] rounded-md shadow-2xl pb-3 cursor-pointer ">
						<div class="hover:scale-105">
							<div class="mb-3 p-3 rounded-full">
								<img
									src="https://skawbthbjfypoflcurec.supabase.co/storage/v1/object/public/avro012/thumbnail.jpg"
									alt="User "
									class=" w-[100%] items-center justify-center object-contain object-center"
								/>
							</div>
							<div class="px-4">
								<div>
									<h1 class="text-2xl font-semibold mb-2">
										{currblog.title}
									</h1>
								</div>
								<div class="flex flex-row">
									<!-- <img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/299092_calendar_icon.svg"
										alt="User "
										class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
									/> -->
									<p class="text-sm text-justify font-light">{formatDate(currblog.createdat)} | {currblog.timetoread} minutes read</p>
									<!-- <img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/stopwatch-svgrepo-com.svg"
										alt="User "
										class="w-5 h-5 mr-1 hover:scale-105 hover:rotate-12"
									/> -->
									<!-- <p class="text-sm">{currblog.timetoread} minutes read</p> -->
								</div>
								
								<div>
									<p class="text-md text-justify ">
										{currblog.description.slice(0, 100)} ...
									</p>
								</div>  
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
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
		margin-top: .5rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
		
	}
    .navbar{
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
