<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	const { classid } = $page.params;
	let { session, supabase, classNow, studclass, teacherNow, classlive } = data;
	$: ({ session, supabase, classNow, studclass, teacherNow, classlive } = data);

	let uid = 100;

	let isSidebarOpen = false;

	let start;
	let topic;

	let addliveModal = false;
	function openliveModal() {
		addliveModal = true;
	}

	function closeliveModal() {
		addliveModal = false;
	}

	function goLive(val) {
		window.location.href = `/commonverified/call/${val}?uid=${teacherNow.id}`;
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
		classlive = classlive.map((classLive) => {
			if (new Date(classLive.start) > new Date()) {
				const countdown = calculateCountdown(classLive.start);
				return { ...classLive, countdown };
			} else {
				let countdown = 0;
				return { ...classLive, countdown };
			}
			return classLive;
		});
	}

	onMount(() => {
		const interval = setInterval(updateCountdown, 1000);
		updateCountdown();
		function handleOutsideClick(event) {
			if (!event.target.closest('.sidebar')) {
				isSidebarOpen = false;
			}
		}
		onDestroy(() => {
			clearInterval(interval);
		});
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	});
</script>

<nav class="appbar">
	<div class="logo-container">
		<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
		<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
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
	</ul>
</nav>
<main class="min-h-screen grid grid-cols-[15%_auto]">
	<div
		class={`transform bg-[#c2d5e7] text-black   min-h-screen overflow-auto ease-in-out transition-all duration-300 z-30 ${
			isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
		} lg:translate-x-0 lg:static lg:block`}
	>
		<div class="flex flex-col mt-6">
			<div>
				<a href="/trainerverified/runningclass/{classid}/chat" class="sidebar-item">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/chat-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 mr-3 hover:rotate-12"
						/>
						<p class="text-black font-bold">Chat</p>
					</div>
				</a>
			</div>
			<div>
				<a href="/trainerverified/runningclass/{classid}/assignments" class="sidebar-item">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/bell-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 mr-3 hover:rotate-12"
						/>
						<p class="text-black font-bold">Assignments</p>
					</div>
				</a>
			</div>
			<div>
				<a href="/trainerverified/runningclass/{classid}/credentials" class="sidebar-item">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/certify-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 mr-3 hover:rotate-12"
						/>
						<p class="text-black font-bold">Credentials</p>
					</div>
				</a>
			</div>
			<div>
				<a href="/trainerverified/runningclass/{classid}/live" class="sidebar-item active">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/conference-live-video-svgrepo-com.svg?t=2024-02-09T19%3A53%3A53.776Z"
							alt="Dashboard Icon"
							class="h-6 mr-3 hover:rotate-12"
						/>
						<p class="text-black font-bold">Go Live</p>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class={`p-10 ${isSidebarOpen ? 'flex-1 p-6 flex-grow' : ''}`}>
		<button
			class="btn bg-emerald-400 mt-6 p-4 rounded-md flex flex-row space-x-2"
			on:click={openliveModal}
		>
			<img
				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/clock-svgrepo-com.svg"
				alt="Dashboard Icon"
				class="h-6 hover:rotate-12"
			/>
			<h4 class="font-semibold">Schedule a new Class</h4>
		</button>

		<div class="mt-9 flex flex-col space-y-4">
			<h1 class="text-2xl font-extrabold"><u>All Classes</u></h1>
			{#each classlive as currsession, i}
				<div class=" mr-40 flex flex-row space-x-8">
					<h1 class="font-bold text-xl">
						{i + 1}. {currsession.topic}
					</h1>
					{#if currsession.done}
						<button class="btn bg-teal-500"> Check Stat </button>
					{:else if currsession.countdown}
						<p class="font-semibold">
							{currsession.countdown.days}d : {currsession.countdown.hours}h : {currsession
								.countdown.minutes}m : {currsession.countdown.seconds}s
						</p>
					{:else if currsession.countdown === 0}
						<button
							class="bg-blue-500 text-white px-4 py-2 rounded"
							on:click={() => goLive(currsession.id)}>Go Live</button
						>
					{:else}
						<div class="placeholder" />
					{/if}
				</div>
			{/each}
		</div>

		<!-- <pre>{JSON.stringify(classNow, null, 2)}</pre>
		<pre>{JSON.stringify(studclass, null, 2)}</pre>
		<pre>{JSON.stringify(classlive, null, 2)}</pre> -->
	</div>
	{#if addliveModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Schedule for a new Class</h2>
					<button class=" text-lg" on:click={closeliveModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addLive"
					method="POST"
					on:submit={() => {
						closeliveModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Topic to be Covered</span>

							<input class="input" type="text" id="topic" name="topic" bind:value={topic} />
						</label>
						<label class="label text-left mb-3">
							<span>Starting time</span>

							<input
								class="input"
								type="datetime-local"
								id="start"
								name="start"
								bind:value={start}
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
