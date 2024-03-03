<script lang="ts">
	import Saos from 'saos';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;
	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};
	let { session, supabase, contestNow, studentNow, questions } = data;
	$: ({ session, supabase, contestNow, studentNow, questions } = data);

	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/learnerlogin', '_self');
	};
</script>

<main>
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
	<section class="min-h-screen p-4">
		<div class="flex flex-col items-center justify-center">
			<h1 class="font-extrabold text-2xl">
				{contestNow.title}
			</h1>
		</div>
		<h1 class="font-bold text-xl">Result Page</h1>
		<div class="flex flex-col mt-6">
			<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div class="overflow-hidden">
						<table class="min-w-full text-left text-sm font-light">
							<thead
								class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
							>
								<tr>
									<th scope="col" class="px-6 py-4">Rank</th>
									<th scope="col" class="px-6 py-4">Student</th>
									<th scope="col" class="px-6 py-4">Score</th>
								</tr>
							</thead>
							<tbody>
								{#each contestNow.pbregistrant as registrant, i}
									<tr class="border-b bg-white dark:border-neutral-500 dark:bg-neutral-700">
										<td class="whitespace-nowrap px-6 py-4 font-medium">{i}</td>
										<td class="whitespace-nowrap px-6 py-4">
											<a
												href="/viewonly/student/{registrant.student.id}"
												class="flex flex-row space-x-2"
											>
												<img
													src={registrant.student.image}
													alt="Dashboard Icon"
													class="h-5 mr-1 hover:rotate-12"
												/>
												<h1 class="font-semibold">
													{registrant.student.name}
												</h1>
											</a>
										</td>
										<td class="whitespace-nowrap px-6 py-4">{registrant.score}</td>
									</tr>
									<!-- <div class="flex flex-row space-x-10">
										<h1>
											{cursession.topic}
										</h1>
										<h1>
											{cursession.start}
										</h1>
										<h1>
											Duration: {cursession.duration} seconds
										</h1>
									</div> -->
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<h1>Result Page</h1>
<h1>
	{contestNow.title}
</h1>
<!-- <h1>{contestNow.registrant.score}</h1> -->
<pre>{JSON.stringify(contestNow, null, 2)}</pre>
<pre>{JSON.stringify(studentNow, null, 2)}</pre>
<pre>{JSON.stringify(questions, null, 2)}</pre>

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

	.logo-container {
		display: flex;
		align-items: center;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.animate-fadeIn {
		animation: fadeIn 1s ease-in-out;
	}
	@-webkit-keyframes -global-scale-up-center {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
	@keyframes -global-scale-up-center {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
</style>
