<script>
	// @ts-nocheck

	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data;

	let { session, supabase, todo } = data;
	$: ({ session, supabase, todo } = data);

	let selectedTodo = null;

	let taskname;
	let description;
	let deadline;
	let importancescale;

	function markCompleted(todoItem) {
		// Implementation to mark a todo as completed
	}

	function deleteTodo(todoItem) {
		// Implementation to delete a todo
	}

	function viewDetails(todoItem) {
		selectedTodo = todoItem;
		console.log(selectedTodo);
	}

	function closeModal() {
		selectedTodo = null;
	}

	let openForm = false;
	function openAddForm() {
		openForm = true;
		console.log(openForm);
	}

	function closeform() {
		openForm = false;
		console.log(openForm);
	}

	function getColorClass(todoItem) {
		console.log(todoItem.status);
		if (todoItem.status) {
			return 'bg-green-200 text-green-600';
		} else {
			const importance = parseInt(todoItem.importancescale);
			if (importance < 2) {
				return 'bg-red-100 text-red-500';
			} else if (importance < 6) {
				return 'bg-red-200 text-red-600';
			} else {
				return 'bg-red-300 text-red-700';
			}
		}
	}

	function getStatusColor(todoItem) {
		return todoItem.status ? 'text-green-600' : 'text-red-600';
	}
</script>

<div>
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
				<a href="/Classes" class="flex items-center p-1 font-bold"
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
		</ul>
	</nav>
</div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container mx-auto mt-8">
	<h2 class="text-3xl font-bold text-center mb-4">Todo List</h2>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="card ml-8 mt-4 w-1/4 hover:scale-105 bg-blue-300" on:click={openAddForm}>
		<div class="flex flex-row space-x-3 p-5">
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/plus-add-svgrepo-com.svg"
				alt="Dashboard Icon"
				class="h-5 mr-1 hover:rotate-12"
			/>
			<h1>Add a New Task</h1>
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
		{#each todo as todoItem}
			<div class="todo-item p-4 rounded-md shadow-md hover:shadow-lg {getColorClass(todoItem)}">
				<div class="flex justify-between mb-2">
					<span class="text-2xl font-bold">{todoItem.taskname}</span>
					<span class="text-base text-gray-500">{todoItem.importancescale}</span>
				</div>
				<div class="flex justify-between mb-2">
					<span class="text-base font-bold">{todoItem.deadline}</span>
				</div>
				<div class="flex justify-between mt-4">
					<button
						type="button"
						class="btn variant-outline-primary"
						on:click={() => viewDetails(todoItem)}>View Details</button
					>
					<div class="flex flex-row space-x-3">
						<form action="?/deleteTodo&id={todoItem.id}" method="POST">
							<button type="submit">
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/delete-svgrepo-com%20(1).svg"
									alt="Dashboard Icon"
									class="h-6 mr-1 hover:rotate-12"
								/>
							</button>
						</form>
						{#if todoItem.status === false}
							<form action="?/updateTodo&id={todoItem.id}" method="POST">
								<button type="submit">
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dialog-complete-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-1 hover:rotate-12"
									/>
								</button>
							</form>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	{#if selectedTodo}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity"
			on:click={closeModal}
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="{getColorClass(selectedTodo)} p-6 rounded-lg shadow-lg max-w-md w-full m-4"
				on:click|stopPropagation
			>
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">{selectedTodo.taskname}</h2>
					<button class=" text-lg" on:click={closeModal}>&times;</button>
				</div>

				<strong class="mb-2">Description:</strong>
				<p class="mb-4">{selectedTodo.description}</p>

				<strong class="mb-2">Deadline:</strong>
				<p class="mb-4">{selectedTodo.deadline}</p>

				<p class="mb-4">{selectedTodo.status ? 'Completed' : 'Pending'}</p>
				<div class="flex justify-end">
					<button class="btn variant-filled" on:click={closeModal}>Close</button>
				</div>
			</div>
		</div>
	{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if openForm}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity"
			on:click={closeform}
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="bg-sky-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4" on:click|stopPropagation>
				<form
					use:enhance
					action="?/upload"
					method="POST"
					on:submit={() => {
						closeform();
					}}
				>
					<label class="label text-left mb-3">
						<span>Task Name</span>

						<input
							class="input"
							type="text"
							id="taskname"
							name="taskname"
							bind:value={taskname}
							placeholder="Enter The name of your task"
						/>
					</label>
					<label class="label text-left">
						<span>Task Description</span>
						<textarea
							class="textarea"
							rows="4"
							placeholder="Your motivation..."
							id="description"
							name="description"
							bind:value={description}
						/>
					</label>
					<label class="label text-left mb-3">
						<span>Deadline</span>

						<input class="input" type="date" id="deadline" name="deadline" bind:value={deadline} />
					</label>
					<label class="label text-left mb-3">
						<span>On a scale from 1 to 10, how important is your task?</span>

						<input
							class="input"
							type="number"
							id="importancescale"
							name="importancescale"
							bind:value={importancescale}
						/>
					</label>
					<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
						Submit
					</button>
				</form>
			</div>
		</div>
	{/if}
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
</style>
