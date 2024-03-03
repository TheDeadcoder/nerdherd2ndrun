<script lang="ts">
	export let data;

	let { session, supabase, studentNow, studentqual } = data;
	$: ({ session, supabase, studentNow, studentqual } = data);
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

	<div class="h-screen flex justify-center">
		<div class=" grid grid-rows-2 justify-center w-3/5 p-16">
			<div class="">
				<div class="flex justify-center">
					<img src={studentNow.image} alt="" class="rounded-full border h-[220px]" />
				</div>
			</div>

			<div class="mb-8 grid grid-cols-2">
				<div class="pr-2 pl-6 border-r-2 border-black">
					<p class="text-2xl font-semibold">{studentNow.name}</p>
					<p class="font-thin">{studentNow.email}</p>
					<p class="font-thin">{studentNow.institute}</p>
					<div class="my-3">
						<p>{studentNow.about}</p>
					</div>
				</div>
				<div class="flex m-3">
					<!-- <div>
						<img src={studentNow.eduqual[0].img} alt="" class="max-h-12 m-1" />
					</div>
					<div>
						<p class="font-medium">{studentNow.eduqual[0].institute}</p>
						<p class="leading-3">{studentNow.eduqual[0].gpa}</p>
					</div> -->
					<div class="flex flex-col space-y-2">
						{#each studentqual as currentqual}
							<div class="flex flex-row space-x-2">
								<img
									src={currentqual.image}
									alt="Dashboard Icon"
									class="h-12 mr-1 hover:rotate-12"
								/>
								<div class="flex flex-col space-y-2">
									<h1 class="text-xl font-bold">
										{currentqual.institute}
									</h1>
									<div class="flex flex-row space-x-4">
										<h1 class="text-lg font-semibold">
											{currentqual.name}
										</h1>
										<h1 class="text-lg font-semibold">
											Result: {currentqual.gpa} /{currentqual.gpabase}
										</h1>
									</div>

									<p class="font-light text-sm">
										{currentqual.from} - {currentqual.to}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<pre>{JSON.stringify(studentNow, null, 2)}</pre>
<pre>{JSON.stringify(studentqual, null, 2)}</pre>

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
