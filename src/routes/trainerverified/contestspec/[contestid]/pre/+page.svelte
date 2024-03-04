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

	let { session, supabase, contestNow, teacherNow, questions } = data;
	$: ({ session, supabase, contestNow, teacherNow, questions } = data);

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

	let body;
	let image;
	let option1;
	let option2;
	let option3;
	let option4;
	let correct;
	let time;

	let showaddQuestion = false;
	function addQuestionmodal() {
		showaddQuestion = true;
	}

	function closeQuestionmodal() {
		showaddQuestion = false;
	}

	let selectedId;
	let selectedbody;
	let selectedimage;
	let selectedoption1;
	let selectedoption2;
	let selectedoption3;
	let selectedoption4;
	let selectedcorrect;
	let selectedtime;

	let showSelectedQuestion = false;
	function openSelectedModal(val) {
		showSelectedQuestion = true;
		selectedId = val.id;
		selectedbody = val.body;
		selectedimage = val.image;
		selectedoption1 = val.options[0];
		selectedoption2 = val.options[1];
		selectedoption3 = val.options[2];
		selectedoption4 = val.options[3];
		selectedcorrect = val.correct;
		selectedtime = val.time;

		console.log(
			selectedId,
			selectedbody,
			selectedimage,
			selectedoption1,
			selectedoption2,
			selectedoption3,
			selectedoption4,
			selectedcorrect,
			selectedtime
		);
	}

	function closeSelectedModal() {
		showSelectedQuestion = false;
		selectedId = null;
		selectedbody = null;
		selectedimage = null;
		selectedoption1 = null;
		selectedoption2 = null;
		selectedoption3 = null;
		selectedoption4 = null;
		selectedcorrect = null;
		selectedtime = null;
	}

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
		if (new Date(contestNow.start) > new Date()) {
			contestNow.countdown = calculateCountdown(contestNow.start);
		} else {
			console.log('ok');
			window.open(`/trainerverified/contest`);
		}
	}

	onMount(() => {
		const interval = setInterval(updateCountdown, 1000);
		updateCountdown();

		onDestroy(() => {
			clearInterval(interval);
		});
	});
</script>

