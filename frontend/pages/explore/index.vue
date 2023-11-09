<script setup lang="ts">
    definePageMeta({
        middleware:'auth'
    })
</script>
<template>
    <div class="flex-1 flex flex-col w-[600px] text-white p-2">
        <div class="sticky top-0 bg-opacity-80 backdrop-blur-md">
            <h1 class="p-4 text-2xl font-bold">Explore</h1>
        </div>
        <div class="flex flex-col gap-2" >
            <!-- <PostFeed v-for="i in [true,false,true,false,true,false,true,false,true,false,true,false,]" :image="i" /> -->
        </div>
    </div>
</template>