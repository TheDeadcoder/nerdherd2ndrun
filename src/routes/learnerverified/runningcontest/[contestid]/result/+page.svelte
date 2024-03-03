<script lang="ts">
	import Saos from 'saos';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';

	export let data;

	let { session, supabase, contestNow, studentNow, questions } = data;
	$: ({ session, supabase, contestNow, studentNow, questions } = data);
</script>

<h1>Result Page</h1>
<h1>
	{contestNow.title}
</h1>
<h1>{contestNow.registrant.score}</h1>
<pre>{JSON.stringify(contestNow, null, 2)}</pre>
<pre>{JSON.stringify(studentNow, null, 2)}</pre>
<pre>{JSON.stringify(questions, null, 2)}</pre>
