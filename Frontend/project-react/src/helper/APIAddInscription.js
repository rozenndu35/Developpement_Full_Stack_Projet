import ApiConfig from "../config/ApiConfig";

export default function APIAddInscription(newInscription, action){
    return fetch(ApiConfig.adress + 'public/registration',{
        method: action,
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(newInscription)
    }).then()
}