import ApiConfig from "../config/ApiConfig";

export default async function APIAddCategory(newCategory, action){
    const t = sessionStorage.getItem('token') || "";
    let reponse = await fetch(ApiConfig.adress + 'private/category',{
        method: action,
        headers: {
            'Authorization': t,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(newCategory)
    })
    if(reponse.status === 200){
        let result = await reponse.json();
        return {status: reponse.status, result: result};
     }else{
         return {status: reponse.status};
     } 
}