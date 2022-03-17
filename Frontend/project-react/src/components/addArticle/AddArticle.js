import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import PropTypes from 'prop-types'
/*
champ date a modifier

*/
export default function AddArticle({ categories, newArticle, author, inputInvalid, handleChange, handlerArticleDate, submitArticle }) {
    const categoryElements = categories.map(i => 
        <MenuItem key={i.id}  value={i.id}>{i.categoryName}</MenuItem>
    )

    return (
        <div className='App-Formulaire'>
            <h3 className='App-titte-Formulaire' >Ajouter un article</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                <TextField name="title" variant="standard" 
                            label="Titre de l'article :" placeholder="Donne un titre..." helperText={inputInvalid}
                            value={newArticle.title} onChange={handleChange} 
                />
                </div>
                <div className='App-textFieldSimple'>
                <TextField name="author.firstName" variant="standard" 
                            label="Nom de l'autheur :" placeholder="Donne un nom..." helperText={inputInvalid}
                            value={author.firstName} onChange={handleChange} 
                />
                </div>
                <div className='App-textFieldSimple'>
                <TextField name="author.lastName" variant="standard" 
                            label="Prenom de l'autheur :" placeholder="Donne un prenom..." helperText={inputInvalid}
                            value={author.lastName} onChange={handleChange} 
                />
                </div>
                <div className='App-textFieldSimple'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Start Date"
                            value={newArticle.datetime}
                            onChange={(newDate) => {
                                handlerArticleDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ width: 240 }}/>}
                        />
                    
                    </LocalizationProvider>

                </div>
                
                <div className='App-textFieldSimple'>
                <TextField name="content" variant="standard" 
                            label="Description :" placeholder="Donne une description..." helperText={inputInvalid}
                            value={newArticle.content} onChange={handleChange} 
                />
                </div>
                <div className='App-FormControl'>
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Categorie :</InputLabel>
                    <Select label="Categorie" name='category'
                        value={newArticle.category} onChange={handleChange} >
                    {categoryElements}
                    </Select>
                </FormControl>
                </div>
                <Button className='App-submitButton add-button' variant="contained" onClick={submitArticle} endIcon={<SendIcon />}> Envoyer </Button>
            </div>
        </div>
    )
}

AddArticle.propTypes = {
    categories: PropTypes.array.isRequired,
    newArticle: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    inputInvalid: PropTypes.bool.isRequired,
    handleChange :  PropTypes.func.isRequired,
    handlerArticleDate : PropTypes.func.isRequired,
    submitArticle: PropTypes.func.isRequired
}
