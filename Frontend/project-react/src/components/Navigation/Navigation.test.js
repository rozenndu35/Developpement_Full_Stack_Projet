import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';

const categoriesMockedData = [
    {
        "id": 2,
        "categoryName": "categoryName2",
        "articles": [
            {
                "id": 2,
                "title": "categoryName2",
                "publicationDate": "2022-02-01T23:00:00.000+00:00",
                "content": "article2",
                "author": {
                    "id": 2,
                    "firstName": "firstName2",
                    "lastName": "lastName2"
                }
            }
        ]
    },
    {
        "id": 3,
        "categoryName": "patchcategoryName",
        "articles": [
            {
                "id": 3,
                "title": "categoryName3",
                "publicationDate": "2022-03-02T23:00:00.000+00:00",
                "content": "article3",
                "author": {
                    "id": 3,
                    "firstName": "firstName3",
                    "lastName": "lastName3"
                }
            }
        ]
    }
  ]

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

it('should Ouvrir liste catégorie', () => {
    render(<Navigation categories={categoriesMockedData} afficherPage={afficherPage}/>);
    fireEvent.click(screen.getByText("Liste Catégorie"));
    expect(page).toEqual("ListeCategory")
  })
it('should Ouvrir le liste de categorie', () => {
    render(<Navigation categories={categoriesMockedData} afficherPage={afficherPage}/>);
    expect(() => screen.getByText(/categoryName2/)).toThrow();
    fireEvent.click(screen.getByText("Liste par Catégorie"));
    expect(screen.getByText(/categoryName2/)).toBeTruthy();
  })

// TODO test fermer liste categorie

it('should Ouvrir une category', () => {
    render(<Navigation categories={categoriesMockedData} afficherPage={afficherPage}/>);
    fireEvent.click(screen.getByText("Liste par Catégorie"));
    fireEvent.click(screen.getByText("categoryName2"));

    expect(page).toEqual("ArticleCategory")
    expect(category).toEqual(2)
  })

it('should Ouvrir ajouter article', () => {
    render(<Navigation categories={categoriesMockedData} afficherPage={afficherPage}/>);
    fireEvent.click(screen.getByText("Ajouter Article"));
    expect(page).toEqual("AddArticle")
  })
  
it('should Ouvrir ajouter categorie', () => {
    render(<Navigation categories={categoriesMockedData} afficherPage={afficherPage}/>);
    fireEvent.click(screen.getByText("Ajouter Catégorie"));
    expect(page).toEqual("AddCategory")
  })
