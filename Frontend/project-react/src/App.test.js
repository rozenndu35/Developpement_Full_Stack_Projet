import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


import { rest } from 'msw'
import { setupServer } from 'msw/node'

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
  },
  {
      "id": 4,
      "categoryName": "updateCategoryName",
      "articles": []
  }
]
const server = setupServer(
    // On précise ici l'url qu'il faudra "intercepter"
    rest.get('http://localhost:9000/api/private/categories', (req, res, ctx) => {
        // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
        return res(ctx.json({ categoriesMockedData }))
    })
)
 
// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

test('renders learn react link', () => {
  render(<App />);
  
  
});


it ("should test de l'api get categorie TODO",() => {
  //TODO
});
it ("should test de l'api get categorie dans le cas d'une erreur serveur TODO",() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({errorMessage:'Erreur serveur de l API'})
      )
    })
  )
});
it ("should test de l'api get categorie dans le cas d'une erreur de notre part TODO",() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        ctx.status(400),
        ctx.json({errorMessage:'Erreur dans votre requette'})
      )
    })
  )
});
it('should Changer page vers liste categorie', () => {
  render(<App />);
  fireEvent.click(screen.getByText("Liste Catégorie"))
  expect(screen.getByText(/Liste des categorie disponible/)).toBeTruthy()
})
it('should Ouvrir le liste de categorie dans la navigation TODO', () => {
  render(<App />);
  //TODO
  //screen.debug()
  //fireEvent.click(screen.getByText("Liste par Catégorie"))
  //expect(screen.getByText(/Liste des categorie disponible/)).toBeTruthy()
  //screen.debug()
})
it('should Fermer le liste de categorie dans la navigation TODO', () => {
  render(<App />);
  //TODO
  //fireEvent.click(screen.getByText("Liste par Catégorie"))
  //expect(screen.getByText(/Liste des categorie disponible/)).toBeTruthy()
  //fireEvent.click(screen.getByText("Liste par Catégorie"))
  //expect(screen.getByText(/Liste des categorie disponible/)).toBeTruthy()
})
it('should Ouvrir une categorie depui la navigation TODO', () => {
  render(<App />);
  //TODO quand on aura l'API moc
})
it('should Ouvrir une categorie depuis la liste TODO', () => {
  render(<App />);
  //TODO quand on aura l'API moc
})
it('should Ouvrir un article depuis la categorie TODO', () => {
  render(<App />);
  //TODO quand on aura l'API moc
})
it('should Ouvrir l ajout d une categorie', () => {
  render(<App />);
  fireEvent.click(screen.getByText("Ajouter Catégorie"))
  expect(screen.getByText(/Ajouter une categorie/)).toBeTruthy()
})
it('should Ouvrir l ajout d un article', () => {
  render(<App />);
  fireEvent.click(screen.getByText("Ajouter Article"))
  expect(screen.getByText(/Ajouter un article/)).toBeTruthy()
})