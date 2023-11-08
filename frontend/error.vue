<script setup>
    defineProps(['error'])
</script>
<template>
    <div class="h-full w-full bg-red-500 ">
        <div class="container mx-auto w-full h-full flex flex-col justify-center items-center bg-black text-white">
            <h1 class="font-black text-9xl text-white">{{ error.statusCode }}</h1>
            <p class="font-bold text-3xl text-red-400">{{ error.message }}</p>
        </div>
    </div>
</template>