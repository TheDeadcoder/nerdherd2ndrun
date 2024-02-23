<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onDestroy } from 'svelte';
	import AgoraRTC, {
		type IAgoraRTCRemoteUser,
		type ILocalVideoTrack,
		type ILocalAudioTrack
	} from 'agora-rtc-sdk-ng';
	import type { PageData } from './$types';

	export let data: PageData;
	const channel = data.channel;
	const uid = parseInt(data.uid);
	const token = data.token;
	const name = data.userNow.name;
	const isTrainer = data.isTrainer;
	console.log(data);

	let users: IAgoraRTCRemoteUser[] = [];
	let video: null | ILocalVideoTrack = null;
	let audio: null | ILocalAudioTrack = null;

	AgoraRTC.setLogLevel(2);
	const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

	const init = async () => {
		[audio, video] = await AgoraRTC.createMicrophoneAndCameraTracks();
		video.play('me');

		client.on('user-published', async (user, type) => {
			if (type === 'audio') {
				await client.subscribe(user, 'audio');
				user.audioTrack?.play();
			} else if (type === 'video') {
				await client.subscribe(user, 'video');
				users = [...users, user];
			}
		});

		client.on('user-left', (u) => {
			users = users.filter((user) => user.uid !== u.uid);
		});

		await client.join(env.PUBLIC_APP_ID, channel, token, uid);
		await client.publish([audio, video]);
	};

	init();

	const renderVideo = (_node: any, user: IAgoraRTCRemoteUser) => {
		user.videoTrack?.play(String(user.uid));
	};

	onDestroy(() => {
		users = [];
		audio?.close();
		video?.close();
		client.leave();
		client.removeAllListeners();
	});

	const unit = 'minmax(0, 1fr) ';
	let innerWidth = 0;
	let innerHeight = 0;
	$: isLandscape = innerWidth > innerHeight;
	$: columnTemplate = isLandscape
		? users.length > 8
			? unit.repeat(4)
			: users.length > 3
			  ? unit.repeat(3)
			  : users.length > 0
			    ? unit.repeat(2)
			    : unit
		: users.length > 7
		  ? unit.repeat(3)
		  : users.length > 1
		    ? unit.repeat(2)
		    : unit;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="container">
	<div class="grid" style="grid-template-columns: {columnTemplate}">
		{#each users as user (user.uid)}
			<div class="cell">
				<div use:renderVideo={user} class="video" id={String(user.uid)} />
				<p class="uid">{user.uid}</p>
			</div>
		{/each}
		<div class="cell">
			<div class="video" id="me" />
			<p class="uid">Me</p>
		</div>
	</div>
</div>

<style>
	.cell {
		position: relative;
	}
	.uid {
		position: absolute;
		padding-left: 10px;
		padding-right: 10px;
		margin: 0;
		bottom: 0;
		right: 0;
		background-color: white;
	}
	.video {
		width: 100%;
		height: 100%;
	}
	.container {
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		width: 95vw;
		margin: auto;
		height: 80vh;
	}
	.grid {
		display: grid;
		width: 100%;
		height: 100%;
	}
</style>
