import ApiConfig from "../config/ApiConfig";

export default function getLogin(user){
    return fetch(ApiConfig.adress + "public/login",{
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)})

        .then(res =>{
            if(res.status === 200){
               return res.json()
            }else{
                return res.status;
            } })
}