<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	export let data;

	let { session, supabase, todo } = data;
	$: ({ session, supabase, todo } = data);

	function getColorClass(todoItem) {
		console.log(todoItem.status);
		if (todoItem.status) {
			return 'bg-green-200 text-green-600';
		} else {
			const importance = parseInt(todoItem.importancescale);
			if (importance < 3) {
				return 'bg-red-100 text-red-500';
			} else if (importance < 5) {
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
<div class="container mx-auto mt-8">
	<h2 class="text-3xl font-bold text-center mb-4">Todo List</h2>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
		{#each todo as todoItem}
			<div class="todo-item p-4 rounded-md shadow-md hover:shadow-lg {getColorClass(todoItem)}">
				<div class="flex justify-between mb-2">
					<span class="text-2xl font-bold">{todoItem.taskname}</span>
					<span class="text-base text-gray-500">{todoItem.importancescale}</span>
				</div>
				<div class="flex justify-between mb-2">
					<span class="text-2xl font-bold">{todoItem.taskname}</span>
					<span class="text-base text-gray-500">{todoItem.importancescale}</span>
				</div>
				<div class="flex items-center">
					<span class="status {getStatusColor(todoItem)} mr-2"
						>{todoItem.status ? 'Completed' : 'Pending'}</span
					>
				</div>
			</div>
		{/each}
	</div>
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
