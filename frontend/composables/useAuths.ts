export const useAuths = () => {
    const signup = async (username:string,password:string,link:string) => {
        const res = await $fetch(`${link}user`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        }).catch(error => error.data);
        return res;
    }
    const login = async (username:string,password:string,link:string) => {
        const res = await $fetch(`${link}auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        }).catch(error => error.data);
        return res;
    }
    const logout = async () => {
        const userObj = useUserObj();
        userObj.value = {username:"",name:"",id:NaN,userProfile:""}
        const cookie = useCookie('token');
        cookie.value = undefined;
        await navigateTo('/login'); 
    }
    return {signup,login,logout};
}