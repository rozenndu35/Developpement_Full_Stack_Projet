import './App.css';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

function App() {
  const allCategory = [{
    id: 0,
    name: "Vetement"
  }, {
    id: 1,
    name: "Numerique"
  },{
    id: 2,
    name: "Meuble"
  },{
    id: 10,
    name: "Meuble"
  }]
  const allArticle =[ {
    "id": 1,
    "title": "categoryName1",
    "publicationDate": "2021-12-31T23:00:00.000+00:00",
    "content": "article1",
    "author": {
        "id": 1,
        "firstName": "firstName1",
        "lastName": "lastName1"
    }
  },
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
  }]

  const articleUsing =[
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
  },{
    "id": 3,
    "title": "categoryName3",
    "publicationDate": "2022-02-01T23:00:00.000+00:00",
    "content": "article3",
    "author": {
        "id": 2,
        "firstName": "firstName2",
        "lastName": "lastName2"
    }
}
  ]
  return (
    <div className="App">
      <Header />
      <Body allCategory={allCategory} allArticle={allArticle} articlesInCategory={articleUsing}/>
      <Footer />
    </div>
  );
}

export default App;
