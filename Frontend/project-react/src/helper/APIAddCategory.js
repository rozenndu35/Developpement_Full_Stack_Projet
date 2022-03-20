import ApiConfig from "../config/ApiConfig";

export default function APIAddCategory(newCategory, action){
    const t = sessionStorage.getItem('token') || "";
    return fetch(ApiConfig.adress + 'private/category',{
        method: action,
        headers: {
            'Authorization': t,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(newCategory)
    }).then(res => res.json())
}