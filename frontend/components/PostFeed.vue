<script setup lang="ts">
    const {image} = defineProps({
        image: Boolean,
    })
</script>
<template>
    <div class="" v-if="image">
        <div class="flex gap-3">
            <img src="/profile.jpg" class="rounded-full h-12">
            <div class="pr-4">
                <div class="flex gap-1">
                    <p class="font-bold text-white">Username</p>
                    <p class="text-gray-200">@Username123</p>
                    <p class="text-gray-200">• Oct 22</p>
                </div>
                <p class="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt, quia ea velit quisquam, magni corporis eos obcaecati libero eveniet.</p>
                <img src="/randompost.jpg" class="rounded-2xl">
                <div class="flex align-center justify-between text-white mt-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">forum</span>
                        <p>100</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">equalizer</span>
                        <p>1000</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">favorite</span>
                        <p>200</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="" v-else>
        <div class="flex gap-3">
            <img src="/profile.jpg" class="rounded-full h-12">
            <div class="pr-4">
                <div class="flex gap-1">
                    <p class="font-bold text-white">Username</p>
                    <p class="text-gray-200">@Username123</p>
                    <p class="text-gray-200">• Oct 22</p>
                </div>
                <p class="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt, quia ea velit quisquam, magni corporis eos obcaecati libero eveniet.</p>
                <div class="flex align-center justify-between text-white mt-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">forum</span>
                        <p>100</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">equalizer</span>
                        <p>1000</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">favorite</span>
                        <p>200</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>