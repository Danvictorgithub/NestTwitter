export default defineNuxtRouteMiddleware(async (to,from) => {
    const config = useRuntimeConfig()
    const token = useCookie('token');
    const apiLink = useAPILink();
    console.log(token.value === undefined);
    if (token.value === undefined) {
        console.log('This is called');
        return await navigateTo('/login'); 
    }
    // Verify token
    let isInvalidToken = null;
    const result:any = await $fetch(`${apiLink.value}auth/validate`,{
        headers:{
            Authorization: `Bearer ${token.value}`,
            ContentType: 'application/json',
        },
        method: 'GET',
    }).catch(async () => {
        isInvalidToken = true;
    });
    if (isInvalidToken) {
        return await navigateTo('/login',{ redirectCode: 301 });
    }
    if (result) {
        const userObj = useUserObj();
        userObj.value = result;
    }
})
