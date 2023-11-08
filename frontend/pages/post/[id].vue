<script setup lang="ts">
    definePageMeta({
        middleware:'auth'
    })
    const {id} = useRoute().params;
</script>
<template>
    <article class="flex-1 flex flex-col p-4 w-[600px]">
        <NuxtLink to='/' class="h-12 flex items-center text-white mb-6">
            <span class="material-symbols-outlined text-xl mx-3">arrow_back</span> 
            <p class="text-2xl font-bold">Post</p>
        </NuxtLink>
        <div class="flex items-center justify-between w-full">
            <div class="flex gap-2 mb-4">
                <img src="/profile.jpg" class="rounded-full h-12">
                <div class="">
                    <p class="font-bold text-white">Username</p>
                    <p class="text-gray-600">@Username123</p>
                </div>
            </div>
            <button class="btn text-black border-2 w-24 border-white bg-white hover:bg-black hover:text-white active:bg-white">Follow</button>
        </div>
        <p class="mb-4 text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt, quia ea velit quisquam, magni corporis eos obcaecati libero eveniet.</p>
        <img src="/randompost.jpg" class="rounded-2xl">
        <div class="flex gap-1 text-white mt-4">
            <p>7:38 PM · Oct 21, 2023 ·</p>
            <p class="font-bold">1000 Views</p>
        </div>
        <div class="flex align-center justify-between text-white mt-4 border-b-2 border-white pb-2">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-2xl">forum</span>
                <p>100</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-2xl">favorite</span>
                <p>200</p>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex h-36 mt-4 gap-x-4">
                <img src="/profile.jpg" class="rounded-full h-12 mt-2">
                <div class="py-3 flex-1">
                    <input type="text" class="w-full h-10 mb-4 bg-inherit text-white text-xl placeholder:text-white border-0 outline-none" placeholder="What do you want to say?">
                    <div class="flex items-center justify-between border-t-2 pt-2">
                        <div>   
                            <span class="material-symbols-outlined mr-3 text-white">image</span>
                        </div>
                        <button class="px-2 w-20 btn text-white bg-red-400 ">post</button>
                    </div>
                </div>
            </div>
            <PostComment v-for="i in [1,2,3,4,5]" />>
        </div>
    </article>
</template>