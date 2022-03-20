import ApiConfig from "../config/ApiConfig";

export default function getArticle(id){
    return fetch(ApiConfig.adress + 'public/article/'+id)
      .then(res => res.json())
}