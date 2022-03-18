import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
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
        dispatch(setAllCategories(data))
    })
    .catch(e =>{
        dispatch(openInfoAction(prepareMessageError(e.toString())))
    })
}
export const {setAllCategories} = allCategoriesSlice.actions


export default allCategoriesSlice.reducer
