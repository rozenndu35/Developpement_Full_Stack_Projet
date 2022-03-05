import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import ListCategory from '../ListCategory/ListCategory';
import ListArticleInCategorie from '../ListArticleInCategory/ListArticleInCategorie';
import AddCategory from '../addCategory/AddCategory';
import AddArticle from '../addArticle/AddArticle';
import Article from '../Article/Article';
import './body.css'
import './formulaire.css'


export default function Body(props) {
    const [page, setPage] = useState();
    const [pageUpdate, setPageUpdate] = useState({update: false, pageId: -1 });

    useEffect(() => {
        if (pageUpdate.update) {
            console.log(pageUpdate.pageId)
            setPage(pageUpdate.pageId)
            setPageUpdate({update: false, pageId: -1 });
        }
    }, [pageUpdate]);

    function afficherPage(event, id, category) {
        event.stopPropagation();
        setPageUpdate({update: true, pageId: id });
        props.setCategoryChoice(category)
    }  
    
    
    return (
        <div className='App-body'>
            <Navigation categories={props.allCategory} afficherPage={afficherPage}/>
            <section className='App-page'>
                { page === "ListeCategory" && <ListCategory categories={props.allCategory}  afficherPage={afficherPage}/>}
                { page === "ArticleCategory" && <ListArticleInCategorie categorie={props.CategoryChoice} articles={props.articlesInCategory} afficherPage={afficherPage}/>}
                { page === "AddCategory" && <AddCategory newCategory={props.newCategory} inputInvalid={props.inputInvalid} handleChange={props.newCategoryChange} submitCategory={props.submitCategory}/>}
                { page === "AddArticle" && <AddArticle newArticle={props.newArticle} categories={props.allCategory} inputInvalid={props.inputInvalid} handleChange={props.newArticleChange} submitArticle={props.submitArticle}/>}
                { page === "Article" && <Article article={props.article} />}
            </section>

        </div>
    )
}