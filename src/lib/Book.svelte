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

<div class="w-[220px] min-w-[200px] shadow-lg m-2 rounded-lg dark:text-[#e1e1e1] dark:bg-[#070707]">
	<button on:click={() => sendDataToParent(book.content)}>
		<div class="grid grid-rows-[175px_80px] border-1">
			<div class="h-[170px] overflow-hidden">
				<img class="w-[100%] object-cover" src={book.coverimg} alt="" />
			</div>
			<div>
				<h1>{book.title}</h1>
				<h2>{book.author}</h2>
				
			</div>
		</div>
	</button>
</div>
