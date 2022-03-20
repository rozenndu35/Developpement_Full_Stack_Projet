import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import {handleCloseInfoAction} from "../../store/storeSlice/messageSlice"


export default function Message(){
    const {openInfo,messageInfo ,severityInfo} = useSelector((state)=> state.message)
    const dispatch = useDispatch()
    return(
        <Snackbar open={openInfo} autoHideDuration={6000} onClose={()=>{dispatch(handleCloseInfoAction())}}>
            <Alert onClose={()=>{dispatch(handleCloseInfoAction())}} severity={severityInfo} sx={{ width: '100%' }}>
                {messageInfo}
            </Alert>
        </Snackbar>
    )
}

