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
	let { session, supabase, contestNow, studentNow, questions, performance } = data;
	$: ({ session, supabase, contestNow, studentNow, questions, performance } = data);

	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/learnerlogin', '_self');
	};
</script>

<main class="dark:bg-[#212020] dark:text-[#e1e1e1]">
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
	<div class="flex flex-col items-center justify-center">
		<h1 class="font-bold text-[30px] underline mt-4">
			{contestNow.title}
		</h1>
	</div>
	<section class="min-h-screen p-4 flex flex-row space-x-10">
		<div class="flex flex-col mt-6 w-2/3">
			<div class="flex flex-row mt-4 space-x-2">
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/medal-champion-award-winner-olympic-6-svgrepo-com.svg"
					alt="Dashboard Icon"
					class="h-10 mr-1 hover:rotate-12"
				/>
				<h1 class="font-bold text-2xl">Ranks</h1>
			</div>
			<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div class="overflow-hidden">
						<table class="min-w-full text-left text-sm font-light  dark:text-[#e1e1e1] dark:bg-[#070707]">
							<thead
								class="border-b bg-white font-medium dark:text-[#e1e1e1] dark:bg-[#070707] "
							>
								<tr>
									<th scope="col" class="px-6 py-4">Rank</th>
									<th scope="col" class="px-6 py-4">Student</th>
									<th scope="col" class="px-6 py-4">Score</th>
								</tr>
							</thead>
							<tbody class="">
								{#each contestNow.pbregistrant as registrant, i}
									{#if registrant.student.id === studentNow.id}
										<tr class="border-b dark:bg-[#51ab51] bg-[#8cf08c]">
											<td class="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
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
											<td class="whitespace-nowrap px-6 py-2 font-bold flex flex-row items-center">
												{registrant.score}
												{#if performance?.length > 0}
													<button class="p-2 ml-2 rounded-lg dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De]" disabled={true}> Add To Records </button>
												{:else}
													<form action="?/deleteTodo&id={i + 1}" method="POST">
														<button
															type="submit"
															class="ml-4 p-2 dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De] rounded-lg"
														>
															+ Add To Records
														</button>
													</form>
												{/if}
											</td>
										</tr>
									{:else}
										<tr class="border-b dark:border-neutral-500 bg-slate-100 hover:bg-sky-200 dark:text-[#e1e1e1] dark:bg-[#070707]">
											<td class="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
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
									{/if}

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
		<div class="flex flex-col w-1/3 space-y-8 mt-6">
			<h1 class="font-bold text-2xl">Questions</h1>
			{#each questions as question, i}
				<div class="flex flex-col space-y-2">
					<h1 class="text-left">{i + 1}</h1>
					{#if question.image}
						<img src={question.image} alt="Dashboard Icon" class="w-16 mr-1 hover:rotate-12" />
					{/if}
					<p class="font-semibold">
						{question.body}
					</p>
					<div class="flex flex-col space-y-1">
						{#each question.options as option, j}
							{#if j === question.correct}
								<p class="font-bold">{j + 1}. {option}</p>
							{:else}
								<p>{j + 1}. {option}</p>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<!-- <h1>{contestNow.registrant.score}</h1> -->
<!-- <pre>{JSON.stringify(performance, null, 2)}</pre> -->

<!-- <pre>{JSON.stringify(studentNow, null, 2)}</pre>
<pre>{JSON.stringify(questions, null, 2)}</pre> -->

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
