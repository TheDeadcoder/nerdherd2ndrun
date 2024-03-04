<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data;
	const { classid } = $page.params;

	let { session, supabase, classNow, assignmentwithSubmission, studentNow } = data;
	$: ({ session, supabase, classNow, assignmentwithSubmission, studentNow } = data);

	import { isLearnerInClass } from '../../../../../stores/isLearnerInClass';

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

	let file;

	let submissionModal = false;
	function addSubmissionModal() {
		submissionModal = true;
	}

	function closeSubmissionModal() {
		submissionModal = false;
	}

	let editModal = false;
	let efile;
	function addEditModal() {
		editModal = true;
	}

	function closeEditModal() {
		editModal = false;
	}

	function updateCountdown() {
		assignmentwithSubmission = assignmentwithSubmission.map((classLive) => {
			if (new Date(classLive.deadline) > new Date()) {
				const countdown = calculateCountdown(classLive.deadline);
				return { ...classLive, countdown };
			} else {
				let countdown = 0;
				return { ...classLive, countdown };
			}
			return classLive;
		});
	}

	onMount(() => {
		isLearnerInClass.set({ classid: classid, isClass: true });
		const interval = setInterval(updateCountdown, 1000);
		updateCountdown();
	});
	onDestroy(() => {
		isLearnerInClass.set({ classid: '', isClass: false });
	});
</script>

<main>
	<nav class="appbar">
		<div class="logo-container">
			<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
		</div>
	</nav>

	<section class="p-6 flex flex-col space-y-10">
		<div>
			<div class="flex flex-row space-x-1">
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/Alarm_Clock_GIF_Animation_High_Res.gif"
					alt="Dashboard Icon"
					class="h-10 mr-1 hover:rotate-12"
				/>
				<h1 class="font-extrabold text-2xl"><u>Upcoming Assignments</u></h1>
			</div>
			<div class="grid grid-cols-4 gap-12 mt-6">
				{#each assignmentwithSubmission as currAssignment}
					{#if currAssignment.countdown}
						<div class="card p-4 rounded-lg flex flex-col shadow-md hover:shadow-xl">
							<img
								src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/assignment%20logo.png"
								alt="Dashboard Icon"
								class="h-24 mr-1 hover:scale-105"
							/>
							<h1 class="font-bold text-xl mt-6">
								{currAssignment.title}
							</h1>
							<p>
								Deadline in {currAssignment.countdown.days}d : {currAssignment.countdown.hours}h : {currAssignment
									.countdown.minutes}m : {currAssignment.countdown.seconds}s
							</p>
							<div class="flex flex-row justify-between mt-4">
								<a
									href={currAssignment.question}
									class="text-blue-400 hover:font-semibold hover:text-blue-700"
								>
									See Question >
								</a>
								<div class="flex flex-row space-x-4">
									{#if currAssignment.submission.length > 0}
										<a href={currAssignment.submission[0].body}>
											<img
												src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/view-alt-1-svgrepo-com.svg"
												alt="Dashboard Icon"
												class="h-6 hover:scale-105"
											/>
										</a>

										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/plus-cross-svgrepo-com%20(1).svg"
											alt="Dashboard Icon"
											class="h-6 hover:scale-105"
											on:click={addEditModal}
										/>
									{:else}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/plus-add-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-6 hover:scale-105"
											on:click={addSubmissionModal}
										/>
									{/if}
								</div>
							</div>
						</div>
						{#if submissionModal}
							<div
								class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
							>
								<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
									<div class="flex justify-between items-center mb-4">
										<h2 class="text-2xl font-bold">Add a New Submission</h2>
										<button class=" text-lg" on:click={closeSubmissionModal}>&times;</button>
									</div>

									<form
										use:enhance
										action="?/insertfrst&id={currAssignment.id}"
										method="POST"
										enctype="multipart/form-data"
										on:submit={() => {
											closeSubmissionModal();
										}}
									>
										<div class="flex flex-col space-y-6">
											<label class="label text-left mb-3">
												<span>File</span>

												<input
													class="input"
													type="file"
													id="file"
													name="file"
													bind:value={file}
													placeholder="Upload your file"
												/>
											</label>

											<button
												type="submit"
												class="btn variant-filled-primary text-xl font-semibold"
											>
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						{/if}
						{#if editModal}
							<div
								class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
							>
								<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
									<div class="flex justify-between items-center mb-4">
										<h2 class="text-2xl font-bold">Edit Submission</h2>
										<button class=" text-lg" on:click={closeEditModal}>&times;</button>
									</div>

									<form
										use:enhance
										action="?/update&id={currAssignment.submission[0].id}"
										method="POST"
										enctype="multipart/form-data"
										on:submit={() => {
											closeEditModal();
										}}
									>
										<div class="flex flex-col space-y-6">
											<label class="label text-left mb-3">
												<span>File</span>

												<input
													class="input"
													type="file"
													id="efile"
													name="efile"
													bind:value={efile}
													placeholder="Upload your file"
												/>
											</label>

											<button
												type="submit"
												class="btn variant-filled-primary text-xl font-semibold"
											>
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						{/if}
					{/if}
				{/each}
			</div>
			<h1 class="font-extrabold text-2xl mt-12"><u>Previous Assignments</u></h1>
			<div class="grid grid-cols-4 gap-12 mt-4">
				{#each assignmentwithSubmission as currAssignment}
					{#if currAssignment.countdown === 0}
						<div class="card p-4 rounded-lg flex flex-col shadow-md hover:shadow-xl">
							<img
								src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/assignment%20logo.png"
								alt="Dashboard Icon"
								class="h-24 mr-1 hover:scale-105"
							/>
							<h1 class="font-bold text-xl mt-6">
								{currAssignment.title}
							</h1>
							<div class="flex flex-row justify-between mt-4">
								<a
									href={currAssignment.question}
									class="text-blue-400 hover:font-semibold hover:text-blue-700"
								>
									See Question >
								</a>
								{#if currAssignment.submission.length > 0}
									<h1 class="font-semibold">
										Received score: {currAssignment.submission[0].score}
									</h1>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>
</main>

<!-- <form action="?/deleteTodo&id={todoItem.id}" method="POST">
	<button type="submit">
		<img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/delete-svgrepo-com%20(1).svg" alt="Dashboard Icon" class="h-5 mr-2 hover:rotate-12"/>
	</button>
</form> -->

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
