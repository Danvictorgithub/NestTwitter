<template>
    <div class="bg-blue-500 flex-1 flex flex-col">
        <div class="sticky top-0 bg-opacity-80 backdrop-blur-md">
            <h1 class="p-4 text-2xl font-bold">Home</h1>
            <div class="grid grid-cols-2 text-center font-bold text-xl border-b-2 py-4">
                <p>For You</p>
                <p>Following</p>
            </div>
        </div>
        <PostForm />
        <div class="flex flex-col gap-2" >
            <Post v-for="i in [true,false,true,false,true,false,true,false,true,false,true,false,]" :image="i" />
        </div>
    </div>
</template>