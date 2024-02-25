<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let data;
	const { classid } = $page.params;


	let { session, supabase, classNow, studclass } = data;
	$: ({ session, supabase, classNow, studclass } = data);

	
	import {isRunningClass} from '../../../../../stores/isRunningClass'
	import { page } from '$app/stores';

	onMount(()=>{
		isRunningClass.set({classid:classid,isClass:true})
	});
	onDestroy(()=>{
		isRunningClass.set({classid:"",isClass:false})
	});

</script>

<pre>{JSON.stringify(classNow, null, 2)}</pre>
<pre>{JSON.stringify(studclass, null, 2)}</pre>
