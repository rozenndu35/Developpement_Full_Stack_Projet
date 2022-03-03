import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'

export default function AddCategory(props) {

    return (
        <div className='App-Formulaire'>
            <h3 className='App-titte-Formulaire' >Ajouter une categorie</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                <TextField name="name" variant="standard" 
                            label="Nom de la categorie :" placeholder="Donne un nom..." helperText={props.inputInvalid}
                            value={props.newCategory.name} onChange={props.handleChange} 
                />
                </div>
                
                <Button className='App-submitButton add-button' variant="contained" onClick={props.submitCategory} endIcon={<SendIcon />}> Envoyer </Button>
            </div>
        </div>
    )
}