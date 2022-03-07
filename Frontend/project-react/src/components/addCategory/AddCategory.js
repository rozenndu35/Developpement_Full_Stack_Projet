import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'

import PropTypes from 'prop-types'

export default function AddCategory({ newCategory, inputInvalid, handleChange, submitCategory }) {

    return (
        <div className='App-Formulaire'>
            <h3 className='App-titte-Formulaire' >Ajouter une category</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                <TextField name="name" variant="standard" 
                            label="Nom de la category :" placeholder="Donne un nom..." helperText={inputInvalid}
                            value={newCategory.name} onChange={handleChange} 
                />
                </div>
                
                <Button className='App-submitButton add-button' variant="contained" onClick={submitCategory} endIcon={<SendIcon />}> Envoyer </Button>
            </div>
        </div>
    )
}
AddCategory.propTypes = {
    newCategory: PropTypes.object.isRequired,
    inputInvalid: PropTypes.bool.isRequired,
    handleChange :  PropTypes.func.isRequired,
    submitCategory: PropTypes.func.isRequired
}