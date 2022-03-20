import { useState } from "react";
import AddInscription from "../Inscription/Inscription";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";


export default function RouteCreateInscription(){
    const [inscriptionStatus, setInscriptionStatus] = useState("end");

    function verifInscription(){
        if(inscriptionStatus === "isLoading")
            return <Loading/>    
        else if(inscriptionStatus === "error")
            return <Error error="Impossible de récupérer l'inscription"/>
        else if (inscriptionStatus === "added"){
            return <Error error="Votre inscription a été ajoutée"/>
        }
            
        return (<AddInscription setInscriptionStatus={setInscriptionStatus}/>);
    }

    return(verifInscription())
}