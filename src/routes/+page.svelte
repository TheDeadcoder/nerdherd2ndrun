<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	let typingText = '';
	let typingIndex = 0;

	import Footer from '$lib/footer.svelte';

	function typeText() {
		const messages = ['Be a Nerd'];

		let currentIndex = 0;

		function typeNextMessage() {
			if (currentIndex < messages.length) {
				typingText = '';
				typingIndex = 0;
				const message = messages[currentIndex];
				const typingInterval = setInterval(() => {
					if (typingIndex < message.length) {
						typingText += message.charAt(typingIndex);
						typingIndex++;
					} else {
						clearInterval(typingInterval);
						setTimeout(() => {
							eraseText(message);
						}, 1000); // Wait for 1 second before erasing
					}
				}, 200); // Adjust typing speed here (e.g., 100ms for faster typing)
				currentIndex++;
			} else {
				currentIndex = 0; // Restart from the beginning
				typeNextMessage();
			}
		}

		typeNextMessage(); // Start typing the first message
	}

	function eraseText(message) {
		const erasingInterval = setInterval(() => {
			if (typingIndex > 0) {
				typingText = message.slice(0, typingIndex - 1);
				typingIndex--;
			} else {
				clearInterval(erasingInterval);
				setTimeout(() => {
					typeText();
				}, 500); // Wait for 0.5 seconds before typing the next message
			}
		}, 50); // Adjust erasing speed here (e.g., 50ms for faster erasing)
	}

	typeText();
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
<div class="flex justify-center mt-28 mb-28">
	<div class="space-y-10 text-center flex flex-col">
		<div class="flex typing-text">{typingText}</div>
	</div>
</div>
<section class="mt-4 mb-32">
	<div class="flex justify-between mx-auto space-x-40 max-w-7xl">
		<div class="flex flex-col w-1/2">
			<h1 class="text-6xl font-bold font-heading mb-10">Reimagine your study life with us</h1>

			<p class="text-xl font-semibold mb-9">
				The NerDHerd ecosystem is designed to help you quench your thirst for knowledge, keep you up
				to date, saving you from distractions. Engage yourself in class activities in a way you have
				never seen before. Avail your mentor from anywhere. Read the blogs. Visualize with our
				interactive playground. Chat with your personal AI assistant
			</p>
			<a href="/accessType" target="_blank" class="btn variant-filled-primary font-bold text-xl"
				>Get Started For Free</a
			>
		</div>
		<div class="relative flex items-center justify-center w-1/2">
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
				width={448}
				height={448}
				alt="Pixi Logo"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2015.png"
				class="absolute left-12 -top-10"
				width={185}
				height={185}
				alt="Other 15"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Marni%204.png"
				class="absolute -right-8 -top-20"
				width={383}
				height={434}
				alt="Marni 4"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Badrun%204.png"
				class="absolute -left-16 -bottom-32"
				width={427}
				height={427}
				alt="Badrun 4"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2004.png"
				class="absolute -bottom-12 right-20"
				width={164}
				height={164}
				alt="Other 04"
			/>
		</div>
	</div>
</section>
<section class="py-20 max-w-screen-lg mx-auto">
	<div class="flex flex-col justify-center text-center">
		<div class="flex flex-col space-y-3">
			<h2 class="text-4xl font-bold font-heading">All-in-one platform</h2>
			<p>A complete Learning environment in your hand</p>
		</div>
		<div class="flex justify-center mt-12 space-x-8">
			<a
				href="https://www.youtube.com/playlist?list=PLW5antMpb-_N__eq2wEo27CQ-e64B8QhP"
				class="w-1/5 flex items-center btn variant-filled-primary rounded-xl font-bold text-2xl"
			>
				Get Demo
			</a>
			<a
				href="/accessType"
				target="_blank"
				class="w-1/5 flex items-center btn variant-filled-success rounded-xl font-bold text-2xl"
			>
				Get Started
			</a>
		</div>
	</div>
	<div class="grid grid-cols-3 gap-12 mt-20">
		<div
			class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
		>
			<div class="flex space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blogger-color-svgrepo-com.svg"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					width={25}
					height={25}
				/>
				<h5 class="font-bold font-heading">Blogs</h5>
			</div>
			<p>Avail yourself to the most up-to-date educative contents</p>
		</div>
		<div
			class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
		>
			<div class="flex space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connection-network-internet-seo-svgrepo-com.svg"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					width={30}
					height={30}
				/>
				<h5 class="font-bold font-heading">Communicate</h5>
			</div>
			<p>Communicate & Collaborate with groups and achieve goals</p>
		</div>

		<div
			class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
		>
			<div class="flex space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teacher%20(1).svg"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					height={30}
					width={30}
				/>
				<h5 class="font-bold font-heading">Teacher</h5>
			</div>
			<p>Get in touch with any Teacher. Learn Anything</p>
		</div>
		<div
			class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
		>
			<div class="flex space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot.svg"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					height={30}
					width={30}
				/>
				<h5 class="font-bold font-heading">AI Chatbot</h5>
			</div>
			<p>Get help from your personal AI assistant</p>
		</div>
		<div
			class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
		>
			<div class="flex space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/exam-svgrepo-com.svg"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					height={30}
					width={30}
				/>
				<h5 class="font-bold font-heading">Quiz</h5>
			</div>
			<p>Exercise your Brain with our mind-boggling quiz</p>
		</div>
		<div
			class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
		>
			<div class="flex space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/analysis-svgrepo-com.svg"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					height={30}
					width={30}
				/>
				<h5 class="font-bold font-heading">Analysis</h5>
			</div>
			<p>Analyse your Progress & Take steps from Recommendations</p>
		</div>
	</div>
</section>
<section class="relative py-20">
	<div class="mx-auto max-w-7xl">
		<div class="relative flex justify-between">
			<div
				class="bg-secondary w-[263px] h-[263px] rounded-full flex items-center justify-center absolute -left-[5%]"
			>
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2007.png"
					width={182}
					height={182}
					alt="Other 07"
				/>
			</div>
			<div
				class="absolute w-[51px] h-[51px] rounded-full flex items-center justify-center bottom-0 left-[15%] bg-secondary"
			>
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Ball.png"
					width={33}
					height={33}
					alt="Ball"
				/>
			</div>
			<div />
			<div class="flex flex-col items-center w-3/4 z-[2]">
				<div class="relative">
					<div
						class="absolute w-[43px] h-[43px] bg-secondary rounded-full left-[35%] top-[65%] z-[1]"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2002.png"
						width={124}
						height={124}
						alt="Other 02"
						class="relative z-10"
					/>
				</div>
				<div class="flex flex-col">
					<h1 class="text-4xl font-bold leading-[84px] mb-6">
						Discover the Most Up-to-date contents
					</h1>
					<p class="leading-9 mb-6">
						We believe you should have access to the most qualitative educational contents. Quench
						your thirst for knowledge with our advanced educational blogs. You can see and share any
						useful content.
					</p>

					<button type="button" class="btn bg-gradient-to-br variant-gradient-secondary-tertiary">
						<span class="text-xl font-bold">Try now</span>
						<span>
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-svgrepo-com%20(1).svg"
								width={20}
								height={10}
							/>
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="rectangle" />
</section>

<section class="relative py-40">
	<div class="flex justify-between mx-auto space-x-24 max-w-7xl">
		<div class="relative w-1/2">
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
				width={448}
				height={448}
				alt="Gradient Ball"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2019.png"
				width={177}
				height={177}
				alt="Other 19"
				class="absolute -top-20 -left-12"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2010.png"
				width={120}
				height={120}
				alt="Other 10"
				class="absolute -top-20 right-40"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Ikbal%205.png"
				width={413}
				height={413}
				alt="Ikbal 5"
				class="absolute -left-4 top-32"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2018.png"
				width={232}
				height={232}
				alt="Other 18"
				class="absolute top-32 right-16"
			/>
		</div>
		<div class="flex flex-col space-y-10 w-1/2 z-[2]">
			<h1 class="text-4xl font-bold leading-[84px]">Communicate & Collaborate</h1>
			<p class="leading-9">
				Our goal is to provide you with a platform where you can achieve your goal via active
				communicaition & collaboration. We also try to make sure you have minimum possible
				distraction.
			</p>
			<button type="button" class="btn bg-gradient-to-br variant-gradient-secondary-tertiary">
				<span class="text-xl font-bold">Try now</span>
				<span>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-svgrepo-com%20(1).svg"
						width={20}
						height={10}
					/>
				</span>
			</button>
		</div>
	</div>
</section>

<section class="relative py-32">
	<div class="flex justify-between mx-auto space-x-24 max-w-7xl">
		<div class="flex flex-col space-y-10 w-1/2 z-[2]">
			<h1 class="text-4xl font-bold leading-[84px]">Meet Mr. Ashraful</h1>
			<p class="leading-9">
				He is a nice guy. He is happy to help your with your any quest. He is an Artifical
				Intelligence.<span class="font-bold"> Oh oh... Not BORING ChatGPT.</span> But updated version
				with a mega brain🔥👈👉🔥
			</p>
			<button type="button" class="btn bg-gradient-to-br variant-gradient-secondary-tertiary">
				<span class="text-xl font-bold">Try now</span>
				<span>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-svgrepo-com%20(1).svg"
						width={20}
						height={10}
					/>
				</span>
			</button>
		</div>
		<div class="relative flex justify-end w-1/2">
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
				width={448}
				height={448}
				alt="Gradient Ball"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2020.png"
				width={169}
				height={169}
				alt="Other 20"
				class="absolute left-32 -top-10"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2019.png"
				width={158}
				height={158}
				alt="Other 19"
				class="absolute bottom-0 left-20"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Marni%203.png"
				width={537}
				height={537}
				alt="Marni 3"
				class="absolute -bottom-1/3 left-28"
			/>
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2005.png"
				width={179}
				height={179}
				alt="Other 05"
				class="absolute -right-20 top-[30%]"
			/>
		</div>
	</div>
</section>
<footer class="py-20 mt-12">
	<div class="max-w-screen-xl mx-auto flex justify-between space-x-14">
		<div class="flex flex-col space-y-6 w-1/4">
			<div>
				<span class="company-name text-2xl font-extrabold">NerD</span><span
					class="company-name white-text text-2xl font-extrabold">Herd</span
				>
			</div>
			<div class="flex space-x-4">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/facebook.svg"
					alt="Facebook"
					class="transform transition duration-300 hover:rotate-12 hover:scale-110"
				/>
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/twitter.svg"
					alt="Instagram"
					class="transform transition duration-300 hover:rotate-12 hover:scale-110"
				/>
			</div>
		</div>
		<div class="flex flex-col space-y-6 w-1/4">
			<h6 class="font-semibold font-heading">Contact Info</h6>
			<div class="flex items-start space-x-2">
				<img
					src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/location.svg"
					alt="Location Icon"
				/>
				<p>Suhrawardy Hall, BUET</p>
			</div>
			<div class="flex items-center space-x-2">
				<img
					src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
					alt="Phone Icon"
				/>
				<p>+8801759949778</p>
			</div>
			<div class="flex items-center space-x-2">
				<img
					src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
					alt="Email Icon"
				/>
				<p>sakibbuet2k19@gmail.com</p>
			</div>
		</div>
		<div class="flex flex-col space-y-6 w-1/2">
			<h6 class="font-heading font-semibold">Get in touch</h6>
			<form class="flex flex-col space-y-6">
				<input class="input" title="Input (text)" type="text" placeholder="Your Name" />
				<input
					class="input"
					title="Input (email)"
					type="email"
					placeholder="name@example.com"
					autocomplete="email"
				/>
				<textarea class="textarea" rows="4" placeholder="Your message" />
				<div>
					<button class="btn variant-filled-secondary">Send</button>
				</div>
			</form>
		</div>
	</div>
</footer>

<Footer />

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
	.typing-text {
		display: flex;
		align-items: center; /* Center vertically */
		justify-items: center;
		font-size: 60px; /* Increase font size */
		font-weight: 500;
		margin-left: auto; /* Push text to the right */
	}

	/* Add cursor animation */
	.typing-text::after {
		content: '|'; /* Display the cursor */
		animation: blink 1s step-end infinite; /* Blinking cursor */
		margin-left: 0.2rem; /* Adjust cursor placement */
	}
	.client-card {
		@apply bg-white px-[38px] py-8 flex justify-center items-center;
		@apply transition hover:-translate-y-2 cursor-pointer duration-300;
		background: #ebe6fa;
		box-shadow: 0px 30px 40px rgba(212, 217, 232, 0.2);
		border-radius: 16px;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
</style>
