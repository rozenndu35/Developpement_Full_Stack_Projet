import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCategory from "../../helper/getCategory";
import AddCategory from "../addCategory/AddCategory";
import PopupAuthent from "../PopupAuthent/PopupAuthent";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { prepareMessageError } from '../Message/PrepareMessage';
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import { useDispatch } from 'react-redux'


export default function RouteCreateOrModifyCategory(){
    let params = useParams()
    let id = params.id;

    const dispatch =  useDispatch();

    const [categoryStatus, setCategoryStatus] = useState("isLoading");
    const [category, setCategory] = useState()

    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            setCategoryStatus("redirect");
        }
        else if(id === "new"){
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
                if(data.status === 200){
                    setCategory({
                        id : data.result.id,
                        categoryName: data.result.categoryName
                    });
                    setCategoryStatus("end")
                }else{
                    dispatch(openInfoAction(prepareMessageError("Nous avons rencontrer une erreur avec le server : "+ data.status)))
                }
                
            })
        }
    },[id])

    function verifCategory(){
        if(categoryStatus === "redirect")
            return <PopupAuthent/> 
        else if(categoryStatus === "isLoading")
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