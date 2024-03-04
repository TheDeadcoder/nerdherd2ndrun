<script lang='ts'>
	// @ts-nocheck
    import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import { Ratings, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import {clickOutside} from '../../../stores/clickOutside'

	export let data;
	let value = { current: 0, max: 10 };
	function iconClick(event: CustomEvent<{index:number}>): void {
		value.current = event.detail.index;
		
	}

	let { session, supabase, todo } = data;
	$: ({ session, supabase, todo } = data);

	$: console.log("value",value.current)

	let selectedTodo = null;

	let taskname;
	let description;
	let deadline;
	let importancescale;

	$: importancescale = value.current
	$: console.log("import",importancescale)

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
				return 'bg-red-100 text-red-500 light:bg-[#]';
			} else if (importance < 6) {
				return 'bg-red-200 text-red-600';
			} else {
				return 'bg-red-300 text-red-700';
			}
		}
	}
	const handleClickOutside = (e)=>{
         closeform()
    }


	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	function getStatusColor(todoItem) {
		return todoItem.status ? 'text-green-600' : 'text-red-600';
	}

	function handleSvgClick(event,index) {
    	// const index = parseInt(event.target.dataset.index);
		importancescale = index+1
    	console.log("Clicked on div #" + (index + 1));
		event?.stopPropagation
  	}
	  let sortClicked = writable(true ); // Make sortClicked a writable store

	function sortTodos() {
		sortClicked.update(value => !value); // Toggle the value of sortClicked
	}

	function sortTodoItems(todoItems) {
    let sorted = [];
    const unsubscribe = sortClicked.subscribe(value => {
        if (value) {
            sorted = [...todoItems].sort((a, b) => {
                // First, check if both tasks have the same completion status
                if (a.status === b.status) {
                    // If both tasks are incomplete, sort them based on their importance scale
                    if (!a.status) {
                        return b.importancescale - a.importancescale;
                    }
                    // If both tasks are completed, maintain their relative order
                    else {
                        return new Date(b.deadline) - new Date(a.deadline);
                    }
                }
                // Incomplete tasks come before completed ones
                else {
                    return a.status ? 1 : -1;
                }
            });
        } else {
            // Return todo items as it is
            sorted = [...todoItems];
        }
    });
    unsubscribe(); 
	
    return sorted;
}


</script>

<!-- <div>
	<div class="navbar">
		<nav class="appbar">
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
					<a href="/trainerverified/compete" class="flex items-center p-1 font-bold"
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
					<Avatar
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/avro.jpg"
						width="w-10"
						rounded="rounded-full"
					/>
				</div>

				<div data-popup="popupClick" class="h-32 absolute">
					<ul class="text-lg font-semibold bg-sky-300 ml-0">
						<li class="mt-2 mb-3 p-2">
							<a href="/trainerverified/profile" class="flex items-center font-bold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/user-person-profile-block-account-circle-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="h-7 mr-1 hover:rotate-12"
								/>
								Profile</a
							>
						</li>
						<li class="mb-2 p-2">
							<a href="/library" class="flex items-center font-bold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="h-7 mr-1 hover:rotate-12"
								/>
								Logout</a
							>
						</li>
					</ul>
				</div>
			</ul>
		</nav>
		
		
	</div>
</div> -->

