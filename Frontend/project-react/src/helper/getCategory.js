import ApiConfig from "../config/ApiConfig";

export default function getCategory(id){
    return fetch(ApiConfig.adress + 'public/category/'+id)
      .then(res => res.json())
}