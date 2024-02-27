<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, Table } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';

	export let data;

	let { session, supabase, contestwithRegistrants, teacherNow } = data;
	$: ({ session, supabase, contestwithRegistrants, teacherNow } = data);

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
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/trainerlogin', '_self');
	};

	let title;
	let topic;
	let start;
	let duration;
	let image;

	let showaddcontest = false;
	function addclassmodal() {
		showaddcontest = true;
	}

	function closeclassmodal() {
		showaddcontest = false;
	}

	function calculateCountdown(endTime) {
		const total = Date.parse(endTime) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));
		return {
			total,
			days,
			hours,
			minutes,
			seconds
		};
	}

	// Function to update countdown for each classLive
	function updateCountdown() {
		contestwithRegistrants = contestwithRegistrants.map((classLive) => {
			if (new Date(classLive.start) > new Date()) {
				classLive.countdown = calculateCountdown(classLive.start);
			} else {
				classLive.countdown = 0;
			}
			return classLive;
		});
	}

	onMount(() => {
		const interval = setInterval(updateCountdown, 1000);
		updateCountdown();

		onDestroy(() => {
			clearInterval(interval);
		});
	});
</script>

<main class="mt-6 ml-6">
	<button class="btn p-4 bg-slate-400 rounded-lg" on:click={addclassmodal}>
		+ Add a New Public Contest
	</button>
	<div class="grid grid-cols-4 gap-12 mt-8">
		{#each contestwithRegistrants as contest}
			<div class="card flex flex-col space-y-2 shadow-lg hover:shadow-2xl p-4">
				<img src={contest.image} alt="contest Icon" class="w-96 mr-1 hover:scale-105" />
				<h1 class="font-extrabold text-xl">
					{contest.title}
				</h1>
				<p>
					{contest.topic.slice(0, 100)}...
				</p>
				<div class="flex flex-row justify-between">
					<p>
						{contest.registrants.length} registered
					</p>
					{#if contest.contdown === -1}
						<p>Calculating...</p>
					{:else if contest.contdown === 0}
						<button class="btn bg-green-400 rounded-lg p-1"> Enter Arena </button>
					{:else}
						<a
							href="/trainerverified/contestspec/{contest.id}/pre"
							class="btn bg-green-400 rounded-lg p-1"
						>
							Modify Contest
						</a>
					{/if}
				</div>
				<div class="flex items-center justify-center">
					<!-- {contest.countdown.days}d : {contest.countdown.hours}h : {contest.countdown.minutes}m
							: {contest.countdown.seconds}s -->
					{#if contest.contdown === -1}
						<p>Calculating...</p>
					{:else if contest.contdown === 0}
						<div>Contest is running</div>
					{:else}
						<div class="text-sm">
							Before Contest: {contest.countdown.days}d : {contest.countdown.hours}h : {contest
								.countdown.minutes}m : {contest.countdown.seconds}s
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	{#if showaddcontest}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Public Contest</h2>
					<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addContest"
					method="POST"
					enctype="multipart/form-data"
					on:submit={() => {
						closeclassmodal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Title</span>

							<input
								class="input"
								type="text"
								id="title"
								name="title"
								bind:value={title}
								placeholder="Enter The title of the Contest"
							/>
						</label>
						<label class="label text-left mb-3">
							<span>Topic</span>

							<input
								class="input"
								type="text"
								id="topic"
								name="topic"
								bind:value={topic}
								placeholder="Enter your Topic of the Contest"
							/>
						</label>
						<label class="label text-left mb-3">
							<span>Start</span>

							<input
								class="input"
								type="datetime-local"
								id="start"
								name="start"
								bind:value={start}
							/>
						</label>
						<label class="label text-left mb-3">
							<span>Duration (in minutes)</span>

							<input
								class="input"
								type="number"
								id="duration"
								name="duration"
								bind:value={duration}
							/>
						</label>

						<label class="label text-left mb-3">
							<span>Photo (optional)</span>

							<input class="input" type="file" id="image" name="image" bind:value={image} />
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	<pre>{JSON.stringify(contestwithRegistrants, null, 2)}</pre>
</main>
