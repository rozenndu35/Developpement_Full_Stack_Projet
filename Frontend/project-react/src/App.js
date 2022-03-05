import './App.css';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import { useEffect, useState } from 'react';

function App() {

  const [postingCategory, setPostingCategory] = useState(false);
  const [toDeleteCategory, setToDeleteCategory] = useState(false);
  const [postingArticle, setPostingArticle] = useState(false);
  const [toDeleteArticle, setToDeleteArticle] = useState(false);
  const [allCategory, setAllCategory] = useState(
    [{
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
  );
  const [allArticle, setAllArticle] = useState(
    [ {
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
  );
  const [getCategory, setGetCategory] = useState(false);
  const [getArticle, setGetArticle] = useState(false);
  const [articleInCategory, setArticleInCategory] = useState(
    [
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
  );
  const [article, setArticle] = useState(
    {
      "id": 1,
      "title": "categoryName1",
      "publicationDate": "2021-12-31T23:00:00.000+00:00",
      "content": "article1",
      "author": {
          "id": 1,
          "firstName": "firstName1",
          "lastName": "lastName1"
      }
    }
  );

  const [newCategory, setNewCategory] = useState({
    id: 0,
    name: ""
  });
  const [newArticle, setNewArticle] = useState({
      id: 0,
      name: "",
      author:"",
      datetime: new Date(),
      title: "",
      content: "",
      category: ""

  });

  const [inputInvalid, setInputInvalid] = useState(false);


  const [CategoryChoice, setCategoryChoice] = useState();
  const [articleChoice, setArticleChoice] = useState();
  /*
  Recupere toutes les Categorys 
  */
  useEffect(() => {
    /*fetch('')
    .then(res => res.json())
    .then(data => {
      setAllCategory(data);
    })
    .catch(e => console.log(e.toString()));
    */
  }, [postingCategory, toDeleteCategory]);

  /*
  Recupere toutes les articles 
  */
  useEffect(() => {
    /*fetch('')
    .then(res => res.json())
    .then(data => {
      setAllArticle(data);
    })
    .catch(e => console.log(e.toString()));
    */
  }, [postingArticle, toDeleteArticle]);

  /*
  Recuper les articles de la Category where Category = CategoryChoice
  */
  useEffect(() => {
    /*fetch('')
    .then(res => res.json())
    .then(data => {
      setArticleInCategory(data);
    })
    .catch(e => console.log(e.toString()));
    */
  }, [getCategory]);

  /*
  Recuper l'articles saisie where article = articleChoice
  */
  useEffect(() => {
    /*fetch('')
    .then(res => res.json())
    .then(data => {
      setArticle(data);
    })
    .catch(e => console.log(e.toString()));
    */
  }, [getArticle]);


  /*
  Envoie l'ajout de la Category
  */
  useEffect(() =>{
    if (postingCategory) {
      
      /*
      fetch('', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newArticle)
      })
      .then(res => res.json())
      .then(data => {
        setPostingArticle(false);
        setNewCategory(prevState => {
          initInvalidInput();

          return {...prevState,
              id: 0,
              name: ""
          }
          });
      })
      .catch(e => console.log(e.toString()));
      */
      allCategory.push(newCategory)
      setPostingCategory(false);
      setNewCategory(prevState => {
          initInvalidInput();

          return {...prevState,
              id: 0,
              name: ""
          }
          });
    }
  }, [postingCategory]);

    /*
  Envoie l'ajout de l'article
  */
  useEffect(() =>{
    if (postingArticle) {
      
      /*
      fetch('', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCategory)
      })
      .then(res => res.json())
      .then(data => {
        setPostingCategory(false);
        setNewArticle(prevState => {
        initInvalidInput();
        return {...prevState,
          id: 0,
          name: "",
          author:"",
          datetime: new Date(),
          title: "",
          content: "",
          category: ""
        }
      });
      })
      .catch(e => console.log(e.toString()));
      */
      allArticle.push(newArticle)
      setPostingArticle(false);
      setNewArticle(prevState => {
        initInvalidInput();
        return {...prevState,
          id: 0,
          name: "",
          author:"",
          datetime: new Date(),
          title: "",
          content: "",
          category: ""
        }
      });
    }
  }, [postingArticle]);

  /*
  Remet l'input a valide innitiale
  */
  function initInvalidInput() {
    setInputInvalid(false);
  }
  /*
  valide l'envoie de la Category
  */
  function submitCategory() {
    setPostingCategory(true);
  }
  /*
    valide l'envoie de l'article
  */
  function submitArticle() {
      setPostingArticle(true);
  }

  /*
    Modifie la nouvelle Category
  */
  function newCategoryChange(event) {
    const {name, value} = event.target;
    isString(value) ?
        setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
        :
        value.length > 255 ?
            setInputInvalid("Le nombre maximum est de 255 caractere")
            :
            setNewCategory(prevState => {
              initInvalidInput();

              return {...prevState,
                  id: allCategory.length + 1,
                  [name]: value
              }
            });
  }

  /*
    Modifie le nouvelle article
  */
  function newArticleChange(event) {
    const {type, name, value} = event.target;
    name === 'category'?
        setNewArticle(prevState => {
            initInvalidInput();

            return {...prevState,
                id: allArticle.length + 1,
                [name]: value
            }
        })
    :
    type === 'text' ?

    isString(value) ?
        setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
        :value.length > 255 ?
            setInputInvalid("Le nombre maximum est de 255 caractere")
            :
            setNewArticle(prevState => {
            initInvalidInput();

            return {...prevState,
                id: allArticle.length + 1,
                [name]: value
            }
            })
        
    :
    setInputInvalid("Type non texte") 
  }

  /*
    Verifie si c'est un string et non pas caractere correspondant un du code potentiel
  */
  function isString( value){
    return value.match(/^.*[<>/\\].*$/);
}

  return (
    <div className="App">
      <Header />
      <Body 
        allCategory={allCategory} articlesInCategory={articleInCategory}
        allArticle={allArticle} article={article}
        newCategory={newCategory} submitCategory={submitCategory} handlerCategory={newCategory}
        newArticle={newArticle} submitArticle={submitArticle} handlerArticle={newArticle}
        setCategoryChoice={setCategoryChoice}
      />
      <Footer />
    </div>
  );
}

export default App;
