import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetArticle from "../../helper/getArticle";
import Article from "../Article/Article";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { useDispatch } from 'react-redux'
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import { prepareMessageError } from "../Message/PrepareMessage";

export default function RouteArticle()
{
    const dispatch = useDispatch();
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
        GetArticle(id)
        .then(data => {
            if(data.status === 200){
                setArticle(data.result);
                setArticleStatus("end");
              }else{
                dispatch(openInfoAction(prepareMessageError("Nous avons rencontrer une erreur avec le server : "+ data.status)))
              }
        })
        .catch(e => {
            setArticleStatus("error")
            dispatch(openInfoAction(prepareMessageError(e.toString())))
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
        return (<Article article={article} setArticleStatus={setArticleStatus}/>);  
     }
        return(verifArticle(article))  
}