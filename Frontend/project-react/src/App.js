import './App.css';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import { useEffect, useState } from 'react';

function App() {

  const [postingCategory, setPostingCategory] = useState(false);
  const [postingArticle, setPostingArticle] = useState(false);
  const [allCategory, setAllCategory] = useState([]);

  const [allArticle, setAllArticle] = useState([]);
  const [article, setArticle] = useState();
  const [category, setCategory] = useState({category:null});

  const [newCategory, setNewCategory] = useState({
    categoryName: ""
  });
  const [newArticle, setNewArticle] = useState({
      id: -1,
      author:"",
      datetime: new Date(),
      title: "",
      content: "",
      category: ""

  });

  const [inputInvalid, setInputInvalid] = useState(false);


  const [categoryChoice, setCategoryChoice] = useState(-1);
  const [articleChoice, setArticleChoice] = useState(-1); 
  /*
  Récupere toutes les catégories avec l'API
  */
  useEffect(() => {
    fetch('http://localhost:9000/api/private/category')
    .then(res => res.json())
    .then(data => {
      setAllCategory(data);
    })
    .catch(e => console.log(e.toString()));
  }, [postingCategory]);

  /*
  Recupere toutes les articles avec l'API
  */
  useEffect(() => {
    fetch('http://localhost:9000/api/private/article')
    .then(res => res.json())
    .then(data => {
      setAllArticle(data);
    })
    .catch(e => console.log(e.toString()));
  }, [postingArticle]);

  /*
  Recuper les articles de la categorie where Category = CategoryChoice(id)
  */
 /*
  useEffect(() => {
    if(categoryChoice !== -1){
      setCategoryChoice(-1);
      fetch('http://localhost:9000/api/private/category/' + categoryChoice)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCategory(data);
      })
      .catch(e => console.log(e.toString()));
      
      setCategory({category:allCategory.find(cat => cat.id === categoryChoice )})
      
    }
    
  }, [categoryChoice]);*/

  const setCategory2 = (id) => {
      if(id>=0)
      {
        fetch('http://localhost:9000/api/private/category/' + id)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setCategory(data);
        })
        .catch(e => console.log(e.toString()));
      }

  }

  /*
  Recuper l'article saisie where article = articleChoice
  */
  useEffect(() => {
    if(articleChoice !== -1){
      fetch('http://localhost:9000/api/private/article/'+articleChoice)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
      })
      .catch(e => console.log(e.toString()));
      
      //setArticle({article:allArticle.find(art => art.id === articleChoice)});
      setArticleChoice(-1);
    }
    
  }, [articleChoice]);


  /*
  Envoie l'ajout de la Category
  */
  useEffect(() =>{
    if (postingCategory ) {
      
      /* OK TODO where merge backend
      fetch('http://localhost:9000/api/private/category', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCategory)
      })
      .then(res => res.json())
      .then(data => {
        setPostingArticle(false);
        setNewCategory(prevState => {
          initInvalidInput();

          return {...prevState,
              categoryName: ""
          }
          });
      })
      .catch(e => console.log(e.toString()));
      */
      allCategory.push(newCategory);
      setPostingCategory(false);
      setNewCategory(prevState => {
          initInvalidInput();

          return {...prevState,
              id: -1,
              categoryName: ""
          }
          });
    }
  }, [postingCategory]);

  /*
  Envoie l'ajout de l'article
  */
  useEffect(() =>{
    if (postingArticle && newArticle.id !== -1) {
      
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
          id: -1,
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
  Remet l'input invalide a ca position innitiale false
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
    Modifie la date du nouvelle article
  */
  function newArticleDateChange(value){
    setNewArticle(prevState => {
      initInvalidInput();

      return {...prevState,
          id: allArticle.length + 1,
          datetime: value
      }
      })
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
        allCategory={allCategory} 
        allArticle={allArticle} 
        newCategory={newCategory} submitCategory={submitCategory} handlerCategory={newCategoryChange}
        newArticle={newArticle} submitArticle={submitArticle} handlerArticle={newArticleChange} handlerArticleDate={newArticleDateChange}
        setCategoryChoice={setCategory2} category={category}
        setArticleChoice={setArticleChoice} article={article}
        inputInvalid={inputInvalid}

      />
      <Footer />
    </div>
  );
}

export default App;
