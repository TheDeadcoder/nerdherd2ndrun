<script>

    let homeVisible = 0;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const callParent=()=> {
        dispatch('callParentFunction');
    }

    

</script>

<div class="pt-5 w-full mx-auto dark:bg-[#070707] overflow-y-auto ">
    <div class="p-0 flex flex-col w-full">
      
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="cursor-pointer flex-grow px-5 py-1  font-bold text-xl  border-r-4 hover:text-[21px] text-[#57a8d6]  border-[#57a8d6] hover:bg-[#d8f0fd] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                on:click={() => homeVisible = homeVisible^1}
            >
                Home

                {#if  homeVisible===1 }
                    <div>
                        <ul class="flex flex-col">
                            <li class=" cursor-pointer flex-grow px-5 py-1  font-bold hover:text-[21px] text-xl hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/learnerverified/home/recent" >
                                    Recent
                                </a>
                            </li>
                            <li class="cursor-pointer flex-grow px-5 py-1 font-bold text-xl hover:text-[27px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"> 
                                <a href="/learnerverified/home/my" >
                                    My
                                </a>
                            </li>
                            <li class=" cursor-pointer flex-grow px-5 py-1 font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/learnerverified/home/popular" >
                                    Popular
                                </a>
                            </li>
                            <li class="cursor-pointer flex-grow px-5 py-1 font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/learnerverified/home/saved" >
                                    Saved
                                </a>
                            </li>
                        </ul>
                    </div>
                {/if}

            </div>
           
            <div
                class="cursor-pointer flex-grow px-5 py-1 
                       font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
              
            >
                <a href="/learnerverified/library">
                    Library
                </a>
            </div>
            <div
                class="cursor-pointer flex-grow px-5 py-1 
                       font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
             
            >
                <a href="/learnerverified/classes">
                    Classes
                </a>
            </div>
            <div
                class="cursor-pointer flex-grow px-5 py-1 
                       font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/learnerverified/contest">
                    Contest
                </a>
            </div>

            <div
                class="cursor-pointer flex-grow px-5 py-1 
                       font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd] 
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/learnerverified/planner" class="">
                    
                    Planner
                </a>
            </div>

            <div
                class="cursor-pointer flex-grow px-5 py-1
                       font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd] 
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
            
                <a href="/learnerverified/ai/gpt" class="flex items-center ">
                    <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/chat-svgrepo-com.svg" 
                    alt="Dashboard Icon" 
                    class="h-7 ml-1 hover:rotate-12"/>
                    <p style="text-align: center; margin-left: 0.5cm;">
                        ChatBot
                    </p>
                </a>
            </div>

            <div 
                class="cursor-pointer flex-grow px-5 py-1 text-center 
                        font-bold text-xl hover:text-[21px] hover:bg-[#d8f0fd] 
                        border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40] "
            >
                <button on:click={()=>callParent()} class="flex items-center ">
                    <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg" 
                        alt="Dashboard Icon" 
                        class="h-7 ml-1 hover:rotate-12"/>
                    
                        <p style="color: red; font-size: 20px; text-align: center; margin-left: 0.5cm;">
                            Sign Out
                        </p>
                </button>
            </div>
            
     
    </div>
  </div>