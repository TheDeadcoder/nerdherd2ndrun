<script>
	export let book;
	export let url;
	// import PdfViewer from "svelte-pdf";
	import { onMount } from 'svelte';
	import { isOverlayPdf } from '../stores/OverlayPdf';
	import { createEventDispatcher } from 'svelte';
	import exp from 'constants';

	const dispatch = createEventDispatcher();

	const sendDataToParent = (book_url) => {
		isOverlayPdf.set(true);
		// dispatch('change',{url : book_url})
		url = book_url;
	};
</script>

<div class="w-[250px] min-w-[200px] shadow-lg m-2 rounded-lg dark:text-[#e1e1e1] dark:bg-[#070707]">
	<button on:click={() => sendDataToParent(book.content)}>
		<div class="grid grid-rows-[300px_75px] border-1">
			<div class="h-[120px]">
				<img class="w-[100%]" src={book.coverimg} alt="" />
			</div>
			<div>
				<h1>{book.title}</h1>
				<h2>{book.author}</h2>
				<div class="flex flex-row space-x-2 items-center justify-center">
					<img
						class="w-4 h-4"
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/taka-svgrepo-com.svg"
						alt="taka logo"
					/>
					
				</div>
			</div>
		</div>
	</button>
</div>