<div class="container mx-auto min-h-screen dark:bg-[#070707]">
	<!-- svelte-ignore missing-declaration -->
	
	<h2 class="text-3xl font-bold p-3 px-6 light:text-[#f0f0f0]">Todo List</h2>
	<div class="flex justify-between items-center mb-2"> <!-- Added flex container with justify-between -->
		<div class="card mx-9 my-4 hover:scale-105 border-2 light:bg-[#141414]" on:click={openAddForm}>
			<div class="flex flex-row items-center space-x-3 p-5">
				<img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/plus-add-svgrepo-com.svg" alt="Dashboard Icon" class="h-5 mr-1 hover:rotate-12" />
		    	<h1 class="text-lg light:text-[#f0f0f0] font-semibold">Add New Task</h1>
			</div>
		</div>
	</div>

	<hr>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8">
		{#each sortTodoItems(todo) as todoItem}
			<div class="todo-item p-3 py-1 m-1 mr-3 rounded-md shadow-md hover:shadow-lg {getColorClass(todoItem)}">
			<!-- Your existing code for rendering todoItem goes here -->
				<div class="flex justify-between">
					<span class="text-xl font-bold">{todoItem.taskname}</span>
					<span class="text-base text-gray-500">{todoItem.importancescale}</span>
				</div>
				<div class="flex justify-between  mb-1">
					<div>
						<p class="text-base font-semibold">{todoItem.deadline}</p>
					</div>
				</div>
				<div class="flex justify-between items-center">
					<div class="flex flex-row">
						<form action="?/deleteTodo&id={todoItem.id}" method="POST">
							<button type="submit">
								<img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/delete-svgrepo-com%20(1).svg" alt="Dashboard Icon" class="h-5 mr-2 hover:rotate-12"/>
							</button>
						</form>
						{#if todoItem.status === false}
							<form action="?/updateTodo&id={todoItem.id}" method="POST">
								<button type="submit">
									<img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dialog-complete-svgrepo-com.svg" alt="Dashboard Icon" class="h-5 mr-1 hover:rotate-12"/>
								</button>
							</form>
						{/if}
					</div>
					<div class="mb-1">
						<button type="button" class="btn text-gray-600 bg-white p-1 bg-opacity-40 rounded-lg" on:click={() => viewDetails(todoItem)}><span class=" hover-underline-animation">View Details</span></button>
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
			class="fixed inset-0 bg-gray-600 bg-opacity-60 flex justify-center items-center z-50 transition-opacity"
			
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="bg-[#e1edf7] p-6 rounded-lg shadow-lg max-w-md w-full m-4 light:text-[#e1e1e1] light:bg-[#212020]" on:click|stopPropagation use:clickOutside on:click_outside={handleClickOutside}>
				<form
					use:enhance
					action="?/upload"
					method="POST"
					on:submit={() => {
						closeform();
					}}
				>
					<label class="label text-left mb-3">
						<span class="font-semibold">Task Name</span>

						<input
							class="input border-2 rounded-lg placeholder:font-bold placeholder:text-gray-600 placeholder:text-base light:placeholder:text-[#ffffff9e]"
							type="text"
							id="taskname"
							name="taskname"
							bind:value={taskname}
							placeholder="Enter The name of your task"
						/>
					</label>
					<label class="label text-left">
						<span class="font-semibold">Task Description</span>
						<textarea
							class="textarea border-2 rounded-lg placeholder:font-bold placeholder:text-gray-600 placeholder:text-base light:placeholder:text-[#ffffff9e]"
							rows="4"
							placeholder="Your motivation..."
							id="description"
							name="description"
							bind:value={description}
						/>
					</label>
					<label class="label text-left mb-3">
						<span class="font-semibold">Deadline</span>
						<input class="input border-2 rounded-lg placeholder:font-bold placeholder:text-gray-600 placeholder:text-base light:text-[#ffffff]" type="date" id="deadline" name="deadline" bind:value={deadline} />
					</label>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label text-left mb-3">
						<span class="font-semibold">Scale priority from 1 to 10</span>
						<input class="hidden" type="number" id="importancescale" name="importancescale" bind:value={importancescale}>
					</label>
					
					<div class="flex justify-center" >
						{#each Array.from({ length: 10 }, (_, i) => i) as index}
						  {#if index < importancescale}
						  		<div data-index={index} class="flex flex-col">
									<div><svg on:click={()=>importancescale=index+1} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-point-filled" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" /></svg></div>
									<div>{index+1}</div>
								</div> 
						  {:else}
						  		<div data-index={index} class="flex flex-col justify-center items-center">
									<div><svg on:click={()=>importancescale=index+1} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-point" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /></svg></div>
									<div>{index+1}</div>
								</div>
						  {/if}
						{/each}
					</div>
						
					<button type="submit" class="font-bold text-lg  p-3 m-2 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/3 text-center light:text-[#e1e1e1] light:bg-[#3b6f8e]"					>
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
	.navbar{
		background-color: rgb(188, 223, 253);

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
	.hover-underline-animation {
		display: inline-block;
		position: relative;
		color: #000000;
	}

	.hover-underline-animation::after {
		content: '';
		position: absolute;
		width: 100%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #000000;
		transform-origin: bottom right;
		transition: transform 0.25s ease-out;
	}

	.hover-underline-animation:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
</style>