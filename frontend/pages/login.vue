<script setup type="ts">
    definePageMeta({
        layout:false
    })
    const {login} = useAuths();
    const apiLink = useAPILink();
    const form = reactive({
        username: '',
        password: ''
    })
    const formResult = ref({});
    console.log(formResult.value.message);
    async function handler() {
        formResult.value = await login(form.username,form.password,apiLink.value);
        console.log(formResult.value)
        if (formResult.value.access_token) {
            const token = formResult.value.access_token;
            const cookie = useCookie('token',{expires:new Date().setDate()+7});
            cookie.value = token;
            await navigateTo('/home');
        }
    }
</script>
<template>
    <div class="h-full max-w-screen flex justify-center items-center container mx-auto">
        <div class="bg-red-500 h-full flex-1 flex justify-center items-center">
            <!-- <img src="/favicon.png" class="w-96 h-96 fill-neutral-50" alt=""> -->
            <h1 class="text-white font-black text-7xl">Nest Twitter</h1>
        </div>
        <div class="flex-1 p-12">
            <div class="text-white font-bold">
                <ul class="flex gap-4 text-2xl">
                    <li><NuxtLink to="/">signup</NuxtLink></li>
                    <li><NuxtLink to="/login">login</NuxtLink></li>
                </ul>
            </div>
            <p>Gi tapulan ko</p>
            <h1 class="text-white text-8xl font-black">Here and now</h1>
            <p class="text-white text-4xl font-black mt-4">Login</p>
            <form action="" class="flex flex-col gap-4 mt-8">
                <input v-model="form.username" class="h-12 rounded-md bg-inherit border-2 border-gray-400 p-4 outline-none text-white font-semibold" type="text" placeholder="Username">
                <input v-model="form.password" class="h-12 rounded-md bg-inherit border-2 border-gray-400 p-4 outline-none text-white font-semibold" type="password" placeholder="Password">
                <button @click="handler" type="button" class="flex bg-white border-white  items-center justify-center text-xl h-12 rounded-md bg-inherit border-2 p-4 outline-none font-semibold hover:border-red-500 hover:bg-red-500 hover:text-white active:bg-transparent">Login</button>
            </form>
            <div class="absolute">
                <p class="text-white mt-2" v-if="formResult.message && formResult.message !== 'Unauthorized'">{{formResult.message}}</p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="postcss">
.router-link-exact-active {
    @apply border-b-2 border-white
}
</style>