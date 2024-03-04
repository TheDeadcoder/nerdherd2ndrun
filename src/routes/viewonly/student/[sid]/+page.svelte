<script lang="ts">
	import { onMount } from 'svelte';
	export let data;
	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);

	let chart = null;

	let { session, supabase, studentNow, studentqual, performanceWithContest } = data;
	$: ({ session, supabase, studentNow, studentqual, performanceWithContest } = data);
	function createChart(labels, data, maxPosition) {
		const ctx = document.getElementById('performanceChart').getContext('2d');
		if (chart) {
			chart.destroy();
		}
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Contest Position',
						data,
						fill: false,
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					}
				]
			},
			options: {
				scales: {
					y: {
						reverse: true, // Reverse the scale to show 1 as the topmost position
						max: maxPosition,
						title: {
							display: true,
							text: 'Position'
						}
					}
				}
			}
		});
	}

	onMount(async () => {
		// Assume `fetchPerformanceData` is a function that fetches data from Supabase
		// Sort the performances by starttime
		const sortedPerformances = performanceWithContest.sort(
			(a, b) => new Date(a.contest.start) - new Date(b.contest.start)
		);
		// Prepare the datasets for Chart.js
		const labels = sortedPerformances.map((performance) =>
			new Date(performance.contest.start).toLocaleDateString()
		);
		const positions = sortedPerformances.map((performance) => performance.result);
		// Find the worst performance for setting the chart's scale
		const maxPosition = Math.max(...positions);
		createChart(labels, positions, maxPosition);
	});
</script>

<div>
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
				<!-- <div use:popup={popupClick}>
					<Avatar
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/avro.jpg"
						width="w-10"
						rounded="rounded-full"
					/>
				</div> -->

				<!-- <div data-popup="popupClick" class="h-32 absolute">
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
				</div> -->
			</ul>
		</nav>
	</div>

	<div class="min-h-screen flex justify-center py-5 dark:bg-[#212020] dark:text-[#e1e1e1]">
		<div class="grid grid-cols-[30%_auto] w-3/4">
			<div class=" self-start sticky top-[105px] overflow-auto">
				<div class="flex justify-center">
					<img src={studentNow.image} alt="" class="border-2 border-black rounded-full h-[200px]" />
				</div>
				<div class="p-3 m-3">
					<p class="text-3xl font-semibold">{studentNow.name}</p>
					<p class="font-thin">{studentNow.email}</p>
					<p class="font-thin">{studentNow.mobile}</p>
					<p class="font-thin">{studentNow.address}</p>
					<div class="mt-3">
						<p class="">{studentNow.about}</p>
					</div>
				</div>
			</div>

			<div class="m-4">
				<p class="font-semibold text-[18px]">Academic Background:</p>
				{#each studentqual as qual, index}
					<div class="grid grid-cols-[30%_auto] w-[250px] border ml-4 m-2">
						<div>
							<img src={qual.image} class="w-14" alt="" />
						</div>
						<div>
							<p>{qual.institute}</p>
							<p>{qual.from}-{qual.to}</p>
						</div>
					</div>
				{/each}
				<div class="flex flex-row mt-10">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/championship-trophy-svgrepo-com.svg"
						alt="Eduqual Image"
						class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
					/>
					<h1 class="font-extrabold text-xl">Contest Positions</h1>
				</div>
				<canvas id="performanceChart" class="w-full h-64"></canvas>
			</div>
		</div>
	</div>
</div>

<!-- <pre>{JSON.stringify(studentNow, null, 2)}</pre>
<pre>{JSON.stringify(studentqual, null, 2)}</pre> -->

<style>
	.navbar {
		background-color: rgb(188, 223, 253);
	}
	.appbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}

	.logo-container {
		display: flex;
		align-items: center;
	}

	.logo-container img {
		width: 50px;
		margin-right: 1rem;
	}
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
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
