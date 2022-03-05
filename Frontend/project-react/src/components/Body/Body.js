import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import ListCategory from '../ListCategory/ListCategory';
import AddCategory from '../addCategory/AddCategory';
import AddArticle from '../addArticle/AddArticle';
import './body.css'
import './formulaire.css'
import ListArticleInCategorie from '../ListArticleInCategory/ListArticleInCategorie';


export default function Body(props) {
    const [pageTwo, setPage] = useState();
    const [pageUpdate, setPageUpdate] = useState({update: false, pageId: -1 });
    const [inputInvalid, setInputInvalid] = useState(false);
    const [postingCategory, setPostingCategory] = useState(false);
    const [postingArticle, setPostingArticle] = useState(false);
    const [categorieChoice, setCategorieChoice] = useState();

    const [newCategory, setNewCategory] = useState({
        id: 0,
        name: ""
      });
    const [newArticle, setNewArticle] = useState({
        id: 0,
        name: "",
        author:"",
        datetime: new Date(),
        title: "",
        content: "",
        category: ""

    });
    function isNumber( value){
        return value.match(/^[0-9]+$/);
    }
    function isString( value){
        return value.match(/^.*[<>/\\].*$/);
    }
    

    function newCategoryChange(event) {
        const {name, value} = event.target;
        console.log("___________new change : ");
        console.log(value);
        isString(value) ?
            setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
            :
            value.length > 255 ?
                setInputInvalid("Le nombre maximum est de 255 caractere")
                :
                setNewCategory(prevState => {
                initInvalidInput();

                return {...prevState,
                    id: props.allCategory.length + 1,
                    [name]: value
                }
                });
    }
    
    function newArticleChange(event) {
        console.log("----Event---")
        console.log(event)
        console.log("----Event---")
        const {type, name, value} = event.target;
        console.log("___________new change : ");
        console.log(value);
        name === 'category'?
            setNewArticle(prevState => {
                initInvalidInput();

                return {...prevState,
                    id: props.allArticle.length + 1,
                    [name]: value
                }
            })
        :
        type === 'text' ?
    
        isString(value) ?
            setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
            :value.length > 255 ?
                setInputInvalid("Le nombre maximum est de 255 caractere")
                :
                setNewArticle(prevState => {
                initInvalidInput();

                return {...prevState,
                    id: props.allArticle.length + 1,
                    [name]: value
                }
                })
            
        :
        setInputInvalid("Type non texte") 
    }

    useEffect(() => {
        if (pageUpdate.update) {
            console.log(pageUpdate.pageId)
            setPage(pageUpdate.pageId)
            setPageUpdate({update: false, pageId: -1 });
        }
    }, [pageUpdate]);

    useEffect(() =>{
        if (postingCategory) {
            console.log("ajouter categories : ")
            console.log(newCategory)
            props.allCategory.push(newCategory)
            setPostingCategory(false);
            setNewCategory(prevState => {
                initInvalidInput();

                return {...prevState,
                    id: 0,
                    name: ""
                }
                });
        }
    }, [postingCategory]);
    
    useEffect(() =>{
        if (postingArticle) {
            console.log("ajouter article : ")
            console.log(newArticle)
            props.allArticle.push(newArticle)
            setPostingArticle(false);
            setNewArticle(prevState => {
                initInvalidInput();
                return {...prevState,
                    id: 0,
                    name: "",
                    author:"",
                    datetime: new Date(),
                    title: "",
                    content: "",
                    category: ""
                }
                });
            console.log(props.allArticle)
        }
    }, [postingArticle]);

    function afficherPage(event, id, category) {
        event.stopPropagation();
        setPageUpdate({update: true, pageId: id });
        setCategorieChoice(category)
    }  
    
    function initInvalidInput() {
        setInputInvalid(false);
    }

    function submitCategory() {
        setPostingCategory(true);
    }

    function submitArticle() {
        setPostingArticle(true);
    }

    return (
        <div className='App-body'>
            <Navigation categories={props.allCategory} afficherPage={afficherPage}/>
            <section className='App-page'>
                { pageTwo === "ListeCategory" && <ListCategory categories={props.allCategory}  afficherPage={afficherPage}/>}
                { pageTwo === "ArticleCategory" && <ListArticleInCategorie categorie={categorieChoice} articles={props.articlesInCategory} />}
                { pageTwo === "AddCategory" && <AddCategory newCategory={newCategory} inputInvalid={inputInvalid} handleChange={newCategoryChange} submitCategory={submitCategory}/>}
                { pageTwo === "AddArticle" && <AddArticle newArticle={newArticle} categories={props.allCategory} inputInvalid={inputInvalid} handleChange={newArticleChange} submitArticle={submitArticle}/>}
            </section>

        </div>
    )
}