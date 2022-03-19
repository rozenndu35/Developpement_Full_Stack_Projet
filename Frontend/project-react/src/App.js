import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Base from './components/Base/Base';
import ListCategory from './components/ListCategory/ListCategory';
import AddCategory from './components/addCategory/AddCategory';
import AddArticle from './components/addArticle/AddArticle';
import RouteCategory from './components/Router/RouteCategory';
import RouteArticle from './components/Router/RouteArticle';
import { useDispatch } from 'react-redux'
import { update } from './store/storeSlice/allCategoriesSlice';
import RouteCreateOrModifyCategory from './components/Router/RouteCreateOrModifyCategory';
import RouteCreateOrModifyArticle from './components/Router/RouteCreateOrModifyArticle';
function App() {
  // Initialization du store contenant les catégories
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(update())
  }, [])

  const [postingCategory, setPostingCategory] = useState(false);
  const [postingArticle, setPostingArticle] = useState(false);
  const [deleteArticle, setDeleteArticle] = useState(false);
  const [allCategory, setAllCategory] = useState([]);

  const [allArticle, setAllArticle] = useState([]);
  const [article, setArticle] = useState();
  const [category, setCategory] = useState({});

  const [articleChoice, setArticleChoice] = useState(-1);

  const [newCategory, setNewCategory] = useState({
    categoryName: ""
  });
  const [newArticle, setNewArticle] = useState({
    author: {},
    publicationDate: new Date(),
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
  const [severityInfo, setSeverityInfo] = useState("success");

  function handleCloseInfo() {
    setOpenInfo(false);
    setMessageInfo("");
    setSeverityInfo("success");
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
    if (id >= 0) {

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
    if (articleChoice !== -1) {
      fetch('http://localhost:9000/api/private/article/' + articleChoice)
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
  useEffect(() => {
    if (postingCategory) {
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

            return {
              ...prevState,
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
  useEffect(() => {
    if (postingArticle && newArticle.id !== -1) {
      fetch('http://localhost:9000/api/private/article', {
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
          initInvalidInput();
          setMessageInfo("Ajout de l'article");
          setOpenInfo(true);
          setNewArticle(prevState => {
            return {
              ...prevState,
              name: "",
              author: "",
              publicationDate: new Date(),
              title: "",
              content: "",
              category: ""
            }
          });
          setauthorForNewArticle(prevState => {
            return {
              ...prevState,
              firstName: "",
              lastName: ""
            }
          });
        })
        .catch(e => {
          setMessageInfo("Erreur : " + e.toString());
          setOpenInfo(true);
          setSeverityInfo("error");
          setPostingArticle(false);
        });
    }
  }, [postingArticle]);

  /*
    supprime l'article selectionner 
    @param id l'id de la categorie
  */
  useEffect(() => {
    if (deleteArticle) {
      fetch('http://localhost:9000/api/private/article/' + article.id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          setDeleteArticle(false);
          setMessageInfo("Article supprimer");
          setOpenInfo(true);
          setSeverityInfo("success");
        })
        .catch(e => {
          setMessageInfo("Erreur : " + e.toString());
          setOpenInfo(true);
          setSeverityInfo("error");
        });
    }
  }, [deleteArticle]);


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
    if (newCategory.categoryName !== "") {
      setPostingCategory(true);
    } else {
      setInputInvalid("Vous devez remplir les champs");
    }
  }
  /*
    valide l'envoie de l'article
  */
  function submitArticle() {
    if (newArticle.publicationDate !== null && newArticle.title !== "" && newArticle.content !== "" && newArticle.category !== "" && authorForNewArticle.firstName !== "" && authorForNewArticle.lastName !== "") {
      fetch('http://localhost:9000/api/private/author/?lastName=' + authorForNewArticle.lastName + '&firstName=' + authorForNewArticle.firstName)
        .then(res => {
          if (res.status === 404) {
            fetch('http://localhost:9000/api/private/author', {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(authorForNewArticle)
            }).then(res => res.json())
              .then(data => {
                setNewArticle(prevState => {
                  return {
                    ...prevState,
                    "author": { "id": data.id }
                  }
                })
                setPostingArticle(true);
              });

          } else if (res.status === 200) {
            res.json().then(function (data) {
              if (data !== undefined) {
                setNewArticle(prevState => {
                  return {
                    ...prevState,
                    "author": { "id": data.id }
                  }
                })
                setPostingArticle(true);
              }
            });
          }
        })
        .catch(e => {
          setMessageInfo("Erreur : " + e.toString());
          setOpenInfo(true);
          setSeverityInfo("error");
        });
    } else {
      setInputInvalid("Vous devez remplir les champs");
    }

  }
  /*
    valide l'envoie de la supression de l'article
  */
  function deleteSubmitArticle() {
    setDeleteArticle(true);
  }

  /*
    Modifie la nouvelle Category
  */
  function newCategoryChange(event) {
    const { name, value } = event.target;
    isString(value) ?
      setInputInvalid("Vous ne pouvez pas inserer de caractere speciaux")
      :
      value.length > 255 ?
        setInputInvalid("Le nombre maximum est de 255 caractere")
        :
        setNewCategory(prevState => {
          initInvalidInput();

          return {
            ...prevState,
            [name]: value
          }
        });
  }

 

  /*
    Verifie si c'est un string et non pas caractere correspondant un du code potentiel
  */
  function isString(value) {
    return value.match(/^.*[<>/\\].*$/);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route path="" index element={<div />} />
          <Route path='category'>
            <Route path="" element={<ListCategory />} />
            <Route path=":id">
              <Route path="" element={<RouteCategory />} />
              <Route path="newOrUpdate" element={<RouteCreateOrModifyCategory />} />
            </Route>
          </Route>
          <Route path="article">
            <Route path=":id">
              <Route path="" element={<RouteArticle />} />             {/*article*/}
              <Route path="newOrUpdate" element={<RouteCreateOrModifyArticle/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
