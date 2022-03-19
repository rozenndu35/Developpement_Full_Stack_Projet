import isString from "../helper/isString";
import { useState } from "react";
import { TextField , Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send"
import { useNavigate } from "react-router-dom";

export default function InputLog(){

    const [inputInvalid, setInputInvalid] = useState(false);
    const [connectionValue, setConnectionValue] = useState({username:'', password:''});

    let navigate = useNavigate();
    /*
        Modifie la connection
    */
    function handleChange(event) {
        const {name, value} = event.target;
        isString(value) ?
        setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
        :
        value.length > 255 ?
            setInputInvalid("Le nombre maximum est de 255 caractere")
            :
            setConnectionValue(prevState => {
                initInvalidInput();

                return {...prevState,
                    [name]: value
                }
            });
    }
    /*
        Remet l'input invalide a ca position innitiale false
    */
    function initInvalidInput() {
        setInputInvalid(false);
    }
  /*
    Ajoute la catégorie
  */
    function submitConnection() {
        if (connectionValue.username !== '' && connectionValue.password !== ""){
            console.log(connectionValue)
            sessionStorage.setItem('token', "dumbvalue");
            navigate("/home");
        }else{
          setInputInvalid("Vous devez remplir les champs");
          sessionStorage.removeItem('token');
      }
    }


    return (
        <div>
            <h1>Se connecter</h1>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                    <TextField id="username" name="username" variant="standard" 
                                label="Nom d'utilisateur" placeholder="Mon nom " helperText={inputInvalid}
                                value={connectionValue.username} onChange={handleChange} 
                    />
                    <TextField id="password" name="password" variant="standard" type="password"
                                label="Mot de passe" placeholder="*****" helperText={inputInvalid}
                                value={connectionValue.password} onChange={handleChange} 
                    />
                </div>

                
                <Button className='App-submitButton add-button' variant="contained" onClick={submitConnection} endIcon={<SendIcon />}> Envoyer </Button>
            </div>

        </div>
    );
}