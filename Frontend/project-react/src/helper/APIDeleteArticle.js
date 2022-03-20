import ApiConfig from "../config/ApiConfig";

export default function APIDeleteArticle(id){
    const t = sessionStorage.getItem('token') || "";
    return fetch(ApiConfig.adress + 'private/article/'+ id,{
        method: "DELETE",
        headers: {
          'Content-Type':'application/json',
          'Authorization': t
    },})
}