<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const { classid } = $page.params;
	// import Message from './Message.svelte';
	export let data;

	let likeval = 0;
	let dislikeval = 0;
	let reacted = false;
	let reactionval = false;

	let { session, supabase, articleNow, teacherNow, commonuserNow } = data;
	$: ({ session, supabase, articleNow, teacherNow, commonuserNow } = data);

	let values = articleNow.tags.split(',');

	let username = teacherNow.name; // Get username from user session or login form
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
	async function fetchContent(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.text();
		} catch (e) {
			console.error('Failed to fetch content:', e);
			return 'Failed to load content';
		}
	}
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/trainerlogin', '_self');
	};
	async function loadInitialLikeandDislike() {
		const { data: dtt, error: err } = await supabase
			.from('reaction')
			.select('*')
			.eq('blogid', articleNow.id);

		if (err) console.log('failed to load');
		dtt.forEach((reaction) => {
			if (reaction.value) {
				likeval++;
			} else {
				dislikeval++;
			}

			if (reaction.userid === commonuserNow.id) {
				reacted = true;
				reactionval = reaction.value;
			}
		});
	}

	// function subscribeToReactionState() {
	// 	const channels = supabase
	// 		.channel('custom-insert-channel')
	// 		.on('postgres_changes', { event: '*', schema: 'public', table: 'reaction' }, (payload) => {
	// 			console.log('Change received!', payload);
	// 			// Update your messages array to reflect the new message
	// 			// Ensure the new message is added in a way that doesn't duplicate it if you've already optimistically added it to the UI
	// 			const newReaction = payload.new;
	// 			console.log(newReaction);
	// 			// if (!messages.some((message) => message.id === newMessage.id)) {
	// 			// 	messages = [newMessage, ...messages];
	// 			// }
	// 		})
	// 		.subscribe();
	// }
	function subscribeToReactionState() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'reaction' }, (payload) => {
				const newReaction = payload.new;
				likeval = 0;
				dislikeval = 0;
				if (newReaction.blogid === articleNow.id) {
					if (newReaction.value) {
						likeval++;
					} else {
						dislikeval++;
					}
					if (newReaction.userid === commonuserNow.id) {
						reacted = true;
						reactionval = newReaction.value;
					}
				}
			})
			.subscribe();
	}

	async function sendReaction(value) {
		reactionval = value;
		const { data, error: err } = await supabase
			.from('reaction')
			.insert([{ userid: commonuserNow.id, blogid: articleNow.id, value: reactionval }]);
		if (err) {
			console.error('Error sending Reaction:', err.message);
		} else reacted = true;
	}
	async function updateReaction(value) {
		reactionval = value;
		const { data, error: err } = await supabase
			.from('reaction')
			.update({ value: reactionval })
			.eq('userid', commonuserNow.id);

		if (err) {
			console.error('Error Updating Reaction:', err.message);
		} else reacted = true;
	}
	async function deleteReaction() {
		const { error: err } = await supabase.from('reaction').delete().eq('userid', commonuserNow.id);

		if (err) {
			console.error('Error deteting Reaction:', err.message);
		} else reacted = false;
	}

	onMount(async () => {
		loadInitialLikeandDislike();
		subscribeToReactionState();
		articleNow.fetchedContent = await fetchContent(articleNow.content);
	});
</script>

<main class="bg-[#f4f6f7]">
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
				{#if commonuserNow.istrainer === true}
					<a href="/trainerverified/library" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/book-opened-svgrepo-com%20(1).svg"
							alt="Dashboard Icon"
							class="h-5 mr-1 hover:rotate-12"
						/>
						Library</a
					>
				{:else}
					<a href="/learnerverified/library" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/book-opened-svgrepo-com%20(1).svg"
							alt="Dashboard Icon"
							class="h-5 mr-1 hover:rotate-12"
						/>
						Library</a
					>{/if}
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

			<!-- <LightSwitch class="mr-3" /> -->

			<li>
				<button on:click={handleSignOut}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-7 mr-1 hover:rotate-12"
					/>
				</button>
			</li>
		</ul>
	</nav>
	<div class="flex flex-col ml-4 mr-4 mt-10 items-center">
		<h1 class="font-extrabold text-5xl">
			{articleNow.title}
		</h1>
		<p class="text-2xl font-light mt-2 ml-24 mr-24">
			{articleNow.description}
		</p>
		<a href="/viewonly/teacher/{teacherNow.id}" class="flex flex-row space-x-4 mt-4 text-left">
			<Avatar src={teacherNow.image} width="w-12" />
			<h3 class="font-semibold text-xl">
				{teacherNow.name}
			</h3>
		</a>
		<div class="flex flex-row mt-7 space-x-12 text-left">
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/299092_calendar_icon.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{formatDate(articleNow.createdat)}
				</p>
			</div>
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/stopwatch-svgrepo-com.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{articleNow.timetoread} minutes read
				</p>
			</div>
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/clap-svgrepo-com.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{likeval} Liked
				</p>
			</div>
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/comment-2-svgrepo-com.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{likeval} Commented
				</p>
			</div>
		</div>
		<div class="mt-4 flex flex-row space-x-3 text-sm">
			{#each values as value}
				<div class="chipi">
					<span>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/pin-svgrepo-com.svg"
							alt="User "
							class="w-4 h-4 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</span>
					<span>{value}</span>
				</div>
			{/each}
		</div>

		<div class="mt-16 ml-24 mr-24">
			{#if articleNow.fetchedContent}
				{@html articleNow.fetchedContent}
			{:else}
				<section class="card w-full">
					<div class="p-4 space-y-4">
						<div class="placeholder" />
						<div class="grid grid-cols-3 gap-8">
							<div class="placeholder" />
							<div class="placeholder" />
							<div class="placeholder" />
						</div>
						<div class="grid grid-cols-4 gap-4">
							<div class="placeholder" />
							<div class="placeholder" />
							<div class="placeholder" />
							<div class="placeholder" />
						</div>
					</div>
				</section>
			{/if}
		</div>
		<div class="mt-6 flex flex-row space-x-8">
			{#if reacted}
				{#if reactionval}
					<button on:click={() => deleteReaction()}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/like-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
					<button on:click={() => updateReaction(false)}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dislike-left-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
				{:else}
					<button on:click={() => updateReaction(true)}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/like-right-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
					<button on:click={() => deleteReaction()}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dislike-svgrepo-com.svg"
							alt="User "
							class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
						/>
					</button>
				{/if}
			{:else}
				<!-- Implement the sendreaction logic here -->
				<button on:click={() => sendReaction(true)}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/like-right-svgrepo-com.svg"
						alt="User "
						class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
					/>
				</button>
				<button on:click={() => sendReaction(false)}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dislike-left-svgrepo-com.svg"
						alt="User "
						class="w-12 h-12 mr-2 hover:scale-105 hover:rotate-12"
					/>
				</button>
			{/if}
		</div>
	</div>
	<pre>{JSON.stringify(articleNow, null, 2)}</pre>
	<pre>{JSON.stringify(teacherNow, null, 2)}</pre>
	<pre>{JSON.stringify(commonuserNow, null, 2)}</pre>
</main>

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
	.white-text {
		color: red;
	}
	.company-name {
		border: 1px solid black;
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 0.5rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
	.navbar {
		overflow: hidden;
		position: absolute; /* Set the navbar to fixed position */
		top: 0; /* Position the navbar at the top of the page */
		width: 100%; /* Full width */
		z-index: 5;
		background-color: rgb(188, 223, 253);
	}

	.logo-container {
		display: flex;
		align-items: center;
	}
	.chipi {
		background-color: #c1d4e3;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
</style>
