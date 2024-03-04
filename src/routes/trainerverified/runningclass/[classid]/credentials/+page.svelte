<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data;

	let { session, supabase, classNow, studentwithCred } = data;
	$: ({ session, supabase, classNow, studentwithCred } = data);

	import { isRunningClass } from '../../../../../stores/isRunningClass';
	const { classid } = $page.params;

	let cred;
	let credModal = false;
	function addcredmodal() {
		credModal = true;
	}
	function closecredmodal() {
		credModal = false;
	}

	onMount(() => {
		isRunningClass.set({ classid: classid, isClass: true });
	});
	onDestroy(() => {
		isRunningClass.set({ classid: '', isClass: false });
	});
</script>

<main>
	<nav class="appbar">
		<div class="logo-container">
			<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
		</div>
	</nav>
	<section class="p-6">
		<h1 class="text-xl font-bold">Participants Credentials</h1>
		<div class="flex flex-col">
			<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div class="overflow-hidden">
						<table class="min-w-full text-left text-sm font-light">
							<thead
								class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-200"
							>
								<tr>
									<th scope="col" class="px-6 py-4 text-xl font-bold">#</th>
									<th scope="col" class="px-6 py-4 text-xl font-bold">Student</th>
									<th scope="col" class="px-6 py-4 text-xl font-bold">Credential</th>
								</tr>
							</thead>
							<tbody>
								{#each studentwithCred as currStudent, i}
									<tr class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-300">
										<td class="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>

										<td class="whitespace-nowrap px-6 py-4">
											<a
												href="/viewonly/student/{currStudent.student.id}"
												class="flex flex-row space-x-2"
											>
												<img
													src={currStudent.student.image}
													alt="Dashboard Icon"
													class="h-12 hover:rotate-12 rounded-full"
												/>
												<h1 class="font-semibold text-xl">
													{currStudent.student.name}
												</h1>
											</a>
										</td>

										<td class="whitespace-nowrap px-6 py-4">
											{#if currStudent.credentials.length > 0}
												<img
													src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
													alt="Dashboard Icon"
													class="h-8 hover:rotate-12"
												/>
											{:else}
												<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<img
													src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/plus-cross-svgrepo-com%20(1).svg"
													alt="Dashboard Icon"
													class="h-8 hover:rotate-12"
													on:click={addcredmodal}
												/>
											{/if}
										</td>
										{#if credModal}
											<div
												class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
											>
												<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
													<div class="flex justify-between items-center mb-4">
														<h2 class="text-2xl font-bold">Assign Credential acknowledgement</h2>
														<h2 class="text-2xl font-bold">{currStudent.student.name}</h2>
														<button class=" text-lg" on:click={closecredmodal}>&times;</button>
													</div>

													<form
														use:enhance
														action="?/add&id={currStudent.student.id}"
														method="POST"
														on:submit={() => {
															closecredmodal();
														}}
													>
														<div class="flex flex-col space-y-6">
															<label class="label text-left mb-3">
																<span>Credentials</span>

																<textarea
																	class="textarea"
																	rows="3"
																	placeholder="Write Acknowledgement Message"
																	id="cred"
																	name="cred"
																	bind:value={cred}
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
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<!-- <pre>{JSON.stringify(classNow, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(studentwithCred, null, 2)}</pre> -->

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
