import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import ListCategory from '../ListCategory/ListCategory';
import AddCategory from '../addCategory/AddCategory';
import './body.css'
import './formulaire.css'


export default function Body(props) {
    const [pageTwo, setPage] = useState();
    const [pageUpdate, setPageUpdate] = useState({update: false, pageId: -1 });
    const [inputInvalid, setInputInvalid] = useState(false);
    const [postingCategory, setPostingCategory] = useState(false);

    const [newCategory, setNewCategory] = useState({
        id: 0,
        name: ""
      });

    function isNumber( value){
        return value.match(/^[0-9]+$/);
    }
    function isString( value){
        return value.match(/^.*[<>/\\].*$/);
    }
    

    function newCategoryChange(event) {
        const {name, value} = event.target;
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
    
    useEffect(() => {
        if (pageUpdate.update) {
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
    
    function afficherPage(event, id, category) {
        event.stopPropagation();
        setPageUpdate({update: true, pageId: id });
    }  
    
    function initInvalidInput() {
        setInputInvalid(false);
    }

    function submitCategory() {
        setPostingCategory(true);
    }

    return (
        <div className='App-body'>
            <Navigation categories={props.allCategory} afficherPage={afficherPage}/>
            <section className='App-page'>
                { pageTwo === "ListeCategory" && <ListCategory categories={props.allCategory} />}
                { pageTwo === "AddCategory" && <AddCategory newCategory={newCategory} inputInvalid={inputInvalid} handleChange={newCategoryChange} submitCategory={submitCategory}/>}
            </section>

        </div>
    )
}