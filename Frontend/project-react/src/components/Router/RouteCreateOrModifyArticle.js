import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";


export default function RouterCreateOrModifyArticle(){
    let params = useParams()
    let id = params.id;

    [article, setArticle] = useState()

    function getArticle(id){
        
    }
}