import ApiConfig from "../config/ApiConfig";

export default async function APIAddInscription(newInscription, action){
    let reponse = await fetch(ApiConfig.adress + 'public/registration',{
        method: action,
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(newInscription)
    });
    if(reponse.status === 200){
        return {status: reponse.status, result: reponse};
     }else{
         return {status: reponse.status};
     } 
}