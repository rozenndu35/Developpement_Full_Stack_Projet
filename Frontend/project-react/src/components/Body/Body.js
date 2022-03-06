import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import ListCategory from '../ListCategory/ListCategory';
import ListArticleInCategory from '../ListArticleInCategory/ListArticleInCategory';
import AddCategory from '../addCategory/AddCategory';
import AddArticle from '../addArticle/AddArticle';
import Article from '../Article/Article';
import './body.css'
import './formulaire.css'



export default function Body(props) {
    const [page, setPage] = useState();
    const [pageUpdate, setPageUpdate] = useState({update: false, pageId: -1 });
    
    /*
        modifie l'identifiant de la page a afficher
    */
    useEffect(() => {
        if (pageUpdate.update) {
            setPage(pageUpdate.pageId)
            setPageUpdate({update: false, pageId: -1 });
        }
    }, [pageUpdate]);

    /*
        modifie l'identifiant de la page a afficher
        @param event : l'evenement
        @param id ; l'identifiant de la page
        @param categoryOrArticle : l'identifiant de la catégorie ou de l'article afficher dans la page
    */
    function afficherPage(event, id, categoryOrArticle) {
        event.stopPropagation();
        setPageUpdate({update: true, pageId: id });
        if(id === "Article"){
            props.setArticleChoice(categoryOrArticle);
        }else if (id === "ArticleCategory"){
            props.setCategoryChoice(categoryOrArticle);
        }
        
    }  
    
    
    return (
        <div className='App-body'>
            <Navigation categories={props.allCategory} afficherPage={afficherPage}/>
            <section className='App-page'>
                { page === "ListeCategory" && <ListCategory categories={props.allCategory}  afficherPage={afficherPage}/>}
                { page === "ArticleCategory" && <ListArticleInCategory category={props.category} articles={props.articlesInCategory} afficherPage={afficherPage}/>}
                { page === "AddCategory" && <AddCategory newCategory={props.newCategory} inputInvalid={props.inputInvalid} handleChange={props.handlerCategory} submitCategory={props.submitCategory}/>}
                { page === "AddArticle" && <AddArticle newArticle={props.newArticle} categories={props.allCategory} inputInvalid={props.inputInvalid} handleChange={props.handlerArticle} handlerArticleDate={props.handlerArticleDate} submitArticle={props.submitArticle}/>}
                { page === "Article" && <Article article={props.article} />}
            </section>

        </div>
    )
}