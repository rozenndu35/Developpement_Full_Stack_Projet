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

/*
champ date a modifier

*/
export default function AddArticle(props) {
    const categoryElements = props.categories.map(i => 
        <MenuItem key={i.id}  value={i.id}>{i.name}</MenuItem>
    )

    return (
        <div className='App-Formulaire'>
            <h3 className='App-titte-Formulaire' >Ajouter un article</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                <TextField name="title" variant="standard" 
                            label="Titre de l'article :" placeholder="Donne un titre..." helperText={props.inputInvalid}
                            value={props.newArticle.title} onChange={props.handleChange} 
                />
                </div>
                <div className='App-textFieldSimple'>
                <TextField name="author" variant="standard" 
                            label="Nom de l'autheur :" placeholder="Donne un nom..." helperText={props.inputInvalid}
                            value={props.newArticle.author} onChange={props.handleChange} 
                />
                </div>
                <div className='App-textFieldSimple'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Start Date"
                            value={props.newArticle.datetime}
                            onChange={(newDate) => {
                            props.handlerArticleDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ width: 240 }}/>}
                        />
                    
                    </LocalizationProvider>

                </div>
                
                <div className='App-textFieldSimple'>
                <TextField name="content" variant="standard" 
                            label="Description :" placeholder="Donne une description..." helperText={props.inputInvalid}
                            value={props.newArticle.content} onChange={props.handleChange} 
                />
                </div>
                <div className='App-FormControl'>
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Categorie :</InputLabel>
                    <Select label="Categorie" name='category'
                        value={props.newArticle.category} onChange={props.handleChange} >
                    {categoryElements}
                    </Select>
                </FormControl>
                </div>
                <Button className='App-submitButton add-button' variant="contained" onClick={props.submitArticle} endIcon={<SendIcon />}> Envoyer </Button>
            </div>
        </div>
    )
}