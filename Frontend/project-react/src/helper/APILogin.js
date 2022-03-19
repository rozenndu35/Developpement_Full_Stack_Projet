import ApiConfig from "../config/ApiConfig";

export default function getLogin(user){
    return fetch(ApiConfig.adress + "public/login",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)})
        .then(res => res.json())
}