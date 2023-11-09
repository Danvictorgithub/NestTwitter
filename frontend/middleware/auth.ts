export default defineNuxtRouteMiddleware(async (to,from) => {
    const token = useCookie('token');
    const apiLink = useAPILink();
    if (token.value === undefined) {
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
