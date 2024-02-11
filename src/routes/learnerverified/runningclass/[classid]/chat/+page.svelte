<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	// import Message from './Message.svelte';
	export let data;
	const { classid } = $page.params;

	let { session, supabase, classNow, studclass, studentNow } = data;
	$: ({ session, supabase, classNow, studclass, studentNow } = data);
	let isSidebarOpen = false;

	let username = studentNow.name; // Get username from user session or login form
	let messages = [];
	let loading = true;
	let newMessage = '';
	let loadingOlderMessages = false;
	let oldestMessageId = null; // To track the oldest message loaded

	async function loadInitialMessages() {
		const { data: dt, error } = await supabase
			.from('classmessage')
			.select('*')
			.eq('classid', classid)
			.limit(8); // Adjust limit as needed

		if (dt) {
			messages = dt.reverse();
			oldestMessageId = dt[dt.length - 1]?.id;
			loading = false;
		} else if (error) {
			console.error('Error loading messages:', error.message);
		}
	}

	async function loadOlderMessages() {
		if (loadingOlderMessages || !oldestMessageId) return;
		loadingOlderMessages = true;

		const { data: dtt, error } = await supabase
			.from('classmessage')
			.select('*')
			.eq('classid', classid)
			.lt('id', oldestMessageId)

			.limit(5);

		if (dtt) {
			messages = [...dtt, ...messages];
			oldestMessageId = dtt[dtt.length - 1]?.id;
		}

		loadingOlderMessages = false;
	}
	function handleScroll(event) {
		const { scrollTop } = event.target;
		if (scrollTop === 0) {
			loadOlderMessages();
		}
	}

	function subscribeToNewMessages() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'classmessage' },
				(payload) => {
					console.log('Change received!', payload);
					// Update your messages array to reflect the new message
					// Ensure the new message is added in a way that doesn't duplicate it if you've already optimistically added it to the UI
					const newMessage = payload.new;
					if (!messages.some((message) => message.id === newMessage.id)) {
						messages = [newMessage, ...messages];
					}
				}
			)
			.subscribe();
	}

	async function sendMessage() {
		if (!newMessage.trim()) return;
		const { data, error } = await supabase
			.from('classmessage')
			.insert([{ username: username, body: newMessage, createdat: new Date(), classid: classid }]);
		if (error) {
			console.error('Error sending message:', error.message);
		}
		newMessage = ''; // Clear the input field
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

	// Close sidebar when clicking outside, for mobile responsiveness
	onMount(() => {
		loadInitialMessages();
		subscribeToNewMessages();
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
			<a href="/learnerverified/home/recent" class="flex items-center p-1 font-bold"
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
			<a href="/learnerverified/classes" class="flex items-center p-1 font-bold"
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
			<a href="/ll" class="flex items-center p-1 font-bold"
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
<main class="min-h-screen flex overflow-auto">
	<div
		class={`transform top-0 left-0 w-64 bg-white  fixed min-h-screen overflow-auto ease-in-out transition-all duration-300 z-30 ${
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
	<div class={`p-10 ${isSidebarOpen ? 'flex-1 p-6 flex-grow' : ''}`}>
		<!-- Your content here -->

		<!-- Chat Messages Display -->
		<div class="min-h-screen flex flex-col chat-window w-full">
			<!-- Messages List -->
			<div class="flex flex-col-reverse w-full space-y-2 overflow-y-auto" on:scroll={handleScroll}>
				{#each messages as message (message.id)}
					<div class="message {message.username === studentNow.name ? 'me' : 'other'}">
						<p class="timestamp">{formatTimestamp(message.createdat)}</p>
						<p><strong>{message.username}:</strong> {message.body}</p>
					</div>
				{/each}
				{#if loadingOlderMessages}
					<div class="loading-older-messages">Loading older messages...</div>
				{/if}
			</div>

			<!-- Input Form -->
			<form class="mb-2" on:submit|preventDefault={sendMessage}>
				<input type="text" bind:value={newMessage} placeholder="Type a message..." />
				<button type="submit">Send</button>
			</form>
		</div>
		<!-- <pre>{JSON.stringify(messages, null, 2)}</pre> -->
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
	/* Chat Window Styles */
	.chat-window {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		margin: 1rem;
		padding: 1rem;

		background: #f9f9f9;
	}

	.message {
		padding: 0.5rem;
		margin: 0.5rem 0;
		border-radius: 16px;
		background: #e0e0e0;
	}

	/* Differentiate sender and receiver */
	.message.me {
		background: #d1ffd7;
		align-self: flex-end; /* Aligns your messages to the right */
	}

	.message.other {
		background: #d1dfff;
		align-self: flex-start; /* Aligns other messages to the left */
	}

	.timestamp {
		font-size: 0.75rem;
		color: #888;
	}

	.loading-older-messages {
		text-align: center;
		padding: 0.5rem;
	}

	/* Input Form Styles */
	form {
		display: flex;
		gap: 0.5rem;
	}

	input {
		flex: 1;
		padding: 0.5rem;
		border-radius: 16px;
		border: 1px solid #ccc;
	}

	button {
		padding: 0.5rem 1rem;
		border-radius: 16px;
		border: none;
		background: #5cb85c;
		color: white;
		cursor: pointer;
	}
</style>
