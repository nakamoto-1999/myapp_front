import axios from "axios";

export const api = axios.create({
    baseURL : "https://commoard-api.herokuapp.com" ,
    withCredentials : true
});
