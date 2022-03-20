import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect} from 'react';
import Base from './components/Base/Base';
import InputLog from './route/InputLog';
import ListCategory from './components/ListCategory/ListCategory';
import Home from'./components/Home/Home';
import Deconnect from'./components/Deconnect/Deconnect';
import RouteCategory from './components/Router/RouteCategory';
import RouteArticle from './components/Router/RouteArticle';
import { useDispatch } from 'react-redux'
import { update } from './store/storeSlice/allCategoriesSlice';
import RouteCreateOrModifyCategory from './components/Router/RouteCreateOrModifyCategory';
import RouteInscription from './components/Router/RouteInscription';
import RouteCreateOrModifyArticle from './components/Router/RouteCreateOrModifyArticle';

export default function App() {

  // Initialization du store contenant les catégories
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(update())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base />}>
            <Route  index element={<InputLog />} />
            <Route path="inscription" element={<RouteInscription />} />
            <Route  path='*' element={<main><p>Nous ne connaissons pas cette page</p></main>} />
            <Route path="home"  element={<Home/>}/>
            <Route path="deconnect"  element={<Deconnect/>}/>
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