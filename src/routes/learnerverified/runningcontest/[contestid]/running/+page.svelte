<script lang="ts">
	import Saos from 'saos';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data;

	let { session, supabase, contestNow, studentNow, questions } = data;
	$: ({ session, supabase, contestNow, studentNow, questions } = data);

	let currentQuestionIndex = 0;
	let currentQuestion;
	let timeLeftForAnswer;
	let answerFeedback = '';
	let showWaitingArea = false;
	let countdownTimer;
	let currScore = 0;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

	let currentDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

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

	function moveToWaitingArea(isCorrect, optionIndex = null) {
		showWaitingArea = true;
		let feedbackTime =
			optionIndex !== null ? currentQuestion.time - timeLeftForAnswer : currentQuestion.time;
		setTimeout(() => {
			showWaitingArea = false;
			currentQuestionIndex++;
			loadNextQuestion();
		}, 3000); // Wait for 5 seconds in the waiting area + timeLeftForAnswer * 1000
	}
	let isCorrect;
	async function handleAnswerSubmit(optionIndex) {
		clearInterval(countdownTimer);
		isCorrect = optionIndex === currentQuestion.correct;
		answerFeedback = isCorrect
			? 'Answer is Correct💪'
			: `Incorrect😪! The correct answer is: ${currentQuestion.options[currentQuestion.correct]}`;
		if (isCorrect) {
			currScore += timeLeftForAnswer;
			const { data, error } = await supabase
				.from('pbregistrant')
				.update({ score: currScore })
				.eq('sid', studentNow.id)
				.eq('pbcid', contestNow.id)
				.select();
		}

		moveToWaitingArea(isCorrect, optionIndex);
	}

	function startQuestionTimer() {
		countdownTimer = setInterval(() => {
			timeLeftForAnswer -= 1;
			if (timeLeftForAnswer <= 0) {
				clearInterval(countdownTimer);
				moveToWaitingArea(false); // False indicates no answer was provided
			}
		}, 1000);
	}

	function loadNextQuestion() {
		if (currentQuestionIndex < questions.length) {
			console.log('ekhon ' + currentQuestionIndex);
			isCorrect = false;
			currentQuestion = questions[currentQuestionIndex];
			timeLeftForAnswer = currentQuestion.time;
			startQuestionTimer();
		} else {
			console.log('ekhon jawa lagbe');
			clearInterval(contestTimeCheckInterval); // Clear the interval
			console.log('clear korsi 1');
			clearInterval(countdownTimer); // Clear any ongoing question timer
			console.log('clear korsi 2');
			window.open(`/learnerverified/runningcontest/${contestNow.id}/result`, '_self');
		}
	}

	let contestTimeCheckInterval;
	function checkContestTime() {
		const currentTime = new Date();
		if (currentTime >= contestNow.contestEndTime) {
			clearInterval(contestTimeCheckInterval); // Clear the interval
			clearInterval(countdownTimer); // Clear any ongoing question timer
			window.open(`/learnerverified/runningcontest/${contestNow.id}/result`, '_self');
		}
	}

	onMount(() => {
		if (questions.length > 0) {
			loadNextQuestion();
			contestTimeCheckInterval = setInterval(checkContestTime, 1000);
		}
	});
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
	<section class="mt-6 ml-10 mr-10 items-center justify-center text-center">
		<h1 class="text-4xl font-extrabold">
			{contestNow.title}
		</h1>
	</section>
	{#if showWaitingArea}
		<div class="flex flex-col items-center min-h-screen mb-64 mt-24">
			<div class="text-center">
				{#if isCorrect}
					<Saos animation={'scale-up-center 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/accept-check-good-mark-ok-tick-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-24 mr-1 hover:rotate-12 items-center justify-center"
						/>
					</Saos>
				{:else}
					<Saos animation={'scale-up-center 1s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'}>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/multiply-cross-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-24 mr-1 hover:rotate-12 items-center justify-center"
						/>
					</Saos>
				{/if}
				<p class="text-4xl font-extrabold mb-4">Your Current Score is {currScore}</p>
				<p class="text-2xl font-bold mb-4">Waiting for the next question...</p>
				<p class="text-lg font-semibold">{answerFeedback}</p>
			</div>
		</div>
	{:else if currentQuestion}
		<div class="flex flex-col mt-24 min-h-screen items-center">
			<div class="animate-fadeIn">
				<h2 class="text-3xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2>
				{#if currentQuestion.image}
					<img
						src={currentQuestion.image}
						alt="Dashboard Icon"
						class="h-32 hover:scale-105 items-center justify-center mb-3"
					/>
				{/if}
				<p class="text-xl mb-6">{currentQuestion.body}</p>
				{#each currentQuestion.options as option, index}
					<button
						class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-2 hover:bg-blue-700 transition duration-300 ease-in-out mr-4"
						on:click={() => handleAnswerSubmit(index)}
					>
						{option}
					</button>
				{/each}
				<p class="text-lg mt-4 font-semibold text-center">Time left: {timeLeftForAnswer}s</p>
			</div>
		</div>
	{:else}
		<div class="flex justify-center items-center h-screen mb-48">
			<p>Loading questions...</p>
		</div>
	{/if}
	<!-- <pre>{JSON.stringify(studentNow, null, 2)}</pre>
	<pre>{JSON.stringify(contestWithInfo, null, 2)}</pre> -->
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
