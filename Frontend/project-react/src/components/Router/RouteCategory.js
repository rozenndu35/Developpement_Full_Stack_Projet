import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";
import ListArticleInCategory from "../ListArticleInCategory/ListArticleInCategory";
import Loading from "../Loading/Loading";
import { useDispatch } from 'react-redux';
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import { prepareMessageError } from "../Message/PrepareMessage";
import getCategory from "../../helper/getCategory";

/**
 * Composant permettant de récupérer une catégorie et de l'afficher
 * @param {*} * permet de déclancher l'affichage d'une alerte
 * @returns 
 */
export default function RouteCategory(){
    let params = useParams();
    let id = params.id;
    const [category, setCategory] = useState();
    const [updateCategory, setUpdateCategory] = useState();
    const dispatch = useDispatch();

    /*
    Recupere la categorie selectionner 
    @param id l'id de la categorie
    */
    useEffect(()=>{
        if(id>=0){
            if(category ==="error")
                setCategory(null);
            getCategory(id)
            .then(data => {
                if(data.status === 200){
                    setCategory(data.result);
                  }else{
                    dispatch(openInfoAction(prepareMessageError("Nous avons rencontrer une erreur avec le server : "+ data.status)))
                  }
            })
            .catch(e => {
                dispatch(openInfoAction(prepareMessageError(e.toString())));
                setCategory("error")
            });
        }
    },[updateCategory, id])

    function verifCategory(category){
        if(category == null)
            return <Loading/>    
        else if(category === "error")
            return <Error error="Impossible de récupérer la catégorie"/>
        else
            return (<ListArticleInCategory category={category} />);
            
    }

    return(verifCategory(category))  
}