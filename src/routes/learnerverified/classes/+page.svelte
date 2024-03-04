<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';

	export let data;

	let { session, supabase, classWithInfo, studentNow } = data;
	$: ({ session, supabase, classWithInfo, studentNow } = data);

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

	function gotoClass(val) {
		window.open(`/learnerverified/runningclass/${val}/chat`, '_self');
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

	// function gotocontest(val) {
	// 	window.open(`/learnerverified/runningcontest/${val}/running`, '_self');
	// }

	// Function to update countdown for each classLive

	// let interval;
	// onMount(() => {
	// 	interval = setInterval(updateCountdown, 1000);
	// 	updateCountdown();
	// 	//subscribeContest();

	// 	//subscribeDeleted();
	// });

	function classifyClass(startDateStr) {
		// Parse the start date string into a Date object
		const startDate = new Date(startDateStr);

		const today = new Date();
		return startDate > today; // True for upcoming, false for running
	}

	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/learnerlogin', '_self');
	};
</script>

<main>
	<section class="min-h-screen p-6 dark:bg-[#212020] dark:text-[#e1e1e1]">
		<div>
			<h1 class="font-extrabold text-2xl">Upcoming Classes</h1>
			<div class="grid grid-cols-4 gap-12 mt-6">
				{#each classWithInfo as currClass}
					{#if classifyClass(currClass.start)}
						<div class="card p-3 shadow-md hover:shadow-2xl flex flex-col space-y-3 dark:text-[#e1e1e1] dark:bg-[#070707]">
							<img src={currClass.image} alt="Dashboard Icon" class="h-32 hover:scale-105" />
							<h1 class="font-extrabold text-xl">
								{currClass.title}
							</h1>
							<a
								href="/viewonly/teacher/{currClass.currTeacher.id}"
								class="flex flex-row space-x-2"
							>
								<img
									src={currClass.currTeacher.image}
									alt="Dashboard Icon"
									class="h-9 hover:scale-105 rounded-full"
								/>
								<h1 class="font-semibold">
									{currClass.currTeacher.name}
								</h1>
							</a>

							<div class="flex flex-row justify-between">
								<h1 class="font-semibold">
									Start: {currClass.start}
								</h1>
								<h1 class="font-semibold">
									duration: {currClass.duration} weeks
								</h1>
							</div>

							{#if currClass.studclass.length > 0}
								<button
									class="btn p-2 hover:bg-[#619ecf] text-semibold bg-[#77B8De] w-full ml-2 mr-2 rounded-lg"
									disabled={true}
								>
									Already Registered
								</button>
							{:else}
								<form action="?/joinclass&id={currClass.id}" method="POST">
									<button
										type="submit"
										class="btn p-2 hover:bg-[#619ecf] bg-[#77B8De] text-semibold w-full ml-2 mr-2 rounded-lg dark:text-[#e1e1e1] dark:bg-[#3b6f8e]"
									>
										Join Class
									</button>
								</form>
							{/if}
						</div>
					{/if}
				{/each}
				
			</div>
		</div>
		<div class="mt-5">
			<h1 class="font-extrabold text-2xl">Running Classes</h1>
			<div class="grid grid-cols-4 gap-12 mt-6">
				{#each classWithInfo as currClass}
					{#if classifyClass(currClass.start) === false && currClass.studclass.length > 0}
						<div class=" dark:bg-[#070707] card p-3 shadow-md hover:shadow-2xl flex flex-col space-y-3">
							<img src={currClass.image} alt="Dashboard Icon" class="h-32 hover:scale-105" />
							<h1 class="font-extrabold text-xl">
								{currClass.title}
							</h1>
							<a
								href="/viewonly/teacher/{currClass.currTeacher.id}"
								class="flex flex-row space-x-2"
							>
								<img
									src={currClass.currTeacher.image}
									alt="Dashboard Icon"
									class="h-9 hover:scale-105 rounded-full"
								/>
								<h1 class="font-semibold">
									{currClass.currTeacher.name}
								</h1>
							</a>

							<div class="flex flex-row justify-between">
								<h1 class="font-semibold">
									Start: {currClass.start}
								</h1>
								<h1 class="font-semibold">
									duration: {currClass.duration} weeks
								</h1>
							</div>

							<button
								class="btn p-2 hover:bg-[#619ecf] bg-[#77B8De] w-full ml-2 mr-2 rounded-lg dark:text-[#e1e1e1] dark:bg-[#3b6f8e]"
								on:click={() => gotoClass(currClass.id)}
							>
								Go to Class
							</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>
</main>

<!-- <pre>{JSON.stringify(classWithInfo, null, 2)}</pre> -->

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
