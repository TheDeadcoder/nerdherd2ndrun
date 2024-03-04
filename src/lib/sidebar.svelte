<script>

    let homeVisible = 0;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const callParent=()=> {
        dispatch('callParentFunction');
    }

    

</script>

<div class="pt-5 w-full mx-auto dark:bg-[#070707]">
    <div class="p-0 flex flex-col w-full min-h-[100vh] pb-[100px]">
      
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="cursor-pointer  px-5 py-2  font-bold text-[22px]  border-r-4 hover:text-[23px] text-[#57a8d6]  border-[#57a8d6] hover:bg-[#d8f0fd] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                on:click={() => homeVisible = homeVisible^1}
            >
                <div class="flex items-center ">
                    <img src=" https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
                    alt="Dashboard Icon" 
                    class="h-7 ml-1 hover:rotate-12"/>
                    <p style="text-align: left; margin-left: 0.5cm;">
                        Blogs
                    </p>
                </div>
               

                {#if  homeVisible===1 }
                    <div class="ml-8 mt-3">
                        <ul class="flex flex-col">
                            <li class=" cursor-pointer  px-5 py-2  font-bold hover:text-[23px] text-[22px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/trainerverified/home/recent" >
                                    Recent
                                </a>
                            </li>
                            <li class="cursor-pointer px-5 py-2  font-bold hover:text-[23px] text-[22px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"> 
                                <a href="/trainerverified/home/my" >
                                    My
                                </a>
                            </li>
                            <li class="cursor-pointer  px-5 py-2  font-bold hover:text-[23px] text-[22px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/trainerverified/home/popular" >
                                    Popular
                                </a>
                            </li>
                            <li class="cursor-pointer px-5 py-2  font-bold hover:text-[23px] text-[22px] hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/trainerverified/home/saved" >
                                    Saved
                                </a>
                            </li>
                        </ul>
                    </div>
                {/if}

            </div>
           
            <div
                class="cursor-pointer px-5 py-2 
                font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
       
            >
                <a href="/trainerverified/library" class="flex items-center ">
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
                class="cursor-pointer px-5 py-2 
                font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
       
            >
                <a href="/trainerverified/classes" class="flex items-center">
                    <div class="flex">
                        <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/blackboard-class-svgrepo-com.svg" 
                        alt="Dashboard Icon" 
                        class="h-7 ml-1 hover:rotate-12"/>
                        <p class="pl-5">Classes</p>
                    </div>
                </a>
            </div>
            <div
                class="cursor-pointer px-5 py-2 
                font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
       
            >
                <a href="/trainerverified/contest" class="flex items-center ">
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
                class="cursor-pointer px-5 py-2 
                font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
       
            >
                <a href="/trainerverified/planner" class="flex items-center">
                    <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/calendar-svgrepo-com.svg" 
                    alt="Dashboard Icon" 
                    class="h-7 ml-1 hover:rotate-12"/>
                    <p style="text-align: left; margin-left: 0.5cm;">
                        Planner
                    </p>
                </a>
            </div>

            <div
                class="cursor-pointer  px-5 py-2 
                font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
                border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
       
            >
            
                <a href="/trainerverified/ai/gpt" class="flex items-center ">
                    <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/bot.png" 
                    alt="Dashboard Icon" 
                    class="h-7 ml-1 hover:rotate-12"/>
                    <p style="text-align: left; margin-left: 0.5cm;">
                        ChatBot
                    </p>
                </a>
            </div>

            <div
                class="cursor-pointer flex-none px-5 py-5 text-center font-bold text-2xl hover:text-[27px] hover:bg-[#d8f0fd] border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40] mt-auto"
            >
                <button on:click={() => callParent()} class="flex items-center justify-center">
                    <img
                        src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg"
                        alt="Dashboard Icon"
                        class="h-7 ml-1 hover:rotate-12 rotate-180"
                    />

                    <p style="color: red; font-size: smaller; text-align: center; margin-left: 0.5cm;">
                        Go Back
                    </p>
                </button>
            </div>
            <!-- <div 
                class="cursor-pointer flex-grow px-5 py-5 text-center 
                        font-bold text-2xl hover:text-[27px] hover:bg-[#d8f0fd] 
                        border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40] "
            >
                <button on:click={()=>callParent()} class="flex items-center">
                    <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg" 
                        alt="Dashboard Icon" 
                        class="h-7 ml-1 hover:rotate-12"/>
                    
                        <p style="color: red; font-size: smaller; text-align: left; margin-left: 0.5cm;">
                            Sign Out
                        </p>
                </button>
            </div> -->
            
     
    </div>
  </div>