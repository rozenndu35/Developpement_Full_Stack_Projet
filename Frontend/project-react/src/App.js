import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect} from 'react';
import Base from './components/Base/Base';
import ListCategory from './components/ListCategory/ListCategory';
import RouteCategory from './components/Router/RouteCategory';
import RouteArticle from './components/Router/RouteArticle';
import { useDispatch } from 'react-redux'
import { update } from './store/storeSlice/allCategoriesSlice';
import RouteCreateOrModifyCategory from './components/Router/RouteCreateOrModifyCategory';
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