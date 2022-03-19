import ApiConfig from "../config/ApiConfig";

export default function APIDeleteArticle(id){
    return fetch(ApiConfig.adress + 'private/article/'+ id,{
        const t = sessionStorage.getItem('token') || "";
        method: "DELETE",
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${t}`,
    },})
}