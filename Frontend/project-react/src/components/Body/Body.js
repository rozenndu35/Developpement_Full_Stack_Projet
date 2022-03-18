import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import ListCategory from '../ListCategory/ListCategory';
import ListArticleInCategory from '../ListArticleInCategory/ListArticleInCategory';
import AddCategory from '../addCategory/AddCategory';
import AddArticle from '../addArticle/AddArticle';
import Article from '../Article/Article';
import './body.css'
import './formulaire.css'

import { Outlet } from 'react-router-dom';

import PropTypes from 'prop-types'

export default function Body({setArticleChoice, setCategoryChoice, allCategory, category, newCategory, handlerCategory, submitCategory, articlesInCategory, article, newArticle, author, handlerArticle,handlerArticleDate, submitArticle, inputInvalid, deleteSubmitArticle}) {
    
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
            setArticleChoice(categoryOrArticle);
        }else if (id === "ArticleCategory"){
            setCategoryChoice(categoryOrArticle);
        }
        
    }

    function giveArticle(article, page){
        if(page ==="Article")
        {
            if(article != null)
            {
                return(
                    page === "Article" && <Article article={article} deleteSubmitArticle={dellArticle}/>
                )
            }
        }
    }
    function dellArticle(){
        setPage("");
        deleteSubmitArticle();
    }
    
    
    return (
        <div className='App-body'>
            <Navigation categories={allCategory} afficherPage={afficherPage}/>
            <div className='App-content'>
                <Outlet/>
            </div>
        </div>
    )
}

Body.propTypes = {
    setArticleChoice: PropTypes.func.isRequired,
    setCategoryChoice: PropTypes.func.isRequired,
    allCategory: PropTypes.array.isRequired,
    category: PropTypes.object,
    newCategory:PropTypes.object.isRequired,
    handlerCategory:PropTypes.func.isRequired,
    submitCategory: PropTypes.func.isRequired,
    article: PropTypes.object,
    newArticle:PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    handlerArticle:PropTypes.func.isRequired,
    handlerArticleDate: PropTypes.func.isRequired,
    submitArticle: PropTypes.func.isRequired,
    inputInvalid: PropTypes.bool.isRequired,
    deleteSubmitArticle: PropTypes.func.isRequired
}