<script lang="ts">
	export let data;

	let { session, supabase, studentNow } = data;
	$: ({ session, supabase, studentNow } = data);
</script>

<pre>{JSON.stringify(studentNow, null, 2)}</pre>
