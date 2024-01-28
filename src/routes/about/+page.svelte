<script>
	import Saos from 'saos';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Footer from '$lib/footer.svelte';
	let isLoading = true;
	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 1500); // Simulating an async load for the image.
	});
</script>

<nav class="fixed top-0 z-50 w-full py-6 backdrop-blur-md">
	<div class="flex justify-between mx-6">
		<div class="flex">
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

		<div class="flex space-x-3">
			<LightSwitch />
			<a class="btn btn-sm variant-ghost-surface" href="/about" target="_blank" rel="noreferrer">
				About us
			</a>
		</div>
	</div>
</nav>

<section class="mt-28">
	{#if isLoading}
		<div class="flex justify-center items-center space-x-2">
			<div class="shape circle mr-1" />
			<div class="shape rectangle mr-1" />
			<div class="shape triangle mr-3" />
			<div>
				<h1 class="text-3xl font-bold">In a Moment...</h1>
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center mb-10 mt-6">
			<Saos animation={'roll-in-blurred-left 2s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					height={148}
				/>
			</Saos>
		</div>
		<div class="flex flex-col items-center justify-center mb-20">
			<Saos animation={'scale-in-center 2s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
				<h1 class="text-4xl font-extrabold">🔥Hola Nerds🔥</h1>
			</Saos>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14">
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/depressed%20kiddo1.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'bounce-in-right 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/sad-but-relieved-face-svgrepo-com.svg"
						class="transform transition duration-300"
						alt="title"
						width={60}
						height={60}
					/>
				</Saos>
				<h6 class="text-3xl font-semibold">Are you lagging behind in study?</h6>
				<h6 class="text-3xl font-semibold">Can't access Advanced Resources by Yourself?</h6>
			</div>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-24">
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'bounce-in-top 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/sad-but-relieved-face-svgrepo-com.svg"
						class="transform transition duration-300"
						alt="title"
						width={60}
						height={60}
					/>
				</Saos>
				<h6 class="text-3xl font-semibold">Are you getting too attached to phone?</h6>
				<h6 class="text-3xl font-semibold">Can't avoid Distraction?</h6>
			</div>
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/2150709872-removebg-preview.png?t=2023-12-03T11%3A58%3A57.385Z"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-28">
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/nacist_kiddo-removebg-preview.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'bounce-in-bck 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/loudly-crying-face-svgrepo-com.svg"
						class="transform transition duration-300"
						alt="title"
						width={60}
						height={60}
					/>
				</Saos>
				<h6 class="text-3xl font-semibold">Can't Find Excitement in studies?</h6>
				<h6 class="text-3xl font-semibold">Missing Teamwork?</h6>
			</div>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12 p-10">
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'slide-in-left 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/solution.png"
						class="transform transition duration-300"
						alt="title"
					/>
				</Saos>
			</div>
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'slide-in-bottom 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlassesektuboro.png?t=2023-12-03T12%3A53%3A01.681Z"
						class="transform transition duration-300 hover:rotate-12 hover:scale-125"
						alt="title"
					/>
				</Saos>
			</div>
		</div>

		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12">
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/bookresrc-removebg-preview.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<h6 class="text-3xl font-semibold">
					Get all your Subject related books and study materials in one place
				</h6>
			</div>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12">
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'bounce-in-top 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
						class="transform transition duration-300"
						alt="title"
						width={60}
						height={60}
					/>
				</Saos>
				<h1 class="text-3xl font-semibold">Find the opprtunity to join the Millions⚡</h1>
				<h1 class="text-3xl font-semibold">
					Get access the most up-to-date educative & informative articles
				</h1>
			</div>
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/article-removebg-preview.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12">
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teacherstudent-transformed-removebg-preview.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'bounce-in-right 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
						class="transform transition duration-300"
						alt="title"
						width={60}
						height={60}
					/>
				</Saos>
				<h1 class="text-3xl font-semibold">Find the opprtunity to communicate with any teacher</h1>
				<h1 class="text-3xl font-semibold">Join any class, Learn any Topic</h1>
				<h1 class="text-3xl font-semibold">No more BULK course👎</h1>
				<h1 class="text-3xl font-semibold">
					Learn via active communication and achieve granular target
				</h1>
			</div>
		</div>

		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12">
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'bounce-in-top 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
						class="transform transition duration-300"
						alt="title"
						width={60}
						height={60}
					/>
				</Saos>
				<h1 class="text-3xl font-semibold">Learn via active communication & collaboration</h1>
				<h1 class="text-3xl font-semibold">Group video call & Group Task</h1>
			</div>
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/class-transformed-removebg-preview.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
		</div>

		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12">
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/battle.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'bounce-in-right 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/sword-fight-svgrepo-com.svg"
						class="transform transition duration-300"
						alt="title"
						width={60}
						height={60}
					/>
				</Saos>
				<h1 class="text-3xl font-semibold">Compete with the community</h1>
				<h1 class="text-3xl font-semibold">Brainstorm with our challenging tasks</h1>
			</div>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12">
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'swing-in-top-fwd 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2015.png"
						class="transform transition duration-300"
						alt="title"
						width={120}
						height={120}
					/>
				</Saos>
				<h1 class="text-3xl font-semibold">Set your Goals & Schedule to Achieve</h1>
				<h1 class="text-3xl font-semibold">Analyze your Growth</h1>
				<h1 class="text-3xl font-semibold">Acheive Personal goals with us</h1>
			</div>
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/routine-transformed-removebg-preview.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
		</div>
		<div class="max-w-screen-xl mx-auto flex justify-between space-x-14 mb-12">
			<div class="flex flex-col space-y-6 w-1/2">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/aitool.png"
					class="transform transition duration-300"
					alt="title"
				/>
			</div>
			<div class="flex flex-col space-y-6 w-1/2 justify-center">
				<Saos animation={'vibrate-1 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot.svg"
						class="transform transition duration-300"
						alt="title"
						width={120}
						height={120}
					/>
				</Saos>

				<h1 class="text-3xl font-semibold">Meet Mr. Superviser</h1>
				<h1 class="text-3xl font-semibold">Chat with him. Ask him Anything</h1>
				<h1 class="text-3xl font-semibold">Learn about anything & get your task done🤗</h1>
			</div>
		</div>

		<h2 class="text-4xl font-semibold ml-8">Meet Our Team</h2>
		<div class="flex flex-wrap mt-10">
			<div class="w-full md:w-1/4 lg:w-1/4 p-4">
				<div class=" rounded-lg shadow-md p-4 hover:shadow-2xl">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/superviser.jpg"
						alt="Team Superviser"
						class="h-48 rounded-full mx-auto mb-4"
					/>
					<h3 class=" text-center text-3xl font-bold">Sir Ashraful Islam</h3>
					<p class="text-center text-2xl font-semibold">Project-Superviser</p>
					<p class="text-center text-xl font-semibold">CSE, BUET</p>
					<div class="flex items-center justify-center space-x-4 mt-5">
						<a href="https://www.facebook.com/r.square.es" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/facebook-1-svgrepo-com.svg"
								alt="Facebook"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={30}
								height={30}
							/>
						</a>
						<a href="mailto:rayhan@cse.buet.ac.bd" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GMail%20New%20Icon.svg"
								alt="Gmail"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={35}
								height={35}
							/>
						</a>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/4 lg:w-1/4 p-4">
				<div class=" rounded-lg shadow-md p-4 hover:shadow-2xl">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/sakib1.jpg"
						alt="Team Member 1"
						class="h-48 rounded-full mx-auto mb-4"
					/>
					<h3 class=" text-center text-3xl font-bold">Nazmus Sakib</h3>
					<p class="text-center text-2xl font-semibold">ID:1905061</p>
					<p class="text-center text-xl font-semibold">CSE, BUET</p>
					<div class="flex items-center justify-center space-x-4 mt-5">
						<a href="https://www.facebook.com/nazmussakib.touhid" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/facebook-1-svgrepo-com.svg"
								alt="Facebook"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={30}
								height={30}
							/>
						</a>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/github-svgrepo-com.svg"
							alt="Github"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110"
							width={30}
							height={30}
						/>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/linkedin-svgrepo-com.svg"
							alt="Github"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110"
							width={30}
							height={30}
						/>
						<a href="mailto:sakibbuet2k19@gmail.com" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GMail%20New%20Icon.svg"
								alt="Gmail"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={35}
								height={35}
							/>
						</a>
					</div>
				</div>
			</div>
			<!-- Add more team members here -->
			<div class="w-full md:w-1/4 lg:w-1/4 p-4">
				<div class=" rounded-lg shadow-md p-4 hover:shadow-2xl">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Raihan.jpg"
						alt="Team Member 2"
						class="h-48 rounded-full mx-auto mb-4"
					/>
					<h3 class=" text-center text-3xl font-bold">Md. Raihan Sobhan</h3>
					<p class="text-center text-2xl font-semibold">ID:1905095</p>
					<p class="text-center text-xl font-semibold">CSE, BUET</p>
					<div class="flex items-center justify-center space-x-4 mt-5">
						<a href="https://www.facebook.com/mdraihansobhan.raihan" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/facebook-1-svgrepo-com.svg"
								alt="Facebook"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={30}
								height={30}
							/>
						</a>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/github-svgrepo-com.svg"
							alt="Github"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110"
							width={30}
							height={30}
						/>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/linkedin-svgrepo-com.svg"
							alt="Github"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110"
							width={30}
							height={30}
						/>
						<a href="mailto:raihan.cse.buet@gmail.com" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GMail%20New%20Icon.svg"
								alt="Gmail"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={35}
								height={35}
							/>
						</a>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/4 lg:w-1/4 p-4">
				<div class=" rounded-lg shadow-md p-4 hover:shadow-2xl">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/avro.jpg"
						alt="Team Member 3"
						class="h-48 rounded-full mx-auto mb-4"
					/>
					<h3 class=" text-center text-3xl font-bold">Labid Al Nahiyan Avro</h3>
					<p class="text-center text-2xl font-semibold">ID:1905110</p>
					<p class="text-center text-xl font-semibold">CSE, BUET</p>
					<div class="flex items-center justify-center space-x-4 mt-5">
						<a href="https://www.facebook.com/labidal.nahiyan" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/facebook-1-svgrepo-com.svg"
								alt="Facebook"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={30}
								height={30}
							/>
						</a>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/github-svgrepo-com.svg"
							alt="Github"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110"
							width={30}
							height={30}
						/>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/linkedin-svgrepo-com.svg"
							alt="Github"
							class="transform transition duration-300 hover:rotate-12 hover:scale-110"
							width={30}
							height={30}
						/>
						<a href="mailto:labid.nahiyan12@gmail.com" target="_blank">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GMail%20New%20Icon.svg"
								alt="Gmail"
								class="transform transition duration-300 hover:rotate-12 hover:scale-110"
								width={35}
								height={35}
							/>
						</a>
					</div>
				</div>
			</div>
		</div>

		<Footer />
	{/if}
</section>

<style>
	@keyframes moveUpDown {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}
	.shape {
		display: inline-block;
		animation: moveUpDown 1s ease-in-out infinite;
	}
	.circle {
		width: 20px;
		height: 20px;
		background-color: #4299e1;
		border-radius: 50%;
	}
	.rectangle {
		width: 20px;
		height: 30px;
		background-color: #f56565;
		animation-delay: 0.1s;
	}
	.triangle {
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 20px solid #48bb78;
		animation-delay: 0.2s;
	}
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}

	@-webkit-keyframes -global-roll-in-blurred-left {
		0% {
			-webkit-transform: translateX(-1000px) rotate(-720deg);
			transform: translateX(-1000px) rotate(-720deg);
			-webkit-filter: blur(50px);
			filter: blur(50px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0) rotate(0deg);
			transform: translateX(0) rotate(0deg);
			-webkit-filter: blur(0);
			filter: blur(0);
			opacity: 1;
		}
	}
	@keyframes -global-roll-in-blurred-left {
		0% {
			-webkit-transform: translateX(-1000px) rotate(-720deg);
			transform: translateX(-1000px) rotate(-720deg);
			-webkit-filter: blur(50px);
			filter: blur(50px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0) rotate(0deg);
			transform: translateX(0) rotate(0deg);
			-webkit-filter: blur(0);
			filter: blur(0);
			opacity: 1;
		}
	}

	@-webkit-keyframes -global-scale-in-center {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes -global-scale-in-center {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}

	@-webkit-keyframes -global-bounce-in-top {
		0% {
			-webkit-transform: translateY(-500px);
			transform: translateY(-500px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: translateY(-65px);
			transform: translateY(-65px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: translateY(-28px);
			transform: translateY(-28px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		90% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: translateY(-8px);
			transform: translateY(-8px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
	@keyframes -global-bounce-in-top {
		0% {
			-webkit-transform: translateY(-500px);
			transform: translateY(-500px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: translateY(-65px);
			transform: translateY(-65px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: translateY(-28px);
			transform: translateY(-28px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		90% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: translateY(-8px);
			transform: translateY(-8px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}

	@-webkit-keyframes -global-slide-in-left {
		0% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
	@keyframes -global-slide-in-left {
		0% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}

	@-webkit-keyframes -global-slide-in-bottom {
		0% {
			-webkit-transform: translateY(1000px);
			transform: translateY(1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}
	@keyframes -global-slide-in-bottom {
		0% {
			-webkit-transform: translateY(1000px);
			transform: translateY(1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}

	@-webkit-keyframes -global-bounce-in-right {
		0% {
			-webkit-transform: translateX(600px);
			transform: translateX(600px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: translateX(68px);
			transform: translateX(68px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: translateX(32px);
			transform: translateX(32px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		90% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: translateX(8px);
			transform: translateX(8px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
	@keyframes -global-bounce-in-right {
		0% {
			-webkit-transform: translateX(600px);
			transform: translateX(600px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: translateX(68px);
			transform: translateX(68px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: translateX(32px);
			transform: translateX(32px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		90% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: translateX(8px);
			transform: translateX(8px);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}

	@-webkit-keyframes -global-swing-in-top-fwd {
		0% {
			-webkit-transform: rotateX(-100deg);
			transform: rotateX(-100deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}
		100% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}
	}
	@keyframes -global-swing-in-top-fwd {
		0% {
			-webkit-transform: rotateX(-100deg);
			transform: rotateX(-100deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}
		100% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}
	}

	@-webkit-keyframes -global-vibrate-1 {
		0% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
		20% {
			-webkit-transform: translate(-2px, 2px);
			transform: translate(-2px, 2px);
		}
		40% {
			-webkit-transform: translate(-2px, -2px);
			transform: translate(-2px, -2px);
		}
		60% {
			-webkit-transform: translate(2px, 2px);
			transform: translate(2px, 2px);
		}
		80% {
			-webkit-transform: translate(2px, -2px);
			transform: translate(2px, -2px);
		}
		100% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
	}
	@keyframes -global-vibrate-1 {
		0% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
		20% {
			-webkit-transform: translate(-2px, 2px);
			transform: translate(-2px, 2px);
		}
		40% {
			-webkit-transform: translate(-2px, -2px);
			transform: translate(-2px, -2px);
		}
		60% {
			-webkit-transform: translate(2px, 2px);
			transform: translate(2px, 2px);
		}
		80% {
			-webkit-transform: translate(2px, -2px);
			transform: translate(2px, -2px);
		}
		100% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
	}

	@-webkit-keyframes -global-bounce-in-bck {
		0% {
			-webkit-transform: scale(7);
			transform: scale(7);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: scale(1.5);
			transform: scale(1.5);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: scale(1.24);
			transform: scale(1.24);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		89% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: scale(1.04);
			transform: scale(1.04);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
	@keyframes -global-bounce-in-bck {
		0% {
			-webkit-transform: scale(7);
			transform: scale(7);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			-webkit-transform: scale(1.5);
			transform: scale(1.5);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		72% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		81% {
			-webkit-transform: scale(1.24);
			transform: scale(1.24);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		89% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		95% {
			-webkit-transform: scale(1.04);
			transform: scale(1.04);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
</style>
