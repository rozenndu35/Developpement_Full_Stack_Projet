import ApiConfig from "../config/ApiConfig";

export default function APIAddArticle(article){
    return fetch(ApiConfig.adress + "private/article",{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)})
        .then(res => res.json())
}