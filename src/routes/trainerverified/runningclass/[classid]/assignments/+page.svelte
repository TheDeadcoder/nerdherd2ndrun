<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { isRunningClass } from '../../../../../stores/isRunningClass';

	// import Message from './Message.svelte';
	export let data;
	const { classid } = $page.params;

	// 	let { session, supabase, classNow, studclass } = data;
	// 	$: ({ session, supabase, classNow, studclass } = data);

	let { session, supabase, classNow, studclass, teacherNow, assignment } = data;
	$: ({ session, supabase, classNow, studclass, teacherNow, assignment } = data);
	let isSidebarOpen = false;

	let title;
	let question;
	let deadline;

	let assignmentModal = false;
	function addclassmodal() {
		assignmentModal = true;
	}

	function formatDateTime(val) {
		let timestamp = new Date(val);
		if (timestamp) {
			const options = {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
			};
			let formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(timestamp);
			return formattedDateTime;
		}
	}

	function closeclassmodal() {
		assignmentModal = false;
	}

	let score;
	let scoreModal = false;
	function addscoremodal() {
		scoreModal = true;
	}
	function closescoremodal() {
		scoreModal = false;
	}

	// Timestamp formatting function
	function formatTimestamp(timestamp) {
		const date = new Date(timestamp);
		const hours = date.getHours();
		const minutes = '0' + date.getMinutes();
		const day = '0' + date.getDate();
		const month = '0' + (date.getMonth() + 1);
		const year = date.getFullYear();

		// Format: HH:MM, MM/DD/YYYY
		return `${hours}:${minutes.substr(-2)}, ${month.substr(-2)}/${day.substr(-2)}/${year}`;
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

	function updateCountdown() {
		assignment = assignment.map((classLive) => {
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

	let selectedAssignment;
	let allSubmissions = [];

	async function fetchSubmissions(val) {
		selectedAssignment = val;

		let { data: submissions, error } = await supabase
			.from('submissions')
			.select('*')
			.eq('aid', val.id);

		allSubmissions = await Promise.all(
			submissions.map(async (curr) => {
				let { data: dtt, error } = await supabase.from('student').select('*').eq('id', curr.sid);
				let student = dtt[0];
				return { ...curr, student };
			})
		);
	}

	function closeSubmissions() {
		selectedAssignment = null;
		allSubmissions = [];
	}

	// Close sidebar when clicking outside, for mobile responsiveness
	onMount(() => {
		isRunningClass.set({ classid: classid, isClass: true });

		const interval = setInterval(updateCountdown, 1000);
		updateCountdown();
		function handleOutsideClick(event) {
			if (!event.target.closest('.sidebar')) {
				isSidebarOpen = false;
			}
		}
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	});
	onDestroy(() => {
		isRunningClass.set({ classid: '', isClass: false });
	});
</script>

<div class="">
	<!--	<nav class="appbar">
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
	<div class="grid grid-cols-[15%_auto]">
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
					<a href="/trainerverified/runningclass/{classid}/assignments" class="sidebar-item active">
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
					<a href="/trainerverified/runningclass/{classid}/live" class="sidebar-item">
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
		</div> -->

	<div
		class={`p-1 min-h-screen dark:bg-[#212020] dark:text-[#e1e1e1]`}
	>
		<div class="mt-6 ml-6">
			<button class="btn p-3 font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De] rounded-lg" on:click={addclassmodal}>
				+ Add a new Assignment
			</button>

			<section class="mt-10 ml-6 flex flex-row space-x-20">
				<div>
					<h1 class="font-extrabold text-3xl mb-4">All Assignments</h1>

					{#each assignment as currAssignment}
						<div class="flex flex-row space-x-12">
							<h1 class="font-bold text-xl">
								{currAssignment.title}
							</h1>
							<div class="flex flex-row space-x-2">
								{#if currAssignment.countdown}
									<button class="btn p-2 bg-[#70e470] dark:bg-[#52a952]  rounded-lg">
										Running: {currAssignment.countdown.days}d : {currAssignment.countdown.hours}h : {currAssignment
											.countdown.minutes}m : {currAssignment.countdown.seconds}s
									</button>
									<button
										class="dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De] rounded-lg p-2"
										disabled={true}
										on:click={() => fetchSubmissions(currAssignment)}
									>
										View Details
									</button>
								{:else}
									<button class="btn p-2 bg-red-300 rounded-lg">Ended</button>
									<button
										class="dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De] rounded-lg p-2 "
										on:click={() => fetchSubmissions(currAssignment)}
									>
										View Details
									</button>
								{/if}
							</div>
						</div>
					{/each}
				</div>
				<div>
					{#if selectedAssignment}
						<div class="ml-6">
							<button
								class="bg-red-300 rounded-lg p-3 hover:bg-red-500 hover:scale-95"
								on:click={closeSubmissions}
							>
								X close
							</button>
							<h1 class="font-extrabold text-3xl">
								{selectedAssignment.title}
							</h1>
							<p class="mt-2">
								Deadline: {formatDateTime(selectedAssignment.deadline)}
							</p>

							<div class="flex flex-col space-y-3 mt-6">
								<div class="flex flex-col">
									<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
										<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
											<div class="overflow-hidden">
												<table class="min-w-full text-left text-sm font-light">
													<thead
														class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-200"
													>
														<tr>
															<th scope="col" class="px-6 py-4">#</th>
															<th scope="col" class="px-6 py-4">Student</th>
															<th scope="col" class="px-6 py-4">Submission Time</th>
															<th scope="col" class="px-6 py-4">Submission</th>
															<th scope="col" class="px-6 py-4">Marking</th>
														</tr>
													</thead>
													<tbody>
														{#each allSubmissions as submissions, i}
															<tr
																class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-300"
															>
																<td class="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
																<td class="whitespace-nowrap px-6 py-4">
																	<a
																		href="/viewonly/student/{submissions.student.id}"
																		class="flex flex-row space-x-2"
																	>
																		<img
																			src={submissions.student.image}
																			alt="Dashboard Icon"
																			class="h-8 hover:rotate-12"
																		/>
																		<h1 class="font-semibold">
																			{submissions.student.name}
																		</h1>
																	</a>
																</td>
																<td class="whitespace-nowrap px-6 py-4"
																	>{formatDateTime(submissions.time)}</td
																>
																<td class="whitespace-nowrap px-6 py-4">
																	<a href={submissions.body} class="flex flex-row space-x-1">
																		<img
																			src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/file-2-svgrepo-com.svg"
																			alt="Dashboard Icon"
																			class="h-8 hover:rotate-12"
																		/>
																		See submission
																	</a>
																</td>
																<td class="whitespace-nowrap px-6 py-4">
																	<div class="flex flex-row">
																		<p class="font-semibold text-xl">
																			{submissions.score}
																		</p>
																		<button
																			class="btn p-1 rounded-lg bg-red-300 hover:bg-red-500 ml-2"
																			on:click={addscoremodal}
																		>
																			<!-- <img
																				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
																				alt="Dashboard Icon"
																				class="h-8 hover:rotate-12"
																			/> -->
																			Edit
																		</button>
																	</div>
																</td>
															</tr>
															<!-- <div class="flex flex-row space-x-10">
																<h1>
																	{cursession.topic}
																</h1>
																<h1>
																	{cursession.start}
																</h1>
																<h1>
																	Duration: {cursession.duration} seconds
																</h1>
															</div> -->
															{#if scoreModal}
																<div
																	class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
																>
																	<div
																		class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4"
																	>
																		<div class="flex justify-between items-center mb-4">
																			<h2 class="text-2xl font-bold">Assign score</h2>
																			<button class=" text-lg" on:click={closescoremodal}
																				>&times;</button
																			>
																		</div>

																		<form
																			use:enhance
																			action="?/update&id={submissions.id}"
																			method="POST"
																			on:submit={() => {
																				closescoremodal();
																			}}
																		>
																			<div class="flex flex-col space-y-6">
																				<label class="label text-left mb-3">
																					<span>Score</span>

																					<input
																						class="input"
																						type="number"
																						id="score"
																						name="score"
																						bind:value={score}
																						placeholder="Enter The score"
																					/>
																				</label>

																				<button
																					type="submit"
																					class="btn bg-green-300 hover:bg-green-500 rounded-lg text-xl font-semibold"
																				>
																					Submit
																				</button>
																			</div>
																		</form>
																	</div>
																</div>
															{/if}
														{/each}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<div class="flex flex-row items-center justify-center font-light text-2xl">
							<!-- No Assgnment to show :( -->
						</div>
					{/if}
				</div>
			</section>
			<!-- Chat Messages Display -->
			<!-- <pre>{JSON.stringify(teacherNow, null, 2)}</pre>
			<pre>{JSON.stringify(classNow, null, 2)}</pre>
			<pre>{JSON.stringify(studclass, null, 2)}</pre>
			<pre>{JSON.stringify(assignment, null, 2)}</pre> -->
			{#if assignmentModal}
				<div
					class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
				>
					<div class="bg-[#77B8De] dark:bg-[#070707] dark:text-[#e1e1e1] p-6 rounded-lg shadow-lg max-w-md w-full m-4">
						<div class="flex justify-between items-center mb-4">
							<h2 class="text-2xl font-bold">Add a New Assignment</h2>
							<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
						</div>

						<form
							use:enhance
							action="?/addAssignment"
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
										placeholder="Enter The name of Assignment"
									/>
								</label>
								<label class="label text-left mb-3">
									<span>Deadline</span>

									<input
										class="input"
										type="datetime-local"
										id="deadline"
										name="deadline"
										bind:value={deadline}
									/>
								</label>

								<label class="label text-left mb-3">
									<span>Question file</span>

									<input
										class="input"
										type="file"
										id="question"
										name="question"
										bind:value={question}
									/>
								</label>
								<button type="submit" class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De]">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- <pre>{JSON.stringify(messages, null, 2)}</pre> -->
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
		border-bottom: 0.5px solid rgb(175, 174, 174);
		text-decoration: none;
		transition:
			background-color 0.2s,
			color 0.2s;
		/* border-radius: 0.375rem; Tailwind's rounded-md */
	}
	.sidebar-item.active,
	.sidebar-item:hover {
		background-color: #ebebeb; /* Tailwind's gray-100 */
	}

	.sidebar-item:active {
		background-color: #d4d4d4; /* Tailwind's gray-200 */
	}

	@media (prefers-color-scheme: dark) {
		.sidebar-item {
			color: #d1d5db; /* Tailwind's gray-300 */
		}

		.sidebar-item:hover {
			background-color: #a6c8e7; /* Tailwind's gray-700 */
			color: #ffffff; /* White text for better contrast */
		}

		.sidebar-item:active {
			background-color: #cbcbcb; /* Tailwind's gray-600 */
		}
	}
	.chipilive {
		background-color: #cfffb7;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
	.chipiend {
		background-color: #ffb7b7;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
	/* Chat Window Styles */

	/* Input Form Styles */
</style>
