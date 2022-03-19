import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'

import PropTypes from 'prop-types'
import APIAddInscription from '../../helper/APIAddInscription';
import isString from '../../helper/isString';
import { prepareMessageError, prepareMessageSuccess } from '../Message/PrepareMessage';
import { useDispatch } from 'react-redux'
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import { update } from '../../store/storeSlice/allCategoriesSlice';
import { useState } from 'react';

export default function Inscription({setInscriptionStatus}) {

  const [inputInvalid, setInputInvalid] = useState(false);
  const dispatch =  useDispatch();

  const [newInscription, setNewInscription] = useState({username:'', password:''});

  /*
    Ajoute l'inscription'
  */
    function submitInscription() {
        if (newInscription.username !=="" && newInscription.password !== ""){
            APIAddInscription(newInscription, "POST")
            .then(data => {
                dispatch(openInfoAction(prepareMessageSuccess("Inscription effectuer")))
                dispatch(update())
                setInscriptionStatus("added")
            })
            .catch(e => {
              dispatch(openInfoAction(prepareMessageError(e.toString())))
            });
            dispatch(openInfoAction(prepareMessageSuccess("Inscription effectuer")))
            dispatch(update())
            setInscriptionStatus("added")
        }else{
          setInputInvalid("Vous devez remplir les champs");
      }
    }

/*
Remet l'input invalide a ca position innitiale false
  */
  function initInvalidInput() {
    setInputInvalid(false);
  }

  /*
    Modifie la nouvelle inscription
  */
  function handleChange(event) {
    const {name, value} = event.target;
    isString(value) ?
        setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
        :
        value.length > 255 ?
            setInputInvalid("Le nombre maximum est de 255 caractere")
            :
            setNewInscription(prevState => {
              initInvalidInput();

              return {...prevState,
                  [name]: value
              }
            });
  }
    return (
        <div className='App-Formulaire'>
            <h3 className='App-titte-Formulaire' >Formulaire d'inscription</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                <TextField id="username" name="username" variant="standard" 
                            label="Votre pseudo :" placeholder="Donne un pseudo..." helperText={inputInvalid}
                            value={newInscription.username} onChange={handleChange} 
                />
                </div>
                <div className='App-textFieldSimple'>
                <TextField id="password" name="password" variant="standard" type="password" 
                            label="Votre mot de passe :" placeholder="***" helperText={inputInvalid}
                            value={newInscription.password} onChange={handleChange} 
                />
                </div>
                <Button className='App-submitButton add-button' variant="contained" onClick={submitInscription} endIcon={<SendIcon />}> Envoyer </Button>
            </div>
        </div>
    )
}
Inscription.propTypes = {
    setInscriptionStatus : PropTypes.func.isRequired
}