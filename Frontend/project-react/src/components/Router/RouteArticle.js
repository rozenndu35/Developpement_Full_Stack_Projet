import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../Article/Article";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

export default function RouteArticle({setMessageInfo, setOpenInfo, setSeverityInfo})
{
    let params = useParams();
    let id = params.id;
    const [article, setArticle] = useState();
    const [updateArticle, setUpdateArticle] = useState();
    const [articleStatus, setArticleStatus] = useState("isLoading");

  /*
  Recupere l'article selectionner where article = articleChoice
  */
  useEffect(() => {
    if(id !== -1){
        setArticleStatus("isLoading");
      fetch('http://localhost:9000/api/private/article/'+id)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setArticleStatus("end");
      })
      .catch(e => {
        setArticleStatus("error")
        setOpenInfo(true);
        setSeverityInfo("error");
        setMessageInfo("Erreur : " + e.toString());

        
      });
    }
    
  }, [id, updateArticle]);

    function verifArticle(article){
        if(articleStatus == "isLoading")
            return <Loading/>    
        else if(articleStatus === "error")
            return <Error error="Impossible de récupérer l'article"/>
        else if (articleStatus === "deleted")
            return <Error error="L'article a été détruit"/>
        return (<Article article={article} setMessageInfo={setMessageInfo} setOpenInfo={setOpenInfo} setSeverityInfo={setSeverityInfo} setArticleStatus={setArticleStatus}/>);
            
     }
    
        return(verifArticle(article))  
}