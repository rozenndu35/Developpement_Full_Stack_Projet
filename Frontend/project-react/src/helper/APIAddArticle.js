import ApiConfig from "../config/ApiConfig";

export default async function APIAddArticle(article, action){
    const t = sessionStorage.getItem('token') || "";
    let reponse = await fetch(ApiConfig.adress + "private/article",{
        method: action,
        headers: {
            'Authorization': t,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)})
        if(reponse.status === 200){
            let result = await reponse.json();
            return {status: reponse.status, result: result};
         }else{
             return {status: reponse.status};
         } 
}
