<script setup>
    defineProps({
        username:String,
        name:String,
        createdAt:String,
    })
</script>
<template>
    <div class="flex gap-2 w-full">
        <img src="/profile.jpg" class="rounded-full h-12">
        <div class="flex flex-col ml-2">
            <div class="flex gap-1">
                <h1 class="font-bold text-white">{{ name }}</h1>
                <p class="text-gray-500">@{{username}}</p>
            </div>
            <p class="text-gray-500">Joined {{ createdAt }}</p>
        </div>
    </div>
</template>