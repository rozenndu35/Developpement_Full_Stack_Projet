import ApiConfig from "../config/ApiConfig";

export default function getArticle(id){
    return fetch(ApiConfig.adress + 'private/article/'+id)
      .then(res => res.json())
}