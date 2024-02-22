<script>
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { InputChip } from '@skeletonlabs/skeleton';

	import { LightSwitch } from '@skeletonlabs/skeleton';

	export let data;
	let { teacher, blog } = data;
	$: ({ teacher, blog } = data);
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
	let editing = false;
	let mskill = [...teacher[0].skillset];
	let newEduQual = { img: '', details: '', from: '', to: '' };
	let selectedFile;
	function handleblogview() {}
	function handleeditformview() {
		editing = true;
	}
	function handlecloseeditformview() {
		editing = false;
	}
	function handleFileChange(event) {
		selectedFile = event.target.files[0];
		const reader = new FileReader();
		reader.onload = function () {
			teacher[0].image = reader.result;
		};
		reader.readAsDataURL(selectedFile);
	}
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
					<LightSwitch class="mr-3" />
				</li>
			</ul>
		</nav>
	</div>
	{#if editing === false}
		<div class="flex">
			<div class="w-1/3 p-6">
				<div class="flex flex-col">
					<img
						src={teacher[0].image}
						alt="User Image"
						class="rounded-full w-36 h-36 ml-10 mb-4 object-cover"
					/>
				</div>
				<h1 class="text-2xl font-bold ml-7">
					{teacher[0].name}
				</h1>
				<h1 class="text-xl font-semibold ml-7">
					{teacher[0].bio}
				</h1>

				<button type="button" class="btn variant-filled-secondary mt-6 ml-7 mr-16 font-semibold">
					<div class="flex flex-row" on:click={handleeditformview}>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/edit-pencil-svgrepo-com.svg"
							alt="User Image"
							class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h6 class="text-base">Edit profile</h6>
					</div>
				</button>

				<div class="card bg-inherit mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6">
						{teacher[0].about}
					</div>
				</div>

				<div class="card bg-inherit mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6 space-x-3 space-y-3">
						<h1>Skills</h1>
						{#each teacher[0].skillset as skill}
							<span class="chip variant-filled">{skill}</span>
						{/each}
					</div>
				</div>

				<div class="card bg-transparent mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6">
						<div class="flex flex-row">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connect-svgrepo-com.svg"
								alt="User Image"
								class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>Contact Information</h1>
						</div>
						<div class="flex flex-row mt-4">
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
								alt="User Image"
								class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>{teacher[0].email}</h1>
						</div>
						<div class="flex flex-row mt-3">
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
								alt="User Image"
								class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>{teacher[0].mobile}</h1>
						</div>
					</div>
				</div>

				<div class="card bg-transparent mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6">
						<div class="flex flex-row">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/location-pin-svgrepo-com.svg"
								alt="User Image"
								class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>Location</h1>
						</div>
						<div class="mt-4">
							<h1>{teacher[0].address}</h1>
						</div>
					</div>
				</div>
			</div>
			<div class="w-1/3 p-6">
				<div class="flex flex-col">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/graduation-education-cap-mortarboard-graduate-svgrepo-com.svg"
							alt="User Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="text-xl font-semibold">Educational Information</h1>
					</div>
					<div class="mt-4">
						{#each teacher[0].eduqual as qual}
							<div class="flex flex-row">
								<img
									src={qual.img}
									alt="User Image"
									class="w-16 h-16 mr-3 hover:scale-105 hover:rotate-12"
								/>
								<div class="mt-2">
									<p class="font-semibold text-lg">{qual.details}</p>
									<p class="text-sm">{qual.from}-{qual.to}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex flex-col mt-11">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/article-svgrepo-com.svg"
							alt="User Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="text-xl font-semibold">Recent Articles</h1>
					</div>
					<div class="mt-4">
						{#each blog as currblog}
							<div class="mr-24 hover:scale-105">
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blog5.png"
									alt="User Image"
									class="w-1/2 h-1/2 items-center justify-center object-contain object-center"
								/>

								<div class="flex flex-row">
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/299092_calendar_icon.svg"
										alt="User Image"
										class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
									/>
									<p class="text-sm mr-6">{formatDate(currblog.createdat)}</p>
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/stopwatch-svgrepo-com.svg"
										alt="User Image"
										class="w-5 h-5 mr-1 hover:scale-105 hover:rotate-12"
									/>
									<p class="text-sm">{currblog.timetoread} minutes read</p>
								</div>
								<h1 class="text-xl font-semibold mr-10">
									{currblog.title}
								</h1>
								<p class="text-sm font-semibold mr-10">
									{currblog.description}
								</p>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex flex-col mt-11">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/online-education-elearning-training-video-course-laptop-svgrepo-com.svg"
							alt="User Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="text-xl font-semibold">Upcoming Classes</h1>
					</div>
					<div class="mt-4">
						{teacher[0].eduqual}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<form method="POST" action="?/update" class="flex" bind:this={teacher[0]}>
			<div class="w-1/3 p-6">
				<div class="flex flex-col">
					<img
						src={teacher[0].image}
						alt="User Image"
						class="rounded-full w-36 h-36 ml-10 mb-4 object-cover"
					/>
					<label for="file-upload" class="ml-7 mb-6 cursor-pointer underline">Change Photo</label>
					<input
						id="file-upload"
						name="photo"
						type="file"
						class="hidden"
						accept="image/*"
						on:change={handleFileChange}
					/>
				</div>

				<h1 class="text-2xl font-bold ml-7">
					{teacher[0].name}
				</h1>
				<h1 class="text-xl font-semibold ml-7">
					<textarea
						class="textarea"
						rows="2"
						placeholder={teacher[0].bio}
						id="bio"
						name="bio"
						bind:value={teacher[0].bio}
					/>
				</h1>

				<button type="submit" class="btn variant-filled-success mt-6 ml-7 mr-16 font-semibold">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/upload-9-svgrepo-com.svg"
							alt="User Image"
							class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h6 class="text-base">Update profile</h6>
					</div>
				</button>

				<div class="card bg-inherit mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6">
						<textarea
							class="textarea"
							rows="4"
							placeholder={teacher[0].about}
							id="about"
							name="about"
							bind:value={teacher[0].about}
						/>
					</div>
				</div>

				<div class="card bg-inherit mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6 space-x-3 space-y-3">
						<h1>Skills</h1>
						<InputChip
							bind:value={teacher[0].skillset}
							name="skillset"
							placeholder="Enter any value..."
						/>
					</div>
				</div>

				<div class="card bg-transparent mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6">
						<div class="flex flex-row">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connect-svgrepo-com.svg"
								alt="User Image"
								class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>Contact Information</h1>
						</div>
						<div class="flex flex-row mt-4">
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
								alt="User Image"
								class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>{teacher[0].email}</h1>
						</div>
						<div class="flex flex-row mt-3">
							<img
								src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
								alt="User Image"
								class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>{teacher[0].mobile}</h1>
						</div>
					</div>
				</div>

				<div class="card bg-transparent mt-6 ml-5 mr-16 font-semibold">
					<div class="p-6">
						<div class="flex flex-row">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/location-pin-svgrepo-com.svg"
								alt="User Image"
								class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
							/>
							<h1>Location</h1>
						</div>
						<div class="mt-4">
							<input
								class="input"
								type="text"
								id="address"
								name="address"
								bind:value={teacher[0].address}
								placeholder="Enter Your Current Address"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="w-1/3 p-6">
				<div class="flex flex-col">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/graduation-education-cap-mortarboard-graduate-svgrepo-com.svg"
							alt="User Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="text-xl font-semibold">Educational Information</h1>
					</div>
					<div class="mt-4">
						{#each teacher[0].eduqual as qual}
							<div class="flex flex-row">
								<img
									src={qual.img}
									alt="User Image"
									class="w-16 h-16 mr-3 hover:scale-105 hover:rotate-12"
								/>
								<div class="mt-2">
									<p class="font-semibold text-lg">{qual.details}</p>
									<p class="text-sm">{qual.from}-{qual.to}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex flex-col mt-11">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/article-svgrepo-com.svg"
							alt="User Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="text-xl font-semibold">Recent Articles</h1>
					</div>
					<div class="mt-4">
						{#each blog as currblog}
							<div class="w-fit hover:scale-105">
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blog5.png"
									alt="User Image"
									class="w-1/2 h-1/2 items-center justify-center object-contain object-center"
								/>

								<div class="flex flex-row ml-5">
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/299092_calendar_icon.svg"
										alt="User Image"
										class="w-6 h-6 mr-3 hover:scale-105 hover:rotate-12"
									/>
									<p class="text-sm">{formatDate(currblog.createdat)}</p>
								</div>
								<h1 class="text-xl font-semibold ml-5 mr-10">
									{currblog.title}
								</h1>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex flex-col mt-11">
					<div class="flex flex-row">
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/online-education-elearning-training-video-course-laptop-svgrepo-com.svg"
							alt="User Image"
							class="w-8 h-8 mr-3 hover:scale-105 hover:rotate-12"
						/>
						<h1 class="text-xl font-semibold">Upcoming Classes</h1>
					</div>
					<div class="mt-4">
						{teacher[0].eduqual}
					</div>
				</div>
			</div>
		</form>
	{/if}
	<pre>{JSON.stringify(teacher, null, 2)}</pre>
	<pre>{JSON.stringify(blog, null, 2)}</pre>
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
