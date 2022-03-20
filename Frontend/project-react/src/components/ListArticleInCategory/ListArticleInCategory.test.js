import { render, screen, fireEvent } from '@testing-library/react';
import ListArticleInCategory from './ListArticleInCategory';

const categorieMockedData = {
        "id": 3,
        "categoryName": "patchcategoryName",
        "articles": [
            {
                "id": 2,
                "title": "patchcategoryName",
                "publicationDate": "2022-02-01T23:00:00.000+00:00",
                "content": "article2",
                "author": {
                    "id": 2,
                    "firstName": "firstName2",
                    "lastName": "lastName2"
                }
            },
            {
                "id": 3,
                "title": "patchcategoryName",
                "publicationDate": "2022-02-01T10:00:00.000+00:00",
                "content": "article3",
                "author": {
                    "id": 2,
                    "firstName": "firstName3",
                    "lastName": "lastName3"
                }
            }
        ]
    }


let article = null;
let category = null;
let page = null

function afficherPage(event, id, categoryOrArticle) {
    event.stopPropagation();
    if(id === "Article"){
        article = categoryOrArticle;
    }else if (id === "ArticleCategory"){
        category =categoryOrArticle;
    }
    page = id;
    
}

it.skip ("should Affichage de la liste",() => {
    render(<ListArticleInCategory category={categorieMockedData} afficherPage={afficherPage} />);
    expect(screen.getByText("category : patchcategoryName")).toBeTruthy();
    expect(screen.getAllByText("patchcategoryName")).toBeTruthy();
    expect(screen.getByText("firstName2 lastName2 - 2022-02-01T23:00:00.000+00:00")).toBeTruthy();
    expect(screen.getByText("article2")).toBeTruthy();
    expect(screen.getByText("article3")).toBeTruthy();
});

it.skip ("should ouvrir page premiere article",() => {
    render(<ListArticleInCategory category={categorieMockedData} afficherPage={afficherPage} />);
    fireEvent.click(screen.getByText("article2"));
    expect(page).toEqual("Article")
    expect(article).toEqual(2)
});

it.skip ("should ouvrir page deuxieme article",() => {
    render(<ListArticleInCategory category={categorieMockedData} afficherPage={afficherPage} />);
    fireEvent.click(screen.getByText("article3"));
    expect(page).toEqual("Article")
    expect(article).toEqual(3)
});