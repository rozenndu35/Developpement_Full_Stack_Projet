import ApiConfig from "../config/ApiConfig";

export default function getAllCategory(){
    return fetch(ApiConfig.adress + 'public/category')
      .then(res => res.json())
}