<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let data;

	let { session, supabase, classNow, studclass } = data;
	$: ({ session, supabase, classNow, studclass } = data);

	import {isLearnerInClass} from '../../../../../stores/isLearnerInClass'

	onMount(()=>{
		isLearnerInClass.set({classid:classid,isClass:true})
	});
	onDestroy(()=>{
		isLearnerInClass.set({classid:"",isClass:false})
	});

</script>

<pre>{JSON.stringify(classNow, null, 2)}</pre>
<pre>{JSON.stringify(studclass, null, 2)}</pre>
