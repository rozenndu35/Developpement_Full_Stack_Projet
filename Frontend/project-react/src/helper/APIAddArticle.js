import ApiConfig from "../config/ApiConfig";

export default function APIAddArticle(article, action){
    const t = sessionStorage.getItem('token') || "";
    return fetch(ApiConfig.adress + "private/article",{
        method: action,
        headers: {
            'Authorization': `Bearer ${t}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)})
        .then(res => res.json())
}