<main class="mt-6 ml-6 min-h-screen border-2 w-full">
	<div class="flex flex-col items-center mt-6">
		<h1 class="text-2xl font-extrabold">
			{contestNow.title}
		</h1>
		<h1 class="text-lg font-semibold">
			{contestNow.topic}
		</h1>
		<h1>
			{contestNow.countdown.days}d : {contestNow.countdown.hours}h : {contestNow.countdown.minutes}m
			: {contestNow.countdown.seconds}s
		</h1>
	</div>
	<div class="flex flex-row justify-between ml-16 mr-16 mt-6">
		<div class="flex flex-row space-x-2">
			<img
				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/group-of-users-interface-symbol-svgrepo-com.svg"
				alt="Dashboard Icon"
				class="h-6 mr-1 hover:rotate-12"
			/>
			<p>
				{contestNow.registrants.length} registered
			</p>
		</div>
		<div class="flex flex-row space-x-2">
			<img
				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/clock-svgrepo-com.svg"
				alt="Dashboard Icon"
				class="h-5 mr-1 hover:rotate-12"
			/>
			<p>
				{contestNow.duration} minutes
			</p>
		</div>
	</div>
	<button class="mt-10 ml-8 bg-green-400 rounded-lg p-2" on:click={addQuestionmodal}>
		+ Add a New Question
	</button>
	<div class="grid grid-cols-4 gap-12 mt-8 overflow-hidden ml-8 mr-10">
		{#each questions as question, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="card p-3 shadow-lg hover:shadow-2xl" on:click={() => openSelectedModal(question)}>
				<header class="card-header text-center"><u>Question: {i + 1}</u></header>
				<section class="flex flex-col items-center justify-center">
					{#if question.image}
						<img src={question.image} alt="Dashboard Icon" class="h-32 mr-1 hover:rotate-12 mt-4" />
					{:else}
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
							alt="Dashboard Icon"
							class="h-32 mr-1 hover:scale-105 mt-4 justify-center"
						/>
					{/if}

					<h1 class="font-semibold text-lg">
						{question.body}
					</h1>

					<div class="grid grid-cols-2 gap-12 mt-4">
						{#each question.options as option, j}
							<p>
								{j + 1}. {option}
							</p>
						{/each}
					</div>
					<h1 class="font-semibold mt-6">
						Right Answer: {question.options[question.correct]}
					</h1>
					<div class="flex flex-row space-x-16 mt-2">
						<div class="flex flex-row space-x-2">
							<img
								src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/clock-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-8 mr-1 hover:scale-105 justify-center"
							/>
							<p class="mt-1">
								{question.time} seconds
							</p>
						</div>
						<button>
							<img
								src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-8 mr-1 hover:rotate-12 justify-center"
							/>
						</button>
					</div>
				</section>
			</div>
		{/each}
	</div>
	{#if showaddQuestion}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Question</h2>
					<button class=" text-lg" on:click={closeQuestionmodal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addQuestion"
					method="POST"
					enctype="multipart/form-data"
					on:submit={() => {
						closeQuestionmodal();
					}}
				>
					<div class="flex flex-col space-y-3">
						<label class="label text-left mb-2">
							<span>Question Body</span>

							<input
								class="input"
								type="text"
								id="body"
								name="body"
								bind:value={body}
								placeholder="Enter The Question"
							/>
						</label>
						<div class="grid grid-cols-2 gap-12">
							<label class="label text-left mb-2">
								<span>Option 1</span>

								<input
									class="input"
									type="text"
									id="option1"
									name="option1"
									bind:value={option1}
									placeholder="Enter value for Option 1"
								/>
							</label>
							<label class="label text-left mb-2">
								<span>Option 2</span>

								<input
									class="input"
									type="text"
									id="option2"
									name="option2"
									bind:value={option2}
									placeholder="Enter value for Option 2"
								/>
							</label>
							<label class="label text-left mb-2">
								<span>Option 3</span>

								<input
									class="input"
									type="text"
									id="option3"
									name="option3"
									bind:value={option3}
									placeholder="Enter value for Option 3"
								/>
							</label>
							<label class="label text-left mb-2">
								<span>Option 4</span>

								<input
									class="input"
									type="text"
									id="option4"
									name="option4"
									bind:value={option4}
									placeholder="Enter value for Option 4"
								/>
							</label>
						</div>

						<label class="label text-left mb-2">
							<span>Corrent Answer</span>

							<input class="input" type="number" id="correct" name="correct" bind:value={correct} />
						</label>
						<label class="label text-left mb-2">
							<span>Time (in seconds)</span>

							<input class="input" type="number" id="time" name="time" bind:value={time} />
						</label>

						<label class="label text-left mb-2">
							<span>Necessary figure (optional)</span>

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

	{#if showSelectedQuestion}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Edit The Question</h2>
					<button class=" text-lg" on:click={closeSelectedModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/editQuestion"
					method="POST"
					enctype="multipart/form-data"
					on:submit={() => {
						closeSelectedModal();
					}}
				>
					<input hidden id="selectedId" name="selectedId" bind:value={selectedId} />
					<div class="flex flex-col space-y-3">
						<label class="label text-left mb-2">
							<span>Question Body</span>

							<input
								class="input"
								type="text"
								id="selectedbody"
								name="selectedbody"
								bind:value={selectedbody}
								placeholder={selectedbody}
							/>
						</label>
						<div class="grid grid-cols-2 gap-12">
							<label class="label text-left mb-2">
								<span>Option 1</span>

								<input
									class="input"
									type="text"
									id="selectedoption1"
									name="selectedoption1"
									bind:value={selectedoption1}
									placeholder={selectedoption1}
								/>
							</label>
							<label class="label text-left mb-2">
								<span>Option 2</span>

								<input
									class="input"
									type="text"
									id="selectedoption2"
									name="selectedoption2"
									bind:value={selectedoption2}
									placeholder={selectedoption2}
								/>
							</label>
							<label class="label text-left mb-2">
								<span>Option 3</span>

								<input
									class="input"
									type="text"
									id="selectedoption3"
									name="selectedoption3"
									bind:value={selectedoption3}
									placeholder={selectedoption3}
								/>
							</label>
							<label class="label text-left mb-2">
								<span>Option 4</span>

								<input
									class="input"
									type="text"
									id="selectedoption4"
									name="selectedoption4"
									bind:value={selectedoption4}
									placeholder={selectedoption4}
								/>
							</label>
						</div>

						<label class="label text-left mb-2">
							<span>Corrent Answer</span>

							<input
								class="input"
								type="number"
								id="selectedcorrect"
								name="selectedcorrect"
								bind:value={selectedcorrect}
							/>
						</label>
						<label class="label text-left mb-2">
							<span>Time (in seconds)</span>

							<input
								class="input"
								type="number"
								id="selectedtime"
								name="selectedtime"
								bind:value={selectedtime}
							/>
						</label>

						<label class="label text-left mb-2 mt-2">
							<span>Necessary figure (optional)</span>
							<img
								src={selectedimage}
								alt="Necessary Figure"
								class="h-16 w-16 mr-1 hover:rotate-12 justify-center"
							/>

							<input
								class="input"
								type="file"
								id="selectedimage"
								name="selectedimage"
								bind:value={selectedimage}
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

	<!-- <pre>{JSON.stringify(contestNow, null, 2)}</pre> -->
</main>
