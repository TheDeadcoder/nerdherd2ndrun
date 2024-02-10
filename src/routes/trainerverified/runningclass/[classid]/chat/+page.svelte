<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	export let data;

	let { session, supabase, classNow, studclass } = data;
	$: ({ session, supabase, classNow, studclass } = data);
	let isSidebarOpen = false;

	// Function to toggle sidebar visibility
	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	// Close sidebar when clicking outside, for mobile responsiveness
	onMount(() => {
		function handleOutsideClick(event) {
			if (!event.target.closest('.sidebar')) {
				isSidebarOpen = false;
			}
		}
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

		<LightSwitch class="mr-3" />
	</ul>
</nav>
<main class="min-h-screen flex overflow-auto">
	<div
		class={`transform top-0 left-0 w-64 bg-white dark:bg-gray-800 fixed min-h-screen overflow-auto ease-in-out transition-all duration-300 z-30 ${
			isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
		} lg:translate-x-0 lg:static lg:block`}
	>
		<div class="flex flex-col p-4 mt-4">
			<a href="/chat" class="sidebar-item active mb-2">
				<div class="flex flex-row">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/chat-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					Chat
				</div>
			</a>
			<a href="/chat" class="sidebar-item mb-2">
				<div class="flex flex-row">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/bell-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					Assignments
				</div>
			</a>
			<a href="/chat" class="sidebar-item mb-2">
				<div class="flex flex-row">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/certify-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					Credentials
				</div>
			</a>
			<a href="/chat" class="sidebar-item mb-2">
				<div class="flex flex-row">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/conference-live-video-svgrepo-com.svg?t=2024-02-09T19%3A53%3A53.776Z"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					Go Live
				</div>
			</a>
		</div>
	</div>
	<div class={`p-10 ${isSidebarOpen ? 'lg:pl-64 mt-4' : ''}`}>
		<!-- Your content here -->
		<pre>{JSON.stringify(classNow, null, 2)}</pre>
		<pre>{JSON.stringify(studclass, null, 2)}</pre>
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
		color: #000000; /* Black text for better contrast */
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
