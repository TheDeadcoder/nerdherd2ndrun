<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	let list: string[] = [];
	let tagsofPost: string[] = ['web development', 'javascript'];
	let tagsofPost1: string[] = ['web development', 'mobile app development', 'framework comparison'];
	let currentTile: number = 0;
	let searchBarShow: number = 0;

	$: calculateCountdown();

	export let data;

	let { session, supabase, blogwithTeacherName, studentNow, pbcontest } = data;
	$: ({ session, supabase, blogwithTeacherName, studentNow, pbcontest } = data);

	let nextDonationDate: Date = new Date('2024-1-23');
	let daysLeft: number = 0;
	let hoursLeft: number = 0;
	let minutesLeft: number = 0;
	let secondsLeft: number = 0;

	// function calculateCountdown() {
	// 	const now: Date = new Date();
	// 	const timeDifference: number = nextDonationDate - now; // Difference in milliseconds

	// 	daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	// 	hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	// 	minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
	// 	secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
	// }

	const sourceData = [
		{ name: 'Md. Ashraful Islam', point: 176 },
		{ name: 'Dr. Anindya Iqbal', point: 164 },
		{ name: 'Dr. Rifat Shahriar', point: 156 },
		{ name: 'Mr. Azizul Hakim', point: 140 }
	];
	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Contribution'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'point']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'point'])
		// Optional: A list of footer labels.
	};

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};
	const popupHover1: PopupSettings = {
		event: 'hover',
		target: 'popupHover1',
		placement: 'top'
	};
	let currentDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

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

	function navigateToRecent() {
		window.open('/studentblogs/recent', '_self');
	}
	function navigateToRecommended() {
		window.open('/studentblogs/recommended', '_self');
	}
	function navigateToFavourites() {
		window.open('/studentblogs/favourites', '_self');
	}
	function navigateToPopular() {
		window.open('/studentblogs/popular', '_self');
	}
	function navigateToSaved() {
		window.open('/studentblogs/saved', '_self');
	}

	async function loadInitialSaved() {
		let { data: savedblog, error } = await supabase
			.from('savedblog')
			.select('*')
			.eq('commonuserid', studentNow.id);

		for (let i = 0; i < savedblog.length; i++) {
			for (let j = 0; j < blogwithTeacherName.length; j++) {
				if (savedblog[i].blogid === blogwithTeacherName[j].id) {
					blogwithTeacherName[j].saved = true;
				}
			}
		}
	}
	function subscribesaved() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'savedblog' },
				(payload) => {
					const newSsaved = payload.new;
					// console.log('Ekahen asi');
					console.log(newSsaved);
					for (let i = 0; i < blogwithTeacherName.length; i++) {
						if (
							blogwithTeacherName[i].id === newSsaved.blogid &&
							newSsaved.commonuserid === studentNow.id
						) {
							blogwithTeacherName[i].saved = true;
						}
					}
				}
			)
			.subscribe();
	}
	// function subscribeDeleted() {
	// 	const channels = supabase
	// 		.channel('custom-insert-channel')
	// 		.on(
	// 			'postgres_changes',
	// 			{ event: 'DELETE', schema: 'public', table: 'savedblog' },
	// 			(payload) => {
	// 				const newSsaved = payload.new;
	// 				console.log('Ekahen asi');
	// 				console.log(newSsaved);
	// 			}
	// 		)
	// 		.subscribe();
	// }

	async function sendSaved(val) {
		const { data, error } = await supabase
			.from('savedblog')
			.insert([{ commonuserid: studentNow.id, blogid: val }]);
	}

	async function RemovedSaved(val) {
		const { error } = await supabase
			.from('savedblog')
			.delete()
			.eq('commonuserid', studentNow.id)
			.eq('blogid', val.id);
		val.saved = false;
		window.location.href = '/learnerverified/home/recent';
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

	async function endContest(classLive: any) {
		const { data, error } = await supabase
			.from('pbcontest')
			.update({ isover: true })
			.eq('id', classLive.id);

		window.open('/learnerverified/home/recent', '_self');
	}

	// Function to update countdown for each classLive
	let delcnttem = 0;
	function updateCountdown() {
		if (new Date(pbcontest.start) > new Date()) {
			pbcontest.countdown = calculateCountdown(pbcontest.start);
		} else {
			pbcontest.countdown = 0;
			if (pbcontest.isover === false && pbcontest.contestEndTime < new Date() && delcnttem === 0) {
				console.log('delete kore dite lagbe');
				endContest(pbcontest);
				delcnttem++;
			}
		}
	}
	let interval;
	onMount(() => {
		interval = setInterval(updateCountdown, 1000);
		updateCountdown();
		//calculateCountdown();
		//setInterval(calculateCountdown, 1000);
		loadInitialSaved();
		subscribesaved();
		//subscribeDeleted();
	});
	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/learnerlogin', '_self');
	};
</script>

<main>
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
						<a href="/learnerverified/library" class="flex items-center p-1 font-bold"
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
						<a href="/learnerverified/contest" class="flex items-center p-1 font-bold"
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
						<a href="/learnerverified/planner" class="flex items-center p-1 font-bold mr-3"
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/calendar-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-5 mr-1 hover:rotate-12"
							/>
							Planner</a
						>
					</li>

					<div use:popup={popupClick}>
						<Avatar src={studentNow.image} width="w-10" rounded="rounded-full" />
					</div>

					<div data-popup="popupClick" class="h-32 absolute">
						<ul class="text-lg font-semibold bg-sky-300 ml-0">
							<li class="mt-2 mb-3 p-2">
								<a href="/learnerverified/profile" class="flex items-center font-bold"
									><img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/user-person-profile-block-account-circle-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-7 mr-1 hover:rotate-12"
									/>
									Profile</a
								>
							</li>
						</ul>
					</div>
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
			<TabGroup class="w-full h-14 bg-[#e6f5ff]  mt-2  flex justify-center">
				<Tab
					bind:group={currentTile}
					name="tab1"
					value={0}
					class="hover:scale-105 hover:bg-[#c8e4f7]"
				>
					
					<a href="/learnerverified/home/recent" class="flex items-center p-1 font-bold mr-3">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/clock-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-10 w-10 hover:rotate-12 hover:scale-105"
						/>
						Recent
					</a>
				</Tab>
				<Tab
					bind:group={currentTile}
					name="tab2"
					value={1}
					class="hover:scale-105 hover:bg-[#c8e4f7]"
				>
					<a href="/learnerverified/home/recommended" class="flex items-center p-1 font-bold mr-3"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/recommended-like-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-10 w-10 hover:rotate-12 hover:scale-105"
						/>
						Recommended
					</a>
				</Tab>

				<Tab
					bind:group={currentTile}
					name="tab3"
					value={2}
					class="hover:scale-105 hover:bg-[#c8e4f7]"
				>
					<a href="/learnerverified/home/popular" class="flex items-center p-1 font-bold mr-3">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/fire-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-10 w-10 hover:rotate-12 hover:scale-105"
						/>
						Popular
					</a>
				</Tab>
				<Tab
					bind:group={currentTile}
					name="tab3"
					value={3}
					class="hover:scale-105 hover:bg-[#c8e4f7]"
				>
					<a href="/learnerverified/home/favourites" class="flex items-center p-1 font-bold mr-3"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/star-gold-orange-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-10 w-10 hover:rotate-12 hover:scale-105"
						/>
						Favourites
					</a>
				</Tab>
				<Tab
					bind:group={currentTile}
					name="tab3"
					value={4}
					class="hover:scale-105 hover:bg-[#c8e4f7]"
				>
					<a href="/learnerverified/home/saved" class="flex items-center p-1 font-bold mr-3"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-save-the-document-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-10 w-10 hover:rotate-12 hover:scale-105"
						/>
						Saved
					</a>
				</Tab>
				<Tab
					bind:group={currentTile}
					name="tab3"
					value={5}
					class="hover:scale-105 hover:bg-[#c8e4f7]"
				>
					<button
						class="flex items-center justify-center p-2 font-semibold"
						on:click={() => (searchBarShow = searchBarShow ^ 1)}
					>
						<img
							src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110 h-6 w-6 m-1"
							alt="Search Icon"
							style="vertical-align: middle;"
						/>
						Search
					</button>
				</Tab>
				<svelte:fragment slot="panel"></svelte:fragment>
			</TabGroup>
		</div>
	</div> -->

	<div class="relative z-10 w-full">
		<div class="absolute w-full flex justify-center">
			<div
				class={searchBarShow
					? 'p-2 bg-[#ebf2f5]  h-[150px] flex items-center rounded-lg'
					: 'hidden'}
			>
				<div class=" flex flex-row mb-1 justify-center">
					<div class="flex flex-row">
						<div class="md:w-1/3 lg:w-1/3 mr-3 bg-white">
							<label class="label">
								<span class="pl-1">Search By Title</span>
								<input
									class="input border-0 border-b-[1px] bg-red"
									type="text"
									placeholder="Enter Name of the Article"
								/>
							</label>
						</div>
						<div class="md:w-1/3 lg:w-1/3 mr-3 bg-white">
							<label class="label">
								<span class="pl-1">Search By Author</span>
								<input
									class="input border-0 border-b-[1px]"
									type="text"
									placeholder="Enter Name of the Author"
								/>
							</label>
						</div>
						<div class=" md:w-1/3 lg:w-1/3 mr-3 bg-white">
							<label class="label">
								<span class="">Search By Tag</span>
								<InputChip
									bind:value={list}
									class="input border-0 border-b-[1px] bg-slate-200"
									name="chips"
									placeholder="Enter Tags..."
								/>
							</label>
						</div>
					</div>
					<div class="w-1/6 mt-6 border-2 h-11">
						<button
							class=" btn font-bold text-[18px] py-4 bg-[#45d588] rounded-sm shadow-md hover:bg-[#15b141] hover:text-[19px] hover:shadow-lg w-[100%] h-[100%]"
						>
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								alt="Search Icon"
								width="20"
								height="20"
								style="vertical-align: middle;"
							/>
							Search
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="w-full min-h-screen flex flex-row">
		<div class="w-3/4 p-6">
			<div class="mt-10 ml-4 mr-4">
				{#each blogwithTeacherName as currBlog}
					<div class="mb-14">
						<div class="flex flex-row space-x-3">
							<a href="/viewonly/teacher/{currBlog.currTeacher.id}" class="flex flex-row space-x-2">
								<Avatar src={currBlog.currTeacher.image} width="w-9" rounded="rounded-full" />
								<h1 class="text-lg">{currBlog.currTeacher.name}</h1>
							</a>
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/green-circle-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-6"
							/>
							<h1 class="text-lg">{formatDate(currBlog.createdat)}</h1>

							<img
								src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/clock-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-6"
							/>
							<h1 class="text-lg">{currBlog.timetoread} minutes</h1>
						</div>
						<a href="/commonverified/article/{currBlog.id}" class="flex flex-col mt-4">
							<h1 class="text-2xl font-extrabold">{currBlog.title}</h1>
							<p class="mt-2">
								{currBlog.description.slice(0, 100)}...
							</p>
						</a>
						<div class="mt-6 flex flex-row justify-between">
							<div class="text-left flex flex-row space-x-2">
								{#each currBlog.tags as tag}
									<div class="chipi flex flex-row space-x-1">
										<img
											src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/pin-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-6"
										/>

										<p>{tag}</p>
									</div>
								{/each}
							</div>
							{#if currBlog.saved}
								<button class="text-left space-x-3 mr-6" on:click={() => RemovedSaved(currBlog)}>
									<img
										src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/save-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-7 mr-1"
									/>
								</button>
							{:else}
								<button class="text-left space-x-3 mr-6" on:click={() => sendSaved(currBlog.id)}>
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-7 mr-1"
									/>
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="w-fit overflow-hidden mt-6">
			<div class=" shadow-md border-2 mb-4">
				<div class="p-4 pb-0 mb-0">
					<div class="flex flex-roe">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/championship-trophy-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-9 w-9 mr-1 hover:rotate-12"
						/>
						<h1 class="text-2xl font-bold">Upcoming Contest!</h1>
					</div>
				</div>
				<section class="p-4">
					<div class="card variant-glass-secondary p-2 mb-2">
						<div class="flex flex-col items-center justify-center">
							<h1 class="text-xl font-semibold"><u>{pbcontest.title}</u></h1>
							<a
								href="/viewonly/teacher/{pbcontest.teacherid}"
								class="flex flex-row space-x-2 mt-3"
							>
								<img
									src={pbcontest.teacher.image}
									alt="Dashboard Icon"
									class="h-7 w-7 mr-1 hover:rotate-12 rounded-full"
								/>
								<p class="font-semibold text-lg">
									{pbcontest.teacher.name}
								</p>
							</a>
							<p class="flex items-center justify-center">
								{pbcontest.countdown.days}d : {pbcontest.countdown.hours}h : {pbcontest.countdown
									.minutes}m : {pbcontest.countdown.seconds}s
							</p>
							<a href="/learnerverified/contest"> <u>Register Now</u> </a>
						</div>
					</div>
				</section>
				<footer class="mt-0 pt-0 mb-2 mr-2 hover:scale-105">
					<a href="/" class="flex flex-row items-end justify-end p-1 font-bold">
						<h4 class="mr-2">See all</h4>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-send-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 w-6"
						/>
					</a>
				</footer>
			</div>
			<div class=" shadow-md border-2">
				<header class="card-header">
					<div class="flex flex-roe">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/medal-gold-winner-2-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-9 w-9 mr-1 hover:rotate-12"
						/>
						<h1 class="text-2xl font-bold">Top Authors!</h1>
					</div>
				</header>
				<section class="p-4">
					<Table source={tableSimple} />
				</section>
				<footer class="card-footer mb-2">
					<a href="/" class="flex flex-row items-end justify-end p-1 font-bold">
						<h4 class="mr-2 hover:scale-110">See all</h4>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-send-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 w-6 hover:scale-125"
						/>
					</a>
				</footer>
			</div>
		</div>
	</div>
	<!-- <pre>{JSON.stringify(studentNow, null, 2)}</pre>
	<pre>{JSON.stringify(blogwithTeacherName, null, 2)}</pre> -->
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
