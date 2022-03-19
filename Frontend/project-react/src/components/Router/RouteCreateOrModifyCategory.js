import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCategory from "../../helper/getCategory";
import AddCategory from "../addCategory/AddCategory";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";


export default function RouteCreateOrModifyCategory(){
    let params = useParams()
    let id = params.id;

    const [categoryStatus, setCategoryStatus] = useState("isLoading");
    const [category, setCategory] = useState()

    useEffect(()=>{
        if(id === "new"){
            setCategory({
                id: null,
                categoryName: "",
                article: []
            })
            setCategoryStatus("end")
        }
        else if(id >=0){
            setCategoryStatus("isLoading");
            getCategory(id)
            .then(data =>{
                setCategory({
                    id : data.id,
                    categoryName: data.categoryName
                });
                setCategoryStatus("end")
            })
        }
    },[id])

    function verifCategory(){
        if(categoryStatus == "isLoading")
            return <Loading/>    
        else if(categoryStatus === "error")
            return <Error error="Impossible de récupérer l'article"/>
        else if (categoryStatus === "added"){
            if(category.id == null)
                return <Error error="La catégorie a été ajoutée"/>
            return <Error error="La catégorie a été modifiée"/>
        }
            
        return (<AddCategory newCategory={category} setCategory={setCategory} setCategoryStatus={setCategoryStatus}/>);
    }

    return(verifCategory())
}