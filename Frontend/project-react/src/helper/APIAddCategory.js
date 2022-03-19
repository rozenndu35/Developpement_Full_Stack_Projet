import ApiConfig from "../config/ApiConfig";

export default function APIAddCategory(newCategory, action){
    return fetch(ApiConfig.adress + 'private/category',{
        method: action,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(newCategory)
    }).then(res => res.json())
}