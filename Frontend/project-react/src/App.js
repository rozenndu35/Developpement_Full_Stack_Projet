import './App.css';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';

function App() {

  const [postingCategory, setPostingCategory] = useState(false);
  const [postingArticle, setPostingArticle] = useState(false);
  const [allCategory, setAllCategory] = useState([]);

  const [allArticle, setAllArticle] = useState([]);
  const [article, setArticle] = useState();
  const [category, setCategory] = useState({});

  const [articleChoice, setArticleChoice] = useState(-1); 

  const [newCategory, setNewCategory] = useState({
    categoryName: ""
  });
  const [newArticle, setNewArticle] = useState({
      id: -1,
      author:{},
      datetime: new Date(),
      title: "",
      content: "",
      category: {}

  });
  let [authorForNewArticle, setauthorForNewArticle] = useState({
    firstName: "", 
    lastName: ""
  });

  const [inputInvalid, setInputInvalid] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [severityInfo, setSeverityInfo] = useState("");

  function handleCloseInfo(){
    setOpenInfo(false);
    setMessageInfo("");
    setSeverityInfo("");
  }
  /*
  Récupere toutes les catégories avec l'API
  */
  useEffect(() => {
    fetch('http://localhost:9000/api/private/category')
    .then(res => res.json())
    .then(data => {
      setAllCategory(data);
    })
    .catch(e => {
      setMessageInfo("Erreur : " + e.toString());
      setOpenInfo(true);
      setSeverityInfo("error");
    });
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
    .catch(e => {
      setMessageInfo("Erreur : " + e.toString());
      setOpenInfo(true);
      setSeverityInfo("error");
    });
  }, [postingArticle]);

  /*
  Recupere la categorie selectionner 
  @param id l'id de la categorie
  */
  const getCategoryInAPI = (id) => {
      if(id>=0){
        
        fetch('http://localhost:9000/api/private/category/' + id)
        .then(res => res.json())
        .then(data => {
          setCategory(data);
        })
        .catch(e => {
          setMessageInfo("Erreur : " + e.toString());
          setOpenInfo(true);
          setSeverityInfo("error");
        });
      }
  }
  /*
  Recupere l'article selectionner where article = articleChoice
  */
  useEffect(() => {
    if(articleChoice !== -1){
      fetch('http://localhost:9000/api/private/article/'+articleChoice)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
      })
      .catch(e => {
        setMessageInfo("Erreur : " + e.toString());
        setOpenInfo(true);
        setSeverityInfo("error");
      });
      setArticleChoice(-1);
    }
    
  }, [articleChoice]);

  /*
  Envoie l'ajout de la Category
  */
  useEffect(() =>{
    if (postingCategory ) {
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
        setPostingCategory(false);
        setMessageInfo("Ajout de la categorie");
        setOpenInfo(true);
        setSeverityInfo("success");
        setNewCategory(prevState => {
          initInvalidInput();

          return {...prevState,
              categoryName: ""
          }
          });
      })
      .catch(e => {
        setMessageInfo("Erreur : " + e.toString());
        setOpenInfo(true);
        setSeverityInfo("error");
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
        initInvalidInput();
        setMessageInfo("Ajout de l'article");
        setOpenInfo(true);
        setNewArticle(prevState => {
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
        setauthorForNewArticle(prevState => {
        initInvalidInput();
        return {...prevState,
          firstName:"",
          lastName: ""
        }
        
        });
      })
      .catch(e => {
        setMessageInfo("Erreur : " + e.toString());
        setOpenInfo(true);
        setSeverityInfo("error");
      });
      */
      //TODO : recuperer l'id de l'autheur avant de l'ajouter attend que le backend soit pret
      allArticle.push(newArticle)
      setPostingArticle(false);
      setMessageInfo("Ajout de l'article");
      setOpenInfo(true);
      setSeverityInfo("success");
      setNewArticle(prevState => {
        initInvalidInput();
        return {...prevState,
          id: -1,
          name: "",
          author:{},
          datetime: new Date(),
          title: "",
          content: "",
          category: {}
        }
        
      });
      setauthorForNewArticle(prevState => {
        initInvalidInput();
        return {...prevState,
          firstName:"",
          lastName: ""
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
    if (newCategory.categoryName !== ""){
      setPostingCategory(true);
    }else{
      setInputInvalid("Vous devez remplir les champs");
  }
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
    if(name === 'category'){
        setNewArticle(prevState => {
            initInvalidInput();

            return {...prevState,
                id: allArticle.length + 1,
                [name]: value
            }
        })
      }else if (type === 'text' ){
        if (isString(value)) setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux") 
        else{
          if (value.length > 255) setInputInvalid("Le nombre maximum est de 255 caractere")
          else{
            if(name.startsWith("author")){
              setauthorForNewArticle(prevState => {
                initInvalidInput();
  
                return {...prevState,
                    id: allArticle.length + 1,
                    [name.split(".")[1]]: value
                }
              });
            }else{
              setNewArticle(prevState => {
                initInvalidInput();
  
                return {...prevState,
                    id: allArticle.length + 1,
                    [name]: value
                }
              });
            }
          }
        }
      }
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
        newArticle={newArticle} author={authorForNewArticle} submitArticle={submitArticle} handlerArticle={newArticleChange} handlerArticleDate={newArticleDateChange}
        setCategoryChoice={getCategoryInAPI} category={category}
        setArticleChoice={setArticleChoice} article={article}
        inputInvalid={inputInvalid}

      />
      <Snackbar open={openInfo} autoHideDuration={6000} onClose={handleCloseInfo}>
        <Alert onClose={handleCloseInfo} severity={severityInfo} sx={{ width: '100%' }}>
          {messageInfo}
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
}

export default App;
