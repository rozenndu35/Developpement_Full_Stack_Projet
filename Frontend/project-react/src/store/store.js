import { configureStore} from "@reduxjs/toolkit"
import allCategoriesSlice from "./storeSlice/allCategoriesSlice"
import messageSlice from "./storeSlice/messageSlice"

export default configureStore({
    reducer:{
        message: messageSlice,
        allCatgories: allCategoriesSlice
    },
})