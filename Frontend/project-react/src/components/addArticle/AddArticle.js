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
import isString from '../../helper/isString';
import { prepareMessageError, prepareMessageSuccess } from '../Message/PrepareMessage';
import { useDispatch } from 'react-redux'
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import { update } from '../../store/storeSlice/allCategoriesSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import getAuthorByName from '../../helper/getAuthorByName'
import APIAddArticle from '../../helper/APIAddArticle'


export default function AddArticle({ newArticle, author, setAuthor, setArticle, setArticleStatus }) {

    const dispatch = useDispatch();
    const { allCategories } = useSelector((state) => state.allCatgories)

    const categoryElements = allCategories.map(i =>
        <MenuItem key={i.id} value={i.id}>{i.categoryName}</MenuItem>
    )
    const [inputInvalid, setInputInvalid] = useState(false);
    /*
    Modifie la date du nouvelle article
    */
    function handlerArticleDate(value) {
        setArticle(prevState => {
            initInvalidInput();

            return {
                ...prevState,
                publicationDate: value
            }
        })
    }

    /*
    Modifie le nouvelle article
    */
    function newArticleChange(event) {
        const { type, name, value } = event.target;
        if (name === 'category') {
            setArticle(prevState => {
                initInvalidInput();

                return {
                    ...prevState,
                    [name]: { "id": value }
                }
            })
        } else if (type === 'text') {
            if (isString(value)) setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux")
            else {
                if (value.length > 255 && name !== "content") setInputInvalid("Le nombre maximum est de 255 caractere")
                else if (value.length > 10000 && name === "content") setInputInvalid("Le nombre maximum est de 10000 caractere por une description")
                else {
                    if (name.startsWith("author")) {
                        setAuthor(prevState => {
                            initInvalidInput();

                            return {
                                ...prevState,
                                [name.split(".")[1]]: value.toUpperCase()
                            }
                        });
                    } else {
                        setArticle(prevState => {
                            initInvalidInput();

                            return {
                                ...prevState,
                                [name]: value
                            }
                        });
                    }
                }
            }
        }
    }

    /*
    Remet l'input invalide a ca position innitiale false
    */
    function initInvalidInput() {
        setInputInvalid(false);
    }

    /*
    valide l'envoie de l'article
    */
    function submitArticle() {
        if (newArticle.publicationDate !== null && newArticle.title !== "" && newArticle.content !== "" && newArticle.category !== "" && author.firstName !== "" && author.lastName !== "") {
            let articleToSend = newArticle;
            let action = articleToSend.id == null ? "POST" : "PUT";
            getAuthorByName(author.lastName, author.firstName)
                .then(res => {
                    if (res.status === 404) {
                        articleToSend.author = {
                            id: null,
                            firstName: author.firstName,
                            lastName: author.lastName
                        }
                        send(articleToSend, action)
                    } else if (res.status === 200) {
                        res.json().then(function (data) {
                            if (data !== undefined) {
                                articleToSend.author = {
                                    id: data.id,
                                    firstName: author.firstName,
                                    lastName: author.lastName
                                }
                                send(articleToSend, action)
                            }
                        });
                    }
                })
                .catch(e => {
                    dispatch(openInfoAction(prepareMessageError(e.toString())))
                });
        } else {
            setInputInvalid("Vous devez remplir les champs");
        }

    }

    function send(articleToSend, action) {
        APIAddArticle(articleToSend, action)
            .then(data => {
                initInvalidInput();
                dispatch(openInfoAction(prepareMessageSuccess("Ajout de l'article")))
                dispatch(update())
                setArticleStatus("added")
            })
            .catch(e => {
                dispatch(openInfoAction(prepareMessageError(e.toString())))
            });
    }

    return (
        <div className='App-Formulaire'>
            <h3 className='App-titte-Formulaire' >Ajouter un article</h3>
            <div className='App-champ-formulaire'>
                <div className='App-textFieldSimple'>
                    <TextField name="title" variant="standard"
                        label="Titre de l'article :" placeholder="Donne un titre..." helperText={inputInvalid}
                        value={newArticle.title} onChange={newArticleChange}
                    />
                </div>
                <div className='App-textFieldSimple'>
                    <TextField name="author.lastName" variant="standard"
                        label="Nom de l'autheur :" placeholder="Donne un nom..." helperText={inputInvalid}
                        value={author.lastName} onChange={newArticleChange}
                    />
                </div>
                <div className='App-textFieldSimple'>
                    <TextField name="author.firstName" variant="standard"
                        label="Prenom de l'autheur :" placeholder="Donne un prenom..." helperText={inputInvalid}
                        value={author.firstName} onChange={newArticleChange}
                    />
                </div>
                <div className='App-textFieldSimple'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Start Date"
                            value={newArticle.publicationDate}
                            onChange={(newDate) => {
                                handlerArticleDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ width: 240 }} />}
                        />

                    </LocalizationProvider>

                </div>

                <div className='App-textFieldSimple'>
                    <TextField name="content" variant="standard"
                        label="Description :" placeholder="Donne une description..." helperText={inputInvalid}
                        value={newArticle.content} onChange={newArticleChange}
                    />
                </div>
                <div className='App-FormControl'>
                    <FormControl variant="standard">
                        <InputLabel id="demo-simple-select-standard-label">Categorie :</InputLabel>
                        <Select label="Categorie" name='category'
                            value={newArticle.category.id} onChange={newArticleChange} >
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
    newArticle: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    setAuthor: PropTypes.func.isRequired,
    setArticle: PropTypes.func.isRequired,
    setArticleStatus: PropTypes.func.isRequired,

}
