import { render, screen } from '@testing-library/react';
import Article from './Article';

const articleMoc ={
    "id": 2,
    "title": "title2",
    "publicationDate": "2022-02-01T23:00:00.000+00:00",
    "content": "article2",
    "author": {
        "id": 2,
        "firstName": "firstName2",
        "lastName": "lastName2"
    },
    "category": {
        "id": 2,
        "categoryName": "categoryName2"
    }
}
it.skip ("should Affichage de l'article",() => {
    render(<Article article={articleMoc}/>);
    expect(screen.getByText("title2")).toBeTruthy();
    expect(screen.getByText("firstName2 lastName2 - 2022-02-01")).toBeTruthy();
    expect(screen.getByText("article2")).toBeTruthy();
});