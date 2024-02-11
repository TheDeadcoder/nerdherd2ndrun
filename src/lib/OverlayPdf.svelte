<script>
	// import PdfViewer from "svelte-pdf";
    import {clickOutside} from '../stores/clickOutside'
    import {isOverlayPdf} from '../stores/OverlayPdf.js'

    export let url;

    let buttons = ["navigation", "zoom", "rotate", "download", "timeInfo", "pageInfo"]

    const handleClickOutside = (e)=>{
         isOverlayPdf.set(false);
    }

</script>

<div class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
    <div class="w-1/2 h-3/4" use:clickOutside on:click_outside={handleClickOutside} >
         <iframe src={url} width="100%" height="100%" title=""></iframe>
         <!-- <div style="width: 50%;" use:clickOutside on:click_outside={handleClickOutside} >
              <PdfViewer scale=1 showBorder=False url={book.url}/> -->
             <!-- <PdfViewer scale=0.5 showBorder=False url={url}
                        showButtons = {buttons}
             />
         </div>       --> 
    </div> 

</div>