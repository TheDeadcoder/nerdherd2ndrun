<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { date } from 'zod';
	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;

	function formatDateTime(val) {
		let timestamp = new Date(val);
		if (timestamp) {
			const options = {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
			};
			let formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(timestamp);
			return formattedDateTime;
		}
	}

	let gpticon =
		'https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/chatgpt-icon.svg';
	let usericon =
		'https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/defaultuser.png';
</script>

{#if type === 'user'}
	<div class="flex flex-col space-y-3 justify-end items-end">
		<Avatar src={usericon} width="w-12" />
		<div
			class="card w-fit p-4 rounded-tl-none space-y-2 justify-end bg-emerald-200 hover:bg-emerald-300 rounded-xl"
		>
			<header class="flex justify-between items-center">
				<p class="font-bold">Me</p>
				<small class="opacity-50">{formatDateTime(new Date())}</small>
			</header>
			<p>{message}</p>
		</div>
	</div>
{:else}
	<div class="flex flex-col space-y-3">
		<Avatar src={gpticon} width="w-12" />
		<div
			class="card w-fit p-4 rounded-tl-none space-y-2 justify-end bg-emerald-200 hover:bg-emerald-300 rounded-xl"
		>
			<header class="flex justify-between items-center">
				<p class="font-bold">Bot</p>
				<small class="opacity-50">{formatDateTime(new Date())}</small>
			</header>
			<p>{message}</p>
		</div>
	</div>
{/if}
<!-- <div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image avatar">
		<div class="w-10 rounded-full">
			<img
				src="https://ui-avatars.com/api/?name={type === 'user' ? 'Me' : 'B'}"
				alt="{type} avatar"
			/>
		</div>
	</div>
	<div class="chat-header">
		{type === 'user' ? 'Me' : 'Bot'}
	</div>
	<div class="chat-bubble {type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
		{message}
	</div>
</div> -->
