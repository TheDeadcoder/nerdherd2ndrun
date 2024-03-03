<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	export let data;

	let { session, supabase, contestWithInfo, studentNow } = data;
	$: ({ session, supabase, contestWithInfo, studentNow } = data);

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

	function gotocontest(val) {
		window.open(`/learnerverified/runningcontest/${val}/running`, '_self');
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

	async function endContest(classLive: any) {
		const { data, error } = await supabase
			.from('pbcontest')
			.update({ isover: true })
			.eq('id', classLive.id);

		window.open('/learnerverified/contest', '_self');
	}

	// Function to update countdown for each classLive
	let delcnttem = 0;
	function updateCountdown() {
		contestWithInfo = contestWithInfo.map((classLive) => {
			if (new Date(classLive.start) > new Date()) {
				classLive.countdown = calculateCountdown(classLive.start);
			} else {
				classLive.countdown = 0;
				if (
					classLive.isover === false &&
					classLive.contestEndTime < new Date() &&
					delcnttem === 0
				) {
					console.log('delete kore dite lagbe');
					endContest(classLive);
					delcnttem++;
				}
			}
			return classLive;
		});
	}
	let interval;
	onMount(() => {
		interval = setInterval(updateCountdown, 1000);
		updateCountdown();
		//subscribeContest();

		//subscribeDeleted();
	});
	onDestroy(() => {
		clearInterval(interval);
	});
	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/learnerlogin', '_self');
	};
</script>

<div>
	<!-- <nav class="appbar">
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
				<a href="/studentblogs/recent" class="flex items-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-5 mr-1 hover:rotate-12"
					/>
					Home</a
				>
			</li>
			<li>
				<a href="/learnerverified/library" class="flex items-center p-1 font-bold"
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
				<a href="/learnerverified/contest" class="flex items-center p-1 font-bold"
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

			<div use:popup={popupClick}>
				<Avatar src={studentNow.image} width="w-10" rounded="rounded-full" />
			</div>

			<div data-popup="popupClick" class="h-32 absolute">
				<ul class="text-lg font-semibold bg-sky-300 ml-0">
					<li class="mt-2 mb-3 p-2">
						<a href="/learnerverified/profile" class="flex items-center font-bold"
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
	</nav> -->
	<section class="mt-6 ml-10 mr-10">
		<h1 class="text-4xl font-extrabold">Upcoming Contests</h1>
		<div class="grid grid-cols-4 gap-12 mt-6">
			{#each contestWithInfo as contest}
				{#if contest.isover === false}
					<div class=" flex flex-col space-y-2 p-2">
						<img
							src={contest.image}
							alt="Dashboard Icon"
							class="h-32 mr-1 hover:scale-105 rounded-lg"
						/>
						<h1 class="text-2xl font-bold">
							{contest.title}
						</h1>
						<a href="/viewonly/teacher/{contest.currTeacher.id}">
							<h1 class="font-semibold text-lg">
								{contest.currTeacher.name}
							</h1>
						</a>
						<p class="text-sm">
							{contest.topic.slice(0, 100)}...
						</p>
						<p class="text-sm">
							Duration: {contest.duration} minutes
						</p>
						{#if contest.countdown === 0}
							{#if contest.isRegistered === true}
								<button class="btn dark:text-[#e1e1e1] dark:bg-[#3b6f8e] p-2 mt-3" on:click={() => gotocontest(contest.id)}
									>Go To Contest</button
								>
							{:else}
								<button class="btn btn-primary p-2 mt-3 dark:text-[#e1e1e1] dark:bg-[#3b6f8e]" disabled={true}
									>Registration is Closed. Contest Running</button
								>
								<!-- <button class="btn btn-primary p-2 mt-3" disabled={true}></button> -->
							{/if}
						{:else if contest.isRegistered === true}
							<button class="btn btn-primary p-2 mt-3" disabled={true}> Already Registered </button>
							<p class="flex items-center justify-center">
								Before contest: {contest.countdown.days}d : {contest.countdown.hours}h : {contest
									.countdown.minutes}m : {contest.countdown.seconds}s
							</p>
						{:else}
							<form action="?/register&id={contest.id}" method="POST">
								<button
									type="submit"
									class="btn btn-primary p-2 mt-3 bg-green-400 rounded-lg w-full"
								>
									Register Now
								</button>
							</form>

							<p class="flex items-center justify-center">
								Before contest: {contest.countdown.days}d : {contest.countdown.hours}h : {contest
									.countdown.minutes}m : {contest.countdown.seconds}s
							</p>
							<!-- <button class="btn btn-primary p-2 mt-3" disabled={true}></button> -->
						{/if}
					</div>
				{/if}
			{/each}
		</div>
		<h1 class="text-4xl font-extrabold mt-6">Archieved Contests</h1>
		<div class="grid grid-cols-4 gap-12 mt-6">
			{#each contestWithInfo as contest}
				{#if contest.isover === true}
					<div class="card flex flex-col space-y-2 p-2">
						<img
							src={contest.image}
							alt="Dashboard Icon"
							class="h-32 mr-1 hover:scale-105 rounded-lg"
						/>
						<h1 class="text-2xl font-bold">
							{contest.title}
						</h1>
						<a href="/viewonly/teacher/{contest.currTeacher.id}">
							<h1 class="font-semibold text-lg">
								writer: {contest.currTeacher.name}
							</h1>
						</a>
						<p class="text-sm">
							{contest.topic.slice(0, 100)}...
						</p>
						<p class="text-sm">
							Time: {contest.duration} minutes
						</p>

						{#if contest.isRegistered === true}
							<p class="flex items-center justify-center">Your Score:{contest.ireg.score}</p>
							<!-- <button class="btn btn-primary p-2 mt-3" disabled={true}></button> -->
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</section>
	<pre>{JSON.stringify(studentNow, null, 2)}</pre>
	<pre>{JSON.stringify(contestWithInfo, null, 2)}</pre>
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
	.chipi {
		background-color: #c1d4e3;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
</style>
