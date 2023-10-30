import axios from "axios"
export const appAxios=axios.create({
    baseURL:  "https://localhost:44373/api/app"
    
});