import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { render } from "react-dom";
import Body from "../Body/Body";
import Header from "../Header/Header";

export default function Base({allCategory, openInfo, severityInfo, handleCloseInfo, messageInfo}){

    return(
        <div className="App">
            <Header/>
            <Body
                allCategory={allCategory} />
            <Snackbar open={openInfo} autoHideDuration={6000} onClose={handleCloseInfo}>
                <Alert onClose={handleCloseInfo} severity={severityInfo} sx={{ width: '100%' }}>
                    {messageInfo}
                </Alert>
            </Snackbar>
        </div>
    );
}