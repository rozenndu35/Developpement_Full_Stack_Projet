import ApiConfig from "../config/ApiConfig";

export default function APIDeleteArticle(id){
    return fetch(ApiConfig.adress + 'private/article/'+ id,{
        method: "DELETE",
        headers: {
          'Content-Type':'application/json',
    },})
}