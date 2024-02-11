<script lang="ts">
	export let data;

	let { session, supabase, classNow, studclass } = data;
	$: ({ session, supabase, classNow, studclass } = data);
</script>

<pre>{JSON.stringify(classNow, null, 2)}</pre>
<pre>{JSON.stringify(studclass, null, 2)}</pre>
