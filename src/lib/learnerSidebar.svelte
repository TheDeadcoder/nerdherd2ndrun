<script>

    let homeVisible = 0;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const callParent=()=> {
        dispatch('callParentFunction');
    }

    

</script>

<div class="pt-5 w-full min-h-screen mx-auto dark:bg-[#070707] overflow-y-auto">
    <div class="p-0 flex flex-col w-full">
      
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="cursor-pointer flex-grow px-5 py-2  font-bold text-[22px]  border-r-4 hover:text-[23px] text-[#57a8d6]  border-[#57a8d6] hover:bg-[#d8f0fd] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                on:click={() => homeVisible = homeVisible^1}
            >
                <div class="flex">
                    <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blogger-color-svgrepo-com.svg"
                    alt="Dashboard Icon" 
                    class="h-7 ml-1 hover:rotate-12"/>
                    <p style="text-align: left; margin-left: 0.5cm;">
                        Blogs
                    </p>
                </div>

                {#if  homeVisible===1 }
                    <div class="ml-10">
                        <ul class="flex flex-col">
                            <li class=" cursor-pointer flex-grow px-5 py-2  font-bold hover:text-[23px] text-[22px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/learnerverified/home/recent" >
                                    Recent
                                </a>
                            </li>
                            <li class=" cursor-pointer flex-grow px-5 py-2  font-bold hover:text-[23px] text-[22px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/learnerverified/home/favourites" >
                                    Favourites
                                </a>
                            </li>
                            <li class="cursor-pointer flex-grow px-5 py-2 font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"> 
                                <a href="/learnerverified/home/Recommended" >
                                    Recommended
                                </a>
                            </li>
                            <li class=" cursor-pointer flex-grow px-5 py-2 font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/learnerverified/home/popular" >
                                    Popular
                                </a>
                            </li>
                            <li class="cursor-pointer flex-grow px-5 py-2 font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/learnerverified/home/saved" >
                                    Saved
                                </a>
                            </li>
                        </ul>
                    </div>
                {/if}

            </div>
           
            <div
                class="cursor-pointer flex-grow px-5 py-2 
                       font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
              
            >
                <a href="/learnerverified/library">
                    <div class="flex">
                        <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/book-opened-svgrepo-com%20(1).svg"
                            alt="Dashboard Icon" 
                            class="h-7 ml-1 hover:rotate-12"/>
                        <p class="pl-5">
                            Library
                        </p>
                    </div>
                </a>
            </div>
            <div
                class="cursor-pointer flex-grow px-5 py-2
                       font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
             
            >
                <a href="/learnerverified/classes">
                    <div class="flex">
                        <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blackboard-class-svgrepo-com.svg" 
                        alt="Dashboard Icon" 
                        class="h-7 ml-1 hover:rotate-12"/>
                        <p class="pl-5">Classes</p>
                    </div>
                </a>
            </div>
            <div
                class="cursor-pointer flex-grow px-5 py-2 
                       font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/learnerverified/contest">
                    <div class="flex">
                        <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/championship-trophy-svgrepo-com.svg" 
                        alt="Dashboard Icon" 
                        class="h-7 ml-1 hover:rotate-12"/>
                            <p class="pl-5">
                                Contest
                            </p>
                    </div>
                </a>
            </div>

            <div
                class="cursor-pointer flex-grow px-5 py-2
                       font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd] 
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/learnerverified/planner" class="">
                    
                   <div class="flex">
                        <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/calendar-svgrepo-com.svg" 
                        alt="Dashboard Icon" 
                        class="h-7 ml-1 hover:rotate-12"/>
                        <p class="pl-5">
                            Planner
                        </p>
                   </div>
                </a>
            </div>

            <div
                class="cursor-pointer flex-grow px-5 py-2
                       font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd] 
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

            <!-- <div 
                class="cursor-pointer flex-grow px-5 py-2 text-center 
                        font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd] 
                        border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4]
                         dark:border-[#a7afb4] dark:hover:bg-[#313b40] "
            >
                <button on:click={()=>callParent()} class="flex items-center ">
                    <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg" 
                        alt="Dashboard Icon" 
                        class="h-7 ml-1 hover:rotate-12"/>
                    
                        <p style="text-align: center; margin-left: 0.5cm;" class="translate-x-2">
                            SignOut
                        </p>
                </button>
            </div>
             -->
     
    </div>
  </div>