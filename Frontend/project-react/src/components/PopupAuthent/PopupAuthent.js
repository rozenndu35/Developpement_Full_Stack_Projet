import {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import './popupAuthent.css'
import Fade from '@material-ui/core/Fade';
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";


export default function PopupAuthent() {
    const [open, setOpen] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setOpen(false);
            navigate('/');
        }, 3000);
        return () => clearInterval(interval);
      }, []);

    return (
        <div className="app_popup_notAuthent">

            <Modal open={open} >
                <Fade in={open}>
                    <div className="popup_notAuthent">
                    <h2 id="parent-modal-title">Vous devez être connecter</h2>
                    <p id="parent-modal-description">
                    Vous allez etre rediriger dans quelque seconde vers la connection
                    </p>
                    <Loading/> 
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


/*import Loading from "../Loading/Loading";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";


export default function PopupAuthent() {

    const [open, setOpen] = useState(true);
    handleClose
    return (
        <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        >
            <Box>
                <h2 id="parent-modal-title">Vous devez être connecter</h2>
                <p id="parent-modal-description">
                Vous allez etre rediriger dans quelque seconde vers la connection
                </p>
                <Loading/> 
            </Box>
        </Modal>
    )
}

*/