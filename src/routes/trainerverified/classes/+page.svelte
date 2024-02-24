<script lang="ts">
	// @ts-nocheck

	export let data;
	import { enhance } from '$app/forms';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';


	let { session, supabase, teacher, classes } = data;
	$: ({ session, supabase, teacher, classes } = data);

	let selectedClass;

	let title;
	let syllabus;
	let duration;
	let start;
	let image;
	let showaddmodal = false;


	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	function viewDetails(todoItem) {
		selectedClass = todoItem;
		console.log(selectedClass);
	}
	function closeModal() {
		selectedClass = null;
		console.log("new class clicked")
	}

	function addclassmodal() {
		showaddmodal = true;
		console.log("click new class")
	}

	function closeclassmodal() {
		showaddmodal = false;
	}
	function classifyClass(startDateStr) {
		// Parse the start date string into a Date object
		const startDate = new Date(startDateStr);

		const today = new Date();
		return startDate > today; // True for upcoming, false for running
	}
</script>


<div class="bg-[#f2f3f4]  dark:bg-[#212020] min-h-screen">
	
	<!-- <div class="navbar">
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


	</div> -->
	<div class="ml-8 mt-6 w-[23%] mr-8  bg- shadow-md bg-[#f0f4f6] overflow-hidden">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex flex-row space-x-3 p-5 hover:scale-105" on:click={addclassmodal} >
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/plus-add-svgrepo-com.svg"
				alt="Dashboard Icon"
				class="h-6 mr-1 hover:rotate-12"
			/>
			<h1>Add New Class</h1>
		</div>
	</div>
	
	
	<div>
		<div>
			<h1 class="text-2xl font-bold mt-4 ml-8 dark:text-[#f3f2f2] ">Upcoming Classes</h1>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
			
			{#each classes as currClass}
				{#if classifyClass(currClass.start)}
					<div class=" bg-[#dfedf8] pb-6 grid grid-rows-[200px_auto] rounded-lg shadow-xl dark:text-[#e1e1e1] dark:bg-[#070707]">
	
						<div class="h-[200px] overflow-hidden">
							<img src={currClass.image} alt="Dashboard Icon" class="object-cover  max-h-[200px] w-[100%] hover:scale-105" />
						</div>
						<div class="px-4 pb-4">
							<div >
								<h1 class="text-xl font-bold mt-4">
									{currClass.title}
								</h1>
							</div>
		
							<div class="flex justify-between items-center ">
		
								<div class="mt-2">
									<div>
										<p class="text-sm"><span class="font-semibold">Duration : </span>  {currClass.duration} weeks</p>
									</div>
									<div>
										<p class="text-sm"><span class="font-semibold">Start : </span>{currClass.start}</p>
									</div>
								</div>
				
								<div>
									<button class="btn  font-semibold text-base p-2 bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] hover:shadow-lg dark:text-[#e1e1e1] dark:bg-[#3b6f8e]" on:click={() => viewDetails(currClass)}>
										View Details
									</button>
								</div>
		
							</div>
						</div>
	
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<h1 class="text-2xl font-bold mt-4 ml-8 dark:text-[#f3f2f2]">Running Classes</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
		{#each classes as currClass}
			{#if classifyClass(currClass.start) === false}
			
				<div class=" bg-[#dfedf8] pb-6 grid grid-rows-[200px_auto] rounded-lg shadow-xl dark:text-[#e1e1e1] dark:bg-[#070707]">
	
					<div class="h-[200px] overflow-hidden">
						<img src={currClass.image} alt="Dashboard Icon" class="object-cover  max-h-[200px] w-[100%] hover:scale-105"/>
					</div>	
	
					<div class="px-4 pb-4">
						<div >
							<h1 class="text-xl font-bold mt-4">
								{currClass.title}
							</h1>
						</div>
		
						<div class="flex justify-between items-center ">
							<div class="mt-2">
								<div>
									<p class="text-sm"><span class="font-semibold">Duration : </span>  {currClass.duration} weeks</p>
								</div>
								<div>
									<p class="text-sm"><span class="font-semibold">Start : </span>{currClass.start}</p>
								</div>
							</div>
			
							<div>
								<a
									href="/trainerverified/runningclass/{currClass.id}/chat"
									class="btn  font-semibold text-base p-2 bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] hover:shadow-lg dark:text-[#e1e1e1] dark:bg-[#3b6f8e]"
									data-sveltekit-prefetch
								>
									Go to Class
								</a>
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	{#if selectedClass}
		<div
			class="fixed inset-0 bg-sky-200 bg-opacity-50 flex justify-center items-center z-50 transition-opacity"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">{selectedClass.title}</h2>
					<button class=" text-lg" on:click={closeModal}>&times;</button>
				</div>
				<div class="flex justify-between mt-2">
					<p class="text-sm">Span: {selectedClass.duration} weeks</p>
					<p class="text-sm">Starting: {selectedClass.start}</p>
				</div>
				<p class="text-base font-semibold mt-4">Syllabus</p>
				<p>
					{selectedClass.syllabus}
				</p>
	
				<div class="mt-4">
					<h1 class="font-semibold text-lg">Requested students</h1>
					<ul class="mt-4">
						{#each selectedClass.studclass as studentid}
							{#if studentid.joined === false}
								<li class="flex flex-row space-x-4">
									<a href="/viewonly/student/{studentid.sid}" data-sveltekit-prefetch>
										{studentid.sid}
									</a>
	
									<form action="?/ApproveRequest&id={studentid.id}" method="POST">
										<button type="submit">
											<img
												src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/dialog-complete-svgrepo-com.svg"
												alt="Dashboard Icon"
												class="h-6 mr-2 hover:rotate-12"
											/>
										</button>
									</form>
									<form action="?/deleteRequest&id={studentid.id}" method="POST">
										<button type="submit">
											<img
												src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Cross_red_circle.svg"
												alt="Dashboard Icon"
												class="h-6 mr-1 hover:rotate-12"
											/>
										</button>
									</form>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
				<div class="mt-4">
					<h1 class="font-semibold text-lg">Approved students</h1>
					<ul class="mt-4">
						{#each selectedClass.studclass as studentid}
							{#if studentid.joined === true}
								<li>
									<a href="/viewonly/student/{studentid.sid}" data-sveltekit-prefetch>
										{studentid.sid}
									</a>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{/if}
	{#if showaddmodal}
		<div
			class="fixed inset-0 bg-sky-200 bg-opacity-50 flex justify-center items-center z-50 transition-opacity dark:text-[#e1e1e1]  "
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4 dark:bg-[#212020]">
				<div class="flex justify-between items-center mb-3">
					<h2 class="text-2xl font-bold">Add a new class</h2>
					<button class=" text-lg" on:click={closeclassmodal}>&times;</button>
				</div>
	
				<form
					use:enhance
					action="?/upload"
					method="POST"
					on:submit={() => {
						closeclassmodal();
					}}
				>
					<div >
						<label class="label text-left mb-2">
							<span>Class Title</span>
	
							<input
								class="input dark:placeholder:text-[#ffffff9e]"
								type="text"
								id="title"
								name="title"
								bind:value={title}
								placeholder="Enter The name of the micro course"
							/>
						</label>
						<label class="label text-left">
							<span>Syllabus</span>
							<textarea
								class="textarea dark:placeholder:text-[#ffffff9e]"
								rows="4"
								placeholder="Topics you are gonna cover..."
								id="syllabus"
								name="syllabus"
								bind:value={syllabus}
							/>
						</label>
						<div class=" ">
							<label class="label text-left mb-2">
								<span>Class Duration</span>
								<input
									class="input dark:placeholder:text-[#ffffff9e]"
									type="number"
									id="duration"
									name="duration"
									bind:value={duration}
									placeholder="How many weeks are gonna take?"
								/>
							</label>
							<label class="label text-left mb-3">
								<span>Approx Start date</span>
		
								<input class="input dark:placeholder:text-[#ffffff9e]" type="date" id="start" name="start" bind:value={start} />
							</label>
						</div>
						<label class="label text-left mb-3">
							<span>Photo (optional)</span>
	
							<input class="input dark:placeholder:text-[#ffffff9e]" type="file" id="image" name="image" bind:value={image} />
						</label>
						<button type="submit" class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e]  bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
	
</div>
<pre>{JSON.stringify(classes, null, 2)}</pre>

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
