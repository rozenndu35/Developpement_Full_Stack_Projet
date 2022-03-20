import ApiConfig from "../config/ApiConfig";

export default function APIAddArticle(article, action){
    const t = sessionStorage.getItem('token') || "";
    return fetch(ApiConfig.adress + "private/articleTest",{
        method: action,
        headers: {
            'Authorization': t,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)})
        .then(res => res.json())
}