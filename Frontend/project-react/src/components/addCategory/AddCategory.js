import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'

import PropTypes from 'prop-types'
import APIAddCategory from '../../helper/APIAddCategory';
import isString from '../../helper/isString';
import { prepareMessageError, prepareMessageSuccess } from '../Message/PrepareMessage';
import { useDispatch } from 'react-redux'
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import { update } from '../../store/storeSlice/allCategoriesSlice';
import { useState } from 'react';

export default function AddCategory({ newCategory, setCategory, setCategoryStatus}) {

  const [inputInvalid, setInputInvalid] = useState(false);
  const dispatch =  useDispatch();


  /*
    Ajoute la catégorie
  */
    function submitCategory() {
        let action = newCategory.id == null ? "POST" : "PATCH";
        if (newCategory.categoryName !== ""){
            APIAddCategory(newCategory, action)
            .then(data => {
              dispatch(openInfoAction(prepareMessageSuccess("Ajout de la categorie")))
              dispatch(update())
              setCategoryStatus("added")
            })
            .catch(e => {
              dispatch(openInfoAction(prepareMessageError(e.toString())))
            });
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
    Modifie la nouvelle Category
  */
  function handleChange(event) {
    const {name, value} = event.target;
    isString(value) ?
        setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
        :
        value.length > 255 ?
            setInputInvalid("Le nombre maximum est de 255 caractere")
            :
            setCategory(prevState => {
              initInvalidInput();

              return {...prevState,
                  [name]: value
              }
            });
  }
    return (
        <div className='App-Formulaire'>
            <h3 className='App-titte-Formulaire' >Ajouter une categorie</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                <TextField id="categoryName" name="categoryName" variant="standard" 
                            label="Nom de la category :" placeholder="Donne un nom..." helperText={inputInvalid}
                            value={newCategory.categoryName} onChange={handleChange} 
                />
                </div>

                
                <Button className='App-submitButton add-button' variant="contained" onClick={submitCategory} endIcon={<SendIcon />}> Envoyer </Button>
            </div>
        </div>
    )
}
AddCategory.propTypes = {
    newCategory: PropTypes.object.isRequired,
    setCategory: PropTypes.func.isRequired,
    setCategoryStatus : PropTypes.func.isRequired
}