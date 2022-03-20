import isString from "../helper/isString";
import { useState } from "react";
import { TextField , Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { openInfoAction } from "../store/storeSlice/messageSlice";
import { prepareMessageError, prepareMessageSuccess } from '../components/Message/PrepareMessage';
import APILogin from '../helper/APILogin'

export default function InputLog(){

    const [inputInvalid, setInputInvalid] = useState(false);
    const [connectionValue, setConnectionValue] = useState({username:'', password:''});

    const navigate = useNavigate();
    const dispatch =  useDispatch();

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
            
            // 401 mauvais identifiant
            APILogin(connectionValue)
            .then(res => {
                console.log(res.headers.get('authorization'))
                for (let [key, value] of res.headers) {
                    console.log(`${key} = ${value}`);
                  }
                if(res.status === 200){
                    
                    sessionStorage.setItem('token', "dumbvalue");
                    setConnectionValue({username:'', password:''});
                    dispatch(openInfoAction(prepareMessageSuccess("Connecter")))
                    navigate("/home");
                }else{
                    sessionStorage.removeItem('token');
                    dispatch(openInfoAction(prepareMessageError("Vous vous ete tromper dans vos identifiant"))) 
                }
            })
            .catch(e => {
                dispatch(openInfoAction(prepareMessageError(e.toString())))
            });
        }else{
          setInputInvalid("Vous devez remplir les champs");
          sessionStorage.removeItem('token');
      }
    }

    function goInscription(){
        navigate("/inscription");
    }

    return (
        <div className='App-Formulaire connetion'>
            <h3 className='App-titte-Formulaire'>Se connecter</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                    <TextField id="username" name="username" variant="standard" 
                                label="Nom d'utilisateur" placeholder="Mon nom " helperText={inputInvalid}
                                value={connectionValue.username} onChange={handleChange} 
                    />
                </div>
                <div className='App-textFieldSimple'>
                    <TextField id="password" name="password" variant="standard" type="password"
                                label="Mot de passe" placeholder="*****" helperText={inputInvalid}
                                value={connectionValue.password} onChange={handleChange} 
                    />
                </div>
                
                <Button className='App-submitButton add-button' variant="contained" onClick={submitConnection} endIcon={<SendIcon />}> Envoyer </Button>
            </div>
            <p className='App-information'>
                Vous n'avez pas de compte se n'est pas grave ! 
            </p>
            <ul>
                <li> Vous pouvez acceder a nos contenu sans etre connecter</li>
                <li> Vous voulez participer a la création de notre blog et ecrire avec nous inscrivez vous</li>
                <Button className='App-inscriptionButton' variant="contained" onClick={goInscription} endIcon={<SendIcon />}> Inscription </Button>
            </ul>

        </div>
    );
}