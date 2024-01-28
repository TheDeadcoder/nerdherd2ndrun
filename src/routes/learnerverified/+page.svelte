<script lang="ts">
	import { redirect } from '@sveltejs/kit';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		throw redirect(303, '/accessType');
	};

	console.log(data.session);
</script>

<h1>learner logged in</h1>
<button on:click={handleSignOut}>Sign out</button>
