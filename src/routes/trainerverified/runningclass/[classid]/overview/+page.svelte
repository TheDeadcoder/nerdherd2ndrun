<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;

	let { session, supabase, classNow, students, teacherNow, classlive } = data;
	$: ({ session, supabase, classNow, students, teacherNow, classlive } = data);

	import { isRunningClass } from '../../../../../stores/isRunningClass';
	const { classid } = $page.params;

	onMount(() => {
		isRunningClass.set({ classid: classid, isClass: true });
	});
	onDestroy(() => {
		isRunningClass.set({ classid: '', isClass: false });
	});
</script>

<main class="dark:bg-[#212020] dark:text-[#e1e1e1]">
	<nav class="appbar">
		<div class="logo-container">
			<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
		</div>
	</nav>
	<div class="ml-6 mt-6 mr-6">
		<div class="card mt-3 dark:bg-[#070707] bg-[#f5f4f4]">
			<header class="card-header text-xl font-extrabold">Syllabus</header>
			<section class="p-4"><i>{classNow.syllabus}</i></section>
			<section class="p-4 flex flex-row justify-between">
				<h1 class="font-semibold">
					Started: {classNow.start}
				</h1>
				<h1 class="font-semibold">
					Duration: {classNow.duration} weeks
				</h1>
			</section>
		</div>
		<div class="flex flex-row space-x-20 mt-6">
			<div class="flex flex-col space-y-5">
				<h1 class="font-bold text-xl mb-4">
					<u>Class Participants</u>
				</h1>
				{#each students as student}
					<a href="/viewonly/student/{student.currStudent.id}" class="flex flex-row space-x-2">
						<img
							src={student.currStudent.image}
							alt="Dashboard Icon"
							class="h-9 hover:rotate-12 rounded-full"
						/>
						<h1 class="font-semibold text-lg">
							{student.currStudent.name}
						</h1>
					</a>
				{/each}
			</div>
			<div class="flex flex-col space-y-3">
				<h1 class="font-bold text-xl">
					<u>Live Sessions</u>
				</h1>
				<div class="flex flex-col">
					<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
							<div class="overflow-hidden">
								<table class="min-w-full text-left text-sm font-light">
									<thead
										class="border-b bg-white dark:bg-[#070707] font-medium dark:border-neutral-500"
									>
										<tr>
											<th scope="col" class="px-6 py-4">#</th>
											<th scope="col" class="px-6 py-4">Topic</th>
											<th scope="col" class="px-6 py-4">Session Start Time</th>
											<th scope="col" class="px-6 py-4">Duration (seconds)</th>
										</tr>
									</thead>
									<tbody>
										{#each classlive as cursession, i}
											<tr
												class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-[#1c1c1c]"
											>
												<td class="whitespace-nowrap px-6 py-4 font-medium">{i}</td>
												<td class="whitespace-nowrap px-6 py-4">{cursession.topic}</td>
												<td class="whitespace-nowrap px-6 py-4">{cursession.start}</td>
												<td class="whitespace-nowrap px-6 py-4">{cursession.duration}</td>
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
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col space-y-5">
				<h1 class="font-bold text-xl mb-4">
					<u>Class Leaderboard</u>
				</h1>
			</div>
		</div>
	</div>
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
