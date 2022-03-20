import ApiConfig from "../config/ApiConfig";

export default async function getLogin(user){
    let reponse = await fetch(ApiConfig.adress + "public/login",{
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)})

        if(reponse.status === 200){
            let result = await reponse.json();
            return {status: reponse.status, result: result};
         }else{
             return {status: reponse.status};
         } 
}
