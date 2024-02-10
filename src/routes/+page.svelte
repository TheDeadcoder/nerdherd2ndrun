<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	let typingText = '';
	let typingIndex = 0;

	import Footer from '$lib/footer.svelte';

	function typeText() {
		const messages = ['Value Your Time', 'Minimize Abstraction'];

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

<main class="bg-[#e2e6e9]">

	<section class="">
	
		<div class="relative h-[130px] bg-[#B7DBF6]">
			<div class="flex justify-between mx-6 p-6 z-[5]">
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
					<!-- <LightSwitch /> -->
					<a class="btn btn-sm variant-ghost-surface" href="/about" target="_blank" rel="noreferrer">
						About us
					</a>
				</div>
			</div>
		</div>
		


		<div class="relative">
			<div class="wave-header">
				<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
				</svg>
			</div>
		</div>
	</section>
	<!-- <div class="flex justify-center mt-28 mb-153">
		<div class="space-y-10 text-center flex flex-col">
			<div class="flex typing-text">{typingText}</div>
		</div>
	</div> -->
	<section class="mt-[7%] mb-32">
		<div class="flex justify-center mx-auto space-x-40 max-w-7xl">
			<div class="flex flex-col w-1/2 z-[2]">
				<h1 class="text-5xl font-bold font-heading mb-1">Reimagine your study life with us</h1>
				
				<p class="text-l font-semibold mb-9 text-white w-4/5">
					<!-- The NerDHerd ecosystem is designed to help you quench your thirst for knowledge, keep you up
					to date, saving you from distractions. Engage yourself in class activities in a way you have
					never seen before. Avail your mentor from anywhere. Read the blogs. Visualize with our
					interactive playground. Chat with your personal AI assistant -->
	
					Stay with NerDHerd ecosystem and save you precious time. Get everything in one platform to reduce time in browsing to find your solution
				</p>
				<a href="/accessType" target="_blank" class="font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/2 text-center">
					Get Started For Free
				</a>
			</div>
			<div class="relative flex items-center justify-center w-1/2 z-[2]">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
					width="40%"
					height="40%"
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
		<div class="flex justify-center text-center">
			<div class="flex flex-col space-y-3">
				<h2 class="text-4xl font-bold font-heading">All-in-one platform</h2>
				<p>A complete Learning environment in your hand</p>
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
		<div class="flex justify-center mt-12 space-x-8">
			<a
				href="https://www.youtube.com/playlist?list=PLW5antMpb-_N__eq2wEo27CQ-e64B8QhP"
				class="font-bold text-xl  p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/3 text-center"
			>
				Get Demo
			</a>
			<a
				href="/accessType"
				target="_blank"
				class="text-xl p-4 hover:text-[21px] hover:shadow-lg w-1/3 text-center flex items-center btn bg-[#cf9261] hover:bg-[#FFB26D] rounded-xl font-bold"
			>
				Get Started
			</a>
		</div>
	</section>
	<section class="py-20">
		<div class="">
			<div class="grid grid-cols-[40%_60%]  justify-center ">
				
				<div class="flex flex-col items-end pr-[2%] z-[2] ">
						<div class=" h-[100%] w-[50%] flex items-center">
							<div
								class="bg-secondary  flex justify-center  p-12"
							>
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2007.png"
									
									alt="Other 07"
								/>
							</div>
	
							<!-- <div
								class="w-[51px] h-[51px] rounded-full flex items-center justify-center bottom-0 left-[15%] bg-secondary"
							>
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Ball.png"
									width={33}
									height={33}
									alt="Ball"
								/>
							</div> -->
						</div>
				</div>
				<!-- <div /> -->
	
				<div class="flex flex-col items-center z-[2] pl-20">
					<div class="">
						<!-- <div
							class="absolute w-[43px] h-[43px] bg-secondary rounded-full left-[35%] top-[65%] z-[1]"
						/> -->
						<div class="flex items-start">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2002.png"
								width={124}
								height={124}
								alt="Other 02"
								class="relative z-10"
							/>
						</div>
						<!-- </div> -->
	
						<div class="flex flex-col w-3/5">
							<div>
								<p class="text-[48px] font-bold leading-[0px] mb-6 ">
									Discover
								</p>
								<p class="text-[40px] leading-8 mb-2"> the Most Up-to-date contents</p>
								<p class="leading-9 mb-6 text-justify">
									We believe you should have access to the most qualitative educational contents. Quench
									your thirst for knowledge with our advanced educational blogs. You can see and share any
									useful content.
								</p>
			
							</div>
							
							<div>
								<button type="button" class=" btn font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-3/4">
								<span>Try now</span>
								<span>
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-svgrepo-com%20(1).svg"
										width={20}
										height={10}
										alt=""
									/>
								</span>
								</button>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
	
		<!-- <div class="rectangle" /> -->
	</section>
	
	<section class="py-40">
		<div class="grid grid-cols-[65%_35%] justify-center  w-4/5">
			
			<div class="flex justify-end  pr-[10%] items-center ">
				<div class="w-3/5">
					<div class="mb-5">
						<h1 class="text-[40px] font-bold leading-[40px]">Communicate & Collaborate</h1>
						<p class="text-justify">
							Our goal is to provide you with a platform where you can achieve your goal via active
							communicaition & collaboration. We also try to make sure you have minimum possible
							distraction.
						</p>
					</div>
					<div>
						<button type="button" class=" btn font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-3/4">
						<span>Try now</span>
						<span>
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-svgrepo-com%20(1).svg"
								width={20}
								height={10}
								alt=""
							/>
						</span>
						</button>
					</div>
				</div>
			</div>
			<div class="flex justify-center items-center ">
				<div class="relative item-center">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
						width=60%
						height=auto
						alt="Gradient Ball"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2019.png"
						width=35%
						height=auto
						alt="Other 19"
						class="absolute -top-20 -left-12"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2010.png"
						width=30%
						height=auto
						alt="Other 10"
						class="absolute -top-20 right-40"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Ikbal%205.png"
						width=70%
						height=auto
						alt="Ikbal 5"
						class="absolute -left-4 top-32"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2018.png"
						width=40%
						height=auto
						alt="Other 18"
						class="absolute top-32 right-16"
					/>
				</div>
			</div>
		</div>
	</section>
	
	<section class="py-40 ">
		<div class="grid lg:grid-cols-[44%_auto] sm:grid-flow-row ">
			<div class="flex justify-end lg:mr-[-20%]">
				<div class="relative ">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Gradient%20Ball.png"
						width=70%
						height=auto
						alt="Gradient Ball"
						class=""
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2020.png"
						width=30%
						height=auto
						alt="Other 20"
						class="absolute top-[45%] left-[45%]"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2019.png"
						width=35%
						height=auto
						alt="Other 19"
						class="absolute top-[-5%] left-[-15%]"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Marni%203.png"
						width=70%
						height=auto
						alt="Marni 3"
						class="absolute top-[20%]"
					/>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2005.png"
						width=35%
						height=auto
						alt="Other 05"
						class="absolute top-[60%] left-[-10%]"
					/>
				</div>
			</div>
			
			<div class=" pl-8  ">
				<div class="flex items-center  h-[100%]">
					<div class="flex flex-col w-3/5">
						<div class="mb-8">
							<p class="text-[45px] leading-[40px]">Meet<p>
							<p class="text-[45px] leading-[40px] font-bold mb-4">Mr. Ashraful</p>
							<p class="leading-6 text-justify ">
								He is a nice guy. He is happy to help your with your any quest. He is an Artifical
								Intelligence.<span class="font-bold"> Oh oh... Not BORING ChatGPT.</span> But updated version
								with a mega brain🔥👈👉🔥
							</p>
						</div>
						<div>
							<button type="button" class=" btn font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-3/4">
								<span class="text-xl font-bold">Try now</span>
								<span>
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/right-arrow-svgrepo-com%20(1).svg"
										width={20}
										height={10}
										alt=""
									/>
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</section>
	<footer class="py-20 mt-12 z-10">
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
	
	<div class="relative">
		<div class="footer-wave">
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
				<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
				<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
				<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
			</svg>
			
		</div>
		
	</div>
	<Footer />
	
</main>



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
	.wave-header {
		position: absolute;
		top: -50px;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
		z-index: 0;
		
	}

	.wave-header svg {
		position: relative;
		display: block;
		width: calc(181% + 1.3px);
		height: 550px;
		
	}

	.wave-header .shape-fill {
		fill: #b7dbf6;
	}

	.footer-wave{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
	}

	.footer-wave svg {
		position: relative;
		display: block;
		width: calc(160% + 1.3px);
		height: 400px;
	}

	.footer-wave .shape-fill {
		fill: #77B8DE;
	}


</style>
