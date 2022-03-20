
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getArticle from "../../helper/getArticle";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import PopupAuthent from "../PopupAuthent/PopupAuthent";
import { prepareMessageError} from '../Message/PrepareMessage';
import { useDispatch } from 'react-redux'
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import AddArticle from "../addArticle/AddArticle";

export default function RouteCreateOrModifyArticle(){
    let params = useParams()
    let id = params.id;
    const dispatch = useDispatch();

    const [articleStatus, setArticleStatus] = useState("isLoading");
    const [article, setArticle] = useState()
    const [author, setAuthor] = useState({
        firstName: null,
        lastName: null
    });

    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            setArticleStatus("redirect");
        }
        else if(id === "new"){
            setArticle({
                id: null,
                author: {
                    id: null
                },
                publicationDate: new Date(),
                title: "",
                content: "",
                category: {
                    id: null
                } 
            })
            setAuthor({
                firstName: "",
                lastName: "",
                id: null,
            })
            setArticleStatus("end")
        }
        else if(id >=0){
            setArticleStatus("isLoading");
            getArticle(id)
            .then(data =>{ 
                if(data.status === 200){
                    let dataArticle = data.result;
                    setArticle({
                        id: dataArticle.id,
                        author: {
                            id: null    //La gestion de l'auteur sera gérée par le state author
                        },   
                        publicationDate: dataArticle.publicationDate,
                        title: dataArticle.title,
                        content: dataArticle.content,
                        category:{
                            id : dataArticle.category.id
                        }
                    })
                    setAuthor({
                        firstName: dataArticle.author.firstName,
                        lastName: dataArticle.author.lastName,
                        id: null,   // Mis à null, puisque il sera récupéré plus tard lors de l'ajout de l'article
                    })
                    setArticleStatus("end")
                  }else{
                    dispatch(openInfoAction(prepareMessageError("Nous avons rencontrer une erreur avec le server : "+ data.status)))
                  }
                
            })
            .catch(e=>{
                dispatch(openInfoAction(prepareMessageError(e.toString())))
                setArticleStatus("error")
            });
        }
    },[id])

    function verifArticle(){
        if(articleStatus === "redirect")
            return <PopupAuthent/> 
        else if(articleStatus === "isLoading")
            return <Loading/>    
        else if(articleStatus === "error")
            return <Error error="Impossible de récupérer l'article"/>
        else if (articleStatus === "added"){
            if(article.id == null)
                return <Error error="L'article a été ajoutée"/>
            return <Error error="L'article' a été modifiée"/>
        }
            
        return (<AddArticle 
                    author={author} 
                    setAuthor={setAuthor} 
                    newArticle={article}
                    setArticleStatus={setArticleStatus}
                    setArticle={setArticle}
                    />);
    }

    return(verifArticle())

}