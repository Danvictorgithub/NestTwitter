<script setup>
    import {useFileDialog} from "@vueuse/core"
    import {sampleSize} from "lodash";
    import {format,compareDesc} from "date-fns"
    import {nanoid} from "nanoid";
    const {username,name,id,userProfile} = useUserObj().value;
    const {logout} = useAuths();
    const apiLink = useAPILink();
    const cookie = useCookie('token');
    // Fetch data
    const {data, error, pending} = await useFetch(`${apiLink.value}user`,{
        // key:useRoute().fullPath,
        lazy:true,
        key:nanoid(),
        transform:(datas) => {
            datas.forEach((data) => {
                data.createdAt = format(new Date(data.createdAt), 'MMM dd yyyy');
            });
            return datas;
        },
        headers: {
            ContentType:'application/json',
            Authorization: `Bearer ${cookie.value}`
        },
        method: 'GET'
    });
    const newUsers = useState("newUsers",() => {
        return data;
    })
    const randomUsers = useState("randomUsers",() => {
        return sampleSize(data.value,5);
    });
    // End fetch data

    // Modal commands
    const modal = ref(false);
    function closeModal() {
        modal.value = false;
    }
    function openModal() {
        modal.value = true;
    }
    // File handling
    const {createPost} = useUser();
    const formResponse = ref("");
    const formData = ref({
        content:'',
        image:null})
    const uploadedImagepreview = ref("");
    const {files,open,reset,onChange} = useFileDialog({
        accept:`image/*`,
        // directory: true
    });
    onChange((files) => {
        formData.value.image = files[0];
        uploadedImagepreview.value = URL.createObjectURL(files[0]);
    })
    async function uploadPost() {
        const result = await createPost(formData.value.content, formData.value.image);
        if (result.statusCode == 400) {
            formResponse.value = result.message;
        }
        else {
            formResponse.value = "";
            reset();
            closeModal();
            return await navigateTo(`/post/${result.id}`);
        }
    }
</script>
<template>
    <div class="top-0 absolute h-full w-full z-10 flex justify-center items-center" v-if="modal">
        <div @click="closeModal" class="bg-slate-700  opacity-75 absolute top-0 h-full w-full"></div>
        <div class="text-white z-20 bg-black rounded-xl w-[600px] mx-4 p-4 flex flex-col">
            <div>
                <button @click="closeModal">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="p-2 flex gap-4 flex-1">
                <img :src="userProfile" class="rounded-full left-6 bottom-0 h-12 w-12 object-cover">
                <div class="w-full">
                    <textarea
                        v-model="formData.content"
                        id="dynamic-textarea"
                        class="min-h-0 bg-black outline-none text-2xl font-medium w-full wrap resize-none overflow-hidden"
                        minlength="1"
                        maxlength="280"
                        placeholder="Say what you want to say"
                        autofocus
                        oninput="this.value = this.value.trim(); this.style.height = ''; this.style.height = (this.scrollHeight) + 'px';"
                    ></textarea>
                    <img class="my-4 rounded-2xl" :src="uploadedImagepreview">
                </div>
            </div>
            <div class="flex items-center justify-between border-t-2 pt-2">
                <div @click="open" class="cursor-pointer flex justify-center items-center">   
                    <span class="material-symbols-outlined mr-3 text-white">image</span>
                </div>
                <button @click="uploadPost" class="px-2 w-20 btn border-red-600 text-white bg-red-600 hover:border-white hover:bg-white hover:text-red-600 active:bg-zinc-950  ">post</button>
            </div>
            <div>
                <p class="text-white">{{formResponse}}</p>
            </div>
        </div>
    </div>



    <div class="flex container mx-auto h-full overflow-auto items-start no-scrollbar">
        
        <header class=" flex flex-col items-end w-[450px] h-full">
            <div class="flex flex-col flex-1 p-4 w-[300px] h-full absolute">
                <div class="">
                    <div class="flex justify-start items-baseline">
                        <img src="/favicon.png" class="h-12 mb-4" alt="logo">
                        <h1 class="text-white font-black text-3xl">Ibon</h1>
                    </div>
                    <nav class="grid gap-4 text-white font-bold text-xl">
                        <NuxtLink class="flex items-center" to="/home"><span class="material-symbols-outlined text-3xl mr-3">home</span>Home</NuxtLink>
                        <NuxtLink class="flex items-center" to="/explore"><span class="material-symbols-outlined text-3xl mr-3">search</span>Explore</NuxtLink>
                        <NuxtLink class="flex items-center" :to="`/profile/${id}`" ><span class="material-symbols-outlined text-3xl mr-3">person</span>Profile</NuxtLink>
                        <button @click="openModal" class="btn border-2 border-red-600 bg-red-600 hover:border-white hover:bg-white hover:text-red-600 active:bg-zinc-950  ">post</button>
                    </nav>
                </div>
                <div class="flex-1 flex items-end ">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex">
                            <span class="material-symbols-outlined text-5xl mr-3 text-white" v-if="userProfile == ''">account_circle</span>
                            <img :src="userProfile" class="rounded-full left-6 bottom-0 h-16 w-16 object-cover" alt="user_profile" v-else>
                            <div class="">
                                <p class="font-bold text-white">{{ name }}</p>
                                <p class="text-gray-600">@{{username}}</p>
                            </div>
                        </div>
                        <button @click="logout" class="hover:bg-white hover:text-black text-white h-12 w-12 rounded-lg">
                            <span class="material-symbols-outlined text-3xl font-black">logout</span>
                        </button> 
                    </div>
                </div>
            </div>
        </header>
        <div class="flex-1 items-stretch flex">
            <slot />
            <div class=" p-4 text-white">
                <div class="w-[350px] flex flex-col gap-2 mb-4 rounded-xl bg-zinc-900 p-4">
                    <h1 class="text-3xl font-bold pb-2">New Users</h1>
                    <User v-for="user in newUsers" :key="nanoid()" v-bind="user"/>
                </div>
                <div class="pb-2 sticky top-10 mb-4 rounded-xl bg-zinc-900 p-4">
                    <h2 class="text-3xl font-bold mb-4">Who to follow</h2>
                    <div class="flex flex-col gap-2 mb-4">
                        <User v-for="user in randomUsers" :key="nanoid()" v-bind="user" />
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>
