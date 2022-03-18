import ApiConfig from "../config/ApiConfig";

export default function getAllCategory(){
    return fetch(ApiConfig.adress + 'private/category')
      .then(res => res.json())
}