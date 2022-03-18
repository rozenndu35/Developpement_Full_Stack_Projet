import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";
import ListArticleInCategory from "../ListArticleInCategory/ListArticleInCategory";
import Loading from "../Loading/Loading";

/**
 * Composant permettant de récupérer une catégorie et de l'afficher
 * @param {*} * permet de déclancher l'affichage d'une alerte
 * @returns 
 */
export default function RouteCategory({setMessageInfo, setOpenInfo, setSeverityInfo} ){
    let params = useParams();
    let id = params.id;
    const [category, setCategory] = useState();
    const [updateCategory, setUpdateCategory] = useState();
  /*
  Recupere la categorie selectionner 
  @param id l'id de la categorie
  */
 useEffect(()=>{
      if(id>=0){
          if(category ==="error")
            setCategory(null);
      fetch('http://localhost:9000/api/private/category/' + id)
      .then(res => res.json())
      .then(data => {
        setCategory(data);
      })
      .catch(e => {
        setMessageInfo("Erreur : " + e.toString());
        setOpenInfo(true);
        setSeverityInfo("error");
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