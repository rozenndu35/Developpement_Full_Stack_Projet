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
  }
]

const articlesMockedData = [
  {
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
  },
  {
      "id": 3,
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


it ("should test de l'api get categorie TODO", async() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        res(ctx.json({ categoriesMockedData }))
      )
    })
  )
  
});
it ("should test de l'api get categorie dans le cas d'une erreur serveur TODO",async() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({errorMessage:'Erreur serveur de l API'})
      )
    })
  )
});
it ("should test de l'api get categorie dans le cas d'une erreur de notre part TODO",async() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        ctx.status(400),
        ctx.json({errorMessage:'Erreur dans votre requette'})
      )
    })
  )
});


it ("should test de l'api get articles TODO", async() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        res(ctx.json({ articlesMockedData }))
      )
    })
  )
  
});
it ("should test de l'api get articles dans le cas d'une erreur serveur TODO",async() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({errorMessage:'Erreur serveur de l API'})
      )
    })
  )
});
it ("should test de l'api get articles dans le cas d'une erreur de notre part TODO",async() => {
  server.use(
    rest.get('http://localhost:9000/api/private/categories',(req,res,ctx) => {
      return res.once(
        ctx.status(400),
        ctx.json({errorMessage:'Erreur dans votre requette'})
      )
    })
  )
});