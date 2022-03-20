import { createSlice } from '@reduxjs/toolkit'
import { prepareMessageError } from '../../components/Message/PrepareMessage';
import getAllCategory from '../../helper/getAllCategories';
import { openInfoAction } from "../../store/storeSlice/messageSlice";

export const allCategoriesSlice = createSlice({
    name: "allCategories",
    initialState:{
        allCategories: []
    },
    reducers: {
        setAllCategories: (state, action) =>{
            state.allCategories = action.payload;
        }
    },
})

export const update = () =>(dispatch)=>{
    getAllCategory()
    .then(data =>{
        if(data.status === 200){
            dispatch(setAllCategories(data.result))
          }else{
            dispatch(setAllCategories([]))
            dispatch(openInfoAction(prepareMessageError("Nous avons rencontrer une erreur avec le server : "+ data.status)))
          }
    })
    .catch(e =>{
        dispatch(openInfoAction(prepareMessageError(e.toString())))
    })
}
export const {setAllCategories} = allCategoriesSlice.actions


export default allCategoriesSlice.reducer
