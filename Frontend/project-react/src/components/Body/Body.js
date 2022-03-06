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
    console.log.apply(props)
    const [page, setPage] = useState();
    const [pageUpdate, setPageUpdate] = useState({update: false, pageId: -1 });

    useEffect(() => {
        if (pageUpdate.update) {
            setPage(pageUpdate.pageId)
            setPageUpdate({update: false, pageId: -1 });
        }
    }, [pageUpdate]);

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
            <Navigation categorys={props.allCategory} afficherPage={afficherPage}/>
            <section className='App-page'>
                { page === "ListeCategory" && <ListCategory categorys={props.allCategory}  afficherPage={afficherPage}/>}
                { page === "ArticleCategory" && <ListArticleInCategory category={props.category} articles={props.articlesInCategory} afficherPage={afficherPage}/>}
                { page === "AddCategory" && <AddCategory newCategory={props.newCategory} inputInvalid={props.inputInvalid} handleChange={props.handlerCategory} submitCategory={props.submitCategory}/>}
                { page === "AddArticle" && <AddArticle newArticle={props.newArticle} categorys={props.allCategory} inputInvalid={props.inputInvalid} handleChange={props.handlerArticle} submitArticle={props.submitArticle}/>}
                { page === "Article" && <Article article={props.article} />}
            </section>

        </div>
    )
}