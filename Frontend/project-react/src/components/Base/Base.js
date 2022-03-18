import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { render } from "react-dom";
import Body from "../Body/Body";
import Header from "../Header/Header";
import { useSelector, useDispatch } from 'react-redux'
import {handleCloseInfoAction} from "../../store/storeSlice/messageSlice"
import Message from "../Message/Message";
export default function Base({allCategory}){
    const {openInfo,messageInfo ,severityInfo} = useSelector((state)=> state.message)
    const dispatch = useDispatch()
    return(
        <div className="App">
            <Header/>
            <Body
                allCategory={allCategory}/>
            <Message/>
        </div>
    );
}