<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
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

	$: calculateCountdown();

	let nextDonationDate: Date = new Date('2024-1-23');
	let daysLeft: number = 0;
	let hoursLeft: number = 0;
	let minutesLeft: number = 0;
	let secondsLeft: number = 0;

	function calculateCountdown() {
		const now: Date = new Date();
		const timeDifference: number = nextDonationDate - now; // Difference in milliseconds

		daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
	}

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
	onMount(() => {
		calculateCountdown();
		setInterval(calculateCountdown, 1000);
	});
</script>

<main>
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
					<a href="/studentblogs/recent" class="flex items-center p-1 font-bold"
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
					<a href="/library" class="flex items-center p-1 font-bold mr-3"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/championship-trophy-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-5 mr-1 hover:rotate-12"
						/>
						Compete</a
					>
				</li>

				<LightSwitch class="mr-3" />
				<div use:popup={popupClick}>
					<Avatar
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/avro.jpg"
						width="w-10"
						rounded="rounded-full"
					/>
				</div>

				<div data-popup="popupClick">
					<ul class="text-lg font-semibold bg-sky-300 ml-0">
						<li class="mt-2 mb-3">
							<a href="/library" class="flex items-center font-bold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/user-person-profile-block-account-circle-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="h-7 mr-1 hover:rotate-12"
								/>
								Profile</a
							>
						</li>
						<li class="mb-2">
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
	<div class="w-full h-screen flex flex-row">
		<AppRail class="w-fit overflow-hidden">
			<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
				<a
					href="/learnerverified/home/recent"
					class="flex flex-col items-center justify-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/clock-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Recent
				</a>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
				<a
					href="/learnerverified/home/recommended"
					class="flex flex-col items-center justify-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/recommended-like-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Recommended
				</a>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
				<a
					href="/learnerverified/home/popular"
					class="flex flex-col items-center justify-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/fire-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Popular
				</a>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-4" value={3} title="tile-4">
				<a
					href="/learnerverified/home/favourites"
					class="flex flex-col items-center justify-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/star-gold-orange-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Favourites
				</a>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-5" value={4} title="tile-5">
				<a
					href="/learnerverified/home/saved"
					class="flex flex-col items-center justify-center p-1 font-bold"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-save-the-document-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Saved
				</a>
			</AppRailTile>

			<!-- --- -->
			<svelte:fragment slot="trail">
				<a href="/accessType" class="flex flex-col items-center justify-center p-1 font-bold mb-24"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/power-button-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-10 w-10 hover:rotate-12 hover:scale-105"
					/>
					Logout
				</a>
			</svelte:fragment>
		</AppRail>
		<div class="w-3/4 p-6">
			<div class=" flex flex-row">
				<div class="flex flex-row">
					<div class="md:w-1/3 lg:w-1/3 mr-3">
						<label class="label">
							<span class="font-semibold">Search By Title</span>
							<input class="input" type="text" placeholder="Enter Name of the Article" />
						</label>
					</div>
					<div class="md:w-1/3 lg:w-1/3 mr-3">
						<label class="label">
							<span class="font-semibold">Search By Author</span>
							<input class="input" type="text" placeholder="Enter Name of the Author" />
						</label>
					</div>
					<div class=" md:w-1/3 lg:w-1/3 mr-3">
						<label class="label">
							<span class="font-semibold">Search By Tag</span>
							<InputChip bind:value={list} name="chips" placeholder="Enter Tags..." />
						</label>
					</div>
				</div>
				<div class="w-1/6 mt-6">
					<button class="btn font-semibold bg-emerald-300 hover:bg-emerald-500">
						<img
							src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110 mr-2"
							alt="Search Icon"
							width="20"
							height="20"
							style="vertical-align: middle;"
						/>
						Search
					</button>
				</div>
			</div>
			<div class="mt-10 ml-4 mr-4">
				<div class="mb-14">
					<div class="flex flex-row space-x-3">
						<Avatar
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/ashrafulsir.jpg"
							width="w-9"
							rounded="rounded-full"
						/>
						<h1 class="text-lg">Md Ashraful Islam</h1>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/green-circle-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6"
						/>
						<h1 class="text-lg">{currentDate}</h1>
					</div>
					<a href="/studentblogs/id" class="flex flex-col mt-4">
						<h1 class="text-2xl font-extrabold">15 Killer Websites for Web Developers</h1>
						<p class="mt-2">
							99.9% of developers don’t know all of them. — As a front-end development engineer, you
							must have used many tools to increase your productivity. They can be websites,
							documentation, or a JavaScript...
						</p>
					</a>
					<div class="mt-6 flex flex-row justify-between">
						<div class="text-left space-x-3">
							{#each tagsofPost as tag}
								<span class="chip variant-filled">{tag}</span>
							{/each}
						</div>

						<div class="text-left space-x-3 mr-6">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-7 mr-1"
								use:popup={popupHover1}
							/>
							<div class="card p-4 variant-filled-secondary" data-popup="popupHover1">
								<p>Save Post</p>
								<div class="arrow variant-filled-secondary" />
							</div>
						</div>
					</div>
				</div>

				<div>
					<div class="flex flex-row space-x-3">
						<Avatar
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/410571370_664464969186025_5000311216694977499_n.jpg"
							width="w-9"
							rounded="rounded-full"
						/>
						<h1 class="text-lg">Ms Mashiat Mushtaq</h1>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/green-circle-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6"
						/>
						<h1 class="text-lg">{currentDate}</h1>
					</div>
					<a href="/studentblogs/id" class="flex flex-col mt-4">
						<h1 class="text-2xl font-extrabold">React Native vs. Flutter: 2023</h1>
						<p class="mt-2">
							Almost two years later, there is a CLEAR winner — Almost two years ago, I wrote a blog
							post comparing React Native and Flutter at a time when I was still somewhat new to
							Flutter. I had spoken very highly of...
						</p>
					</a>
					<div class="mt-6 flex flex-row justify-between">
						<div class="text-left space-x-3">
							{#each tagsofPost1 as tag}
								<span class="chip variant-filled">{tag}</span>
							{/each}
						</div>

						<div class="text-left space-x-3 mr-6">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-7 mr-1"
								use:popup={popupHover1}
							/>
							<div class="card p-4 variant-filled-secondary" data-popup="popupHover1">
								<p>Save Post</p>
								<div class="arrow variant-filled-secondary" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-fit overflow-hidden mt-6">
			<div class="card variant-glass-tertiary">
				<header class="card-header">
					<div class="flex flex-roe">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/championship-trophy-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-9 w-9 mr-1 hover:rotate-12"
						/>
						<h1 class="text-2xl font-bold">Upcoming Contest!</h1>
					</div>
				</header>
				<section class="p-4">
					<div class="card variant-glass-secondary p-4 mb-3">
						<div class="flex flex-col items-center justify-center">
							<h1 class="text-xl font-semibold"><u>NerdHerd Math Quiz</u></h1>
							<h2>Writer: Md. Ashraful Islam</h2>
							<h2>Before contest: {hoursLeft}:{minutesLeft}:{secondsLeft}</h2>
							<a href="/"> <u>Register Now</u> </a>
						</div>
					</div>
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
			<div class="card variant-glass-surface">
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
