export const useAPILink = () => useState<string>("apiLink", () => "http://localhost:8080/");
export const useUserObj = () => useState<{authorized:boolean,username:string,id:number}>("userObj", () => {
    return {
        username: "",
        name: "",
        id:null
    }
});