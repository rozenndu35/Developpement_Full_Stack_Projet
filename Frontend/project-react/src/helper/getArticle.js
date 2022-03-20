import ApiConfig from "../config/ApiConfig";

export default async function getArticle(id){
  let reponse = await fetch(ApiConfig.adress + 'public/article/'+id)
    if(reponse.status === 200){
      let result = await reponse.json();
      return {status: reponse.status, result: result};
   }else{
       return {status: reponse.status};
   } 
}