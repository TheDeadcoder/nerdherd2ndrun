<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, Table } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';

	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);

	let chart = null;
	export let data;
	let { session, supabase, studentNow, studentqual, performanceWithContest } = data;
	$: ({ session, supabase, studentNow, studentqual, performanceWithContest } = data);
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
	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};
	const handleSignOut = async () => {
		await data.supabase.auth.signOut();

		window.open('/learnerlogin', '_self');
	};
	function calculateAge(dob) {
		const today = new Date();
		const birthDate = new Date(dob);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	let about = studentNow.about;
	let aboutModal = false;
	function addaboutModal() {
		aboutModal = true;
	}

	function closeaboutModal() {
		aboutModal = false;
	}

	let institute = studentNow.institute;
	let instituteModal = false;
	function addsinstituteModal() {
		instituteModal = true;
	}

	function closeinstituteModal() {
		instituteModal = false;
	}

	let dob = studentNow.dob;
	let dobModal = false;
	function adddobModal() {
		dobModal = true;
	}

	function closedobModal() {
		dobModal = false;
	}

	let gender = studentNow.gender;
	let genderModal = false;
	function addgenderModal() {
		genderModal = true;
	}

	function closegenderModal() {
		genderModal = false;
	}

	let address = studentNow.address;
	let addressModal = false;
	function addaddressModal() {
		addressModal = true;
	}

	function closeaddressModal() {
		addressModal = false;
	}

	let pic;
	let picModal = false;
	function addpicModal() {
		picModal = true;
	}

	function closepicModal() {
		picModal = false;
	}

	let phone;
	let phoneModal = false;
	function addphoneModal() {
		phoneModal = true;
	}

	function closephoneModal() {
		phoneModal = false;
	}

	let WorkExperiencesFrom;
	let WorkExperiencesTo;
	let WorkExperiencesInstitute;
	let WorkExperiencesPosition;
	let WorkExperiencesImage;
	let WorkExperiencesgpa;
	let WorkExperiencesgpabase;

	let showaddWorkExperiences = false;
	function addclassmodal() {
		showaddWorkExperiences = true;
	}

	function closeclassmodal() {
		showaddWorkExperiences = false;
		WorkExperiencesFrom = '';
		WorkExperiencesTo = '';
		WorkExperiencesInstitute = '';
		WorkExperiencesPosition = '';
		WorkExperiencesImage = '';
		WorkExperiencesgpa = '';
		WorkExperiencesgpabase = '';
	}
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


<!-- <nav class="appbar">
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
			<a href="/learnerverified/ai/gpt" class="flex items-center p-1 font-bold"
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
</nav> -->


<section class="min-h-screen ml-16 mr-16">
	<div class="flex flex-row space-x-24">
		<div class="flex flex-col w-1/3 mt-4">
			<!-- svelte-ignore missing-declaration -->
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				src={studentNow.image}
				alt="User Image"
				class="rounded-full w-36 h-36 ml-10 mb-4 object-cover"
				on:click={addpicModal}
			/>

			<h1 class="text-4xl font-extrabold">
				{studentNow.name}
			</h1>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<div class="mt-2 flex flex-row space-x-1">
				<p>{studentNow.institute}</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
					alt="Bout us"
					class="rounded-full w-6 h-6 object-cover hover:rotate-12"
					on:click={addsinstituteModal}
				/>
			</div>

			<div class="flex flex-row space-x-2 mt-9 mb-2">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/about-svgrepo-com.svg"
					alt="Bout us"
					class="rounded-full w-8 h-8 object-cover"
				/>
				<h1 class="font-bold text-xl">About</h1>
			</div>
			<div class="mt-1 flex flex-row">
				<p>{studentNow.about}</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
					alt="Bout us"
					class="rounded-full w-6 h-6 object-cover hover:rotate-12"
					on:click={addaboutModal}
				/>
			</div>
			{#if studentNow.gender === 'male'}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<div class="flex flex-row space-x-2 mt-9 mb-2">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/male-student-13-svgrepo-com.svg"
						alt="male"
						class="rounded-full w-8 h-8 object-cover"
					/>
					<h1 class="font-semibold">Male</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={addgenderModal}
					/>
				</div>
			{:else if studentNow.gender === 'female'}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="flex flex-row space-x-2 mt-9 mb-2">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/female-person-svgrepo-com.svg"
						alt="female"
						class="rounded-full w-8 h-8 object-cover"
					/>
					<h1 class="font-semibold">Female</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={addgenderModal}
					/>
				</div>
			{:else}
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<div class="flex flex-row space-x-2 mt-9 mb-2">
					<h1 class="font-semibold">Gender is undefined</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={addgenderModal}
					/>
				</div>
			{/if}
			{#if studentNow.dob}
				<div class="flex flex-row space-x-1 mt-6 mb-2">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/date-question-svgrepo-com.svg"
						alt="age"
						class="rounded-full w-7 h-7 mr-2 object-cover"
					/>
					<h1 class="font-semibold">Age: {calculateAge(studentNow.dob)}</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={adddobModal}
					/>
				</div>
			{:else}
				<div class="mt-6 flex flex-row">
					<h1 class="font-semibold">Age is undefined</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={adddobModal}
					/>
				</div>
			{/if}
			<div class="flex flex-row space-x-2 mt-9 mb-2">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connect-svgrepo-com.svg"
					alt="Bout us"
					class="rounded-full w-8 h-8 object-cover"
				/>
				<h1 class="font-bold text-xl">Communicate</h1>
			</div>
			<div class="flex flex-row mt-4">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
					alt="User Image"
					class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
				/>
				<h1>{studentNow.email}</h1>
			</div>
			<div class="flex flex-row mt-3">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
					alt="User Image"
					class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
				/>
				<h1>{studentNow.mobile}</h1>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
					alt="Bout us"
					class="rounded-full w-6 h-6 object-cover hover:rotate-12"
					on:click={addphoneModal}
				/>
			</div>
			<div class="flex flex-row mt-9">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/location-pin-svgrepo-com.svg"
					alt="User Image"
					class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
				/>
				<h1 class="font-bold text-lg">Location</h1>
			</div>
			<div class="flex flex-row space-x-1 mt-2 mb-2">
				<h1 class="font-semibold">{studentNow.address}</h1>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
					alt="Bout us"
					class="rounded-full w-6 h-6 object-cover hover:rotate-12"
					on:click={addaddressModal}
				/>
			</div>
		</div>
		<div class="flex flex-col">
			<div class="flex flex-row mt-9">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/graduation-cap-svgrepo-com.svg"
					alt="Eduqual Image"
					class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
				/>
				<h1 class="font-extrabold text-xl">Educational Qualification</h1>
			</div>
			<div class="flex flex-col space-y-3">
				{#each studentqual as currqual}
					<div class="flex flex-row space-x-4 space-y-3">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src={currqual.image}
							alt="User Image"
							class="w-10 h-10 mr-3 mt-3 hover:scale-105 hover:rotate-12"
						/>
						<div>
							<h1 class="font-bold">
								{currqual.institute}
							</h1>
							<div class="flex flex-row space-x-2">
								<h4 class="font-semibold">
									{currqual.name}
								</h4>
							</div>
							<p class="font-light text-md">
								Result: {currqual.gpa} / {currqual.gpabase}
							</p>

							<p>
								{currqual.from}-{currqual.to}
							</p>
						</div>
					</div>
				{/each}
				<button
					class="btn variant-filled-primary rounded-lg w-fit mt-4 ml-3 mr-3"
					on:click={addclassmodal}
				>
					+Add a new experience
				</button>
			</div>
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

	{#if picModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Profile picture</h2>
					<button class=" text-lg" on:click={closepicModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addPic"
					method="POST"
					on:submit={() => {
						closepicModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Photo</span>

							<input class="input" type="file" id="pic" name="pic" bind:value={pic} />
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	{#if phoneModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Edit your phone number</h2>
					<button class=" text-lg" on:click={closephoneModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addPhone"
					method="POST"
					on:submit={() => {
						closephoneModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Phone</span>

							<input class="input" type="number" id="phone" name="phone" bind:value={phone} />
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	{#if instituteModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Change Institute</h2>
					<button class=" text-lg" on:click={closeinstituteModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addInstitute"
					method="POST"
					on:submit={() => {
						closeinstituteModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Institute</span>

							<input
								class="input"
								type="text"
								id="institute"
								name="institute"
								bind:value={institute}
								placeholder={institute}
							/>
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	{#if aboutModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Change About</h2>
					<button class=" text-lg" on:click={closeaboutModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addAbout"
					method="POST"
					on:submit={() => {
						closeaboutModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>About You</span>

							<textarea
								class="textarea"
								rows="3"
								placeholder={about}
								id="about"
								name="about"
								bind:value={about}
							/>
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	{#if addressModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Change Address</h2>
					<button class=" text-lg" on:click={closeaddressModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addAddress"
					method="POST"
					on:submit={() => {
						closeaddressModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Your Address</span>

							<input
								class="input"
								type="text"
								id="address"
								name="address"
								bind:value={address}
								placeholder={address}
							/>
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	{#if dobModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Date of Birth</h2>
					<button class=" text-lg" on:click={closedobModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addDob"
					method="POST"
					on:submit={() => {
						closedobModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Date of Birth</span>

							<input class="input" type="date" id="dob" name="dob" bind:value={dob} />
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	{#if genderModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Gender</h2>
					<button class=" text-lg" on:click={closegenderModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addGender"
					method="POST"
					on:submit={() => {
						closegenderModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left">
							<span>Choose Your Gender</span>
							<select bind:value={gender} class="select" id="gender" name="gender">
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	{#if showaddWorkExperiences}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div
				class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4 max-h-screen overflow-y-auto"
			>
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Experience</h2>
					<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addWorkExperiences"
					method="POST"
					enctype="multipart/form-data"
					on:submit={() => {
						closeclassmodal();
					}}
				>
					<div class="flex flex-col space-y-3">
						<label class="label text-left mb-1">
							<span>Institute</span>

							<input
								class="input"
								type="text"
								id="WorkExperiencesInstitute"
								name="WorkExperiencesInstitute"
								bind:value={WorkExperiencesInstitute}
								placeholder="Enter The name of the Institute"
							/>
						</label>
						<label class="label text-left mb-1">
							<span>Position</span>

							<input
								class="input"
								type="text"
								id="WorkExperiencesPosition"
								name="WorkExperiencesPosition"
								bind:value={WorkExperiencesPosition}
								placeholder="Enter your Position if the Institute"
							/>
						</label>
						<label class="label text-left mb-1">
							<span>Gpa Obtained</span>

							<input
								class="input"
								type="text"
								id="WorkExperiencesgpa"
								name="WorkExperiencesgpa"
								bind:value={WorkExperiencesgpa}
								placeholder="Enter your Obtained gpa"
							/>
						</label>
						<label class="label text-left mb-1">
							<span>Gpa Base</span>

							<input
								class="input"
								type="text"
								id="WorkExperiencesgpabase"
								name="WorkExperiencesgpabase"
								bind:value={WorkExperiencesgpabase}
								placeholder="Out of ..."
							/>
						</label>
						<label class="label text-left mb-1">
							<span>From</span>

							<input
								class="input"
								type="number"
								id="WorkExperiencesFrom"
								name="WorkExperiencesFrom"
								bind:value={WorkExperiencesFrom}
								placeholder="From year"
							/>
						</label>
						<label class="label text-left mb-1">
							<span>To</span>

							<input
								class="input"
								type="number"
								id="WorkExperiencesTo"
								name="WorkExperiencesTo"
								bind:value={WorkExperiencesTo}
								placeholder="To year"
							/>
						</label>

						<label class="label text-left mb-1">
							<span>Photo (optional)</span>

							<input
								class="input"
								type="file"
								id="WorkExperiencesImage"
								name="WorkExperiencesImage"
								bind:value={WorkExperiencesImage}
							/>
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	<!-- <pre>{JSON.stringify(performanceWithContest, null, 2)}</pre> -->
</section>

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
