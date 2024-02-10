<script lang="ts">
	export let data;

	let { session, supabase, teacherNow } = data;
	$: ({ session, supabase, teacherNow } = data);
</script>

<pre>{JSON.stringify(teacherNow, null, 2)}</pre>
