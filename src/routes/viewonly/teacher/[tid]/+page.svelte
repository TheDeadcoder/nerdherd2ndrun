<script lang="ts">
	export let data;

	let { session, supabase, teacherNow, blog, classes, teacherqual, teacherskills } = data;
	$: ({ session, supabase, teacherNow, blog, classes, teacherqual, teacherskills } = data);
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
			</ul>
		</nav>
	</div>

	<div class="h-screen flex justify-center">
		<div class=" grid grid-rows-2 justify-center w-3/5 p-16">
			<div class="mb-14">
				<div class="flex justify-center">
					<img src={teacherNow.image} alt="" class="h-[200px] rounded-full border object-contain" />
				</div>
			</div>

			<div class="mb-8 grid grid-cols-2">
				<div class="pr-2 pl-6 border-r-2 border-black">
					<p class="text-2xl font-semibold">{teacherNow.name}</p>
					<p class="font-thin">{teacherNow.email}</p>
					<p class="font-thin">{teacherNow.address}</p>
					<!-- <p class="font-thin">{teacherNow.institute}</p> -->
					<div class="my-3">
						<p>{teacherNow.about}</p>
					</div>
				</div>
				<div class="flex m-3">
					<!-- <div>
						<p class="max-h-12 m-1">{teacherNow.skillset}</p>
					</div> 
					Avro, the skill and educational quaLifications have changed
					look pre
					-->

					<div>
						<!-- <p class="font-medium"> {teacherNow.eduqual[0].institute}</p>
						<p class="leading-3">{teacherNow.eduqual[0].gpa}</p> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<pre>{JSON.stringify(teacherNow, null, 2)}</pre>
<pre>{JSON.stringify(blog, null, 2)}</pre>
<pre>{JSON.stringify(classes, null, 2)}</pre>
<pre>{JSON.stringify(teacherqual, null, 2)}</pre>
<pre>{JSON.stringify(teacherskills, null, 2)}</pre>

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
