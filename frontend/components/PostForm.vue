<template>
    <div>
        <div class="flex h-36 p-2">
            <div>
                <span class="material-symbols-outlined text-5xl mr-3">account_circle</span> 
            </div>
            <div class="py-3 flex-1">
                <input type="text" class="w-full h-10 mb-4 bg-inherit text-white text-xl placeholder:text-white border-0 outline-none" placeholder="What do you want to say?">
                <div class="flex items-center justify-between border-t-2 pt-2">
                    <div>   
                        <span class="material-symbols-outlined mr-3 text-white">image</span>
                    </div>
                    <button class="px-2 w-20 btn border-red-600 text-white bg-red-600 hover:border-white hover:bg-white hover:text-red-600 active:bg-zinc-950  ">post</button>
                </div>
            </div>
        </div>
    </div>
</template>