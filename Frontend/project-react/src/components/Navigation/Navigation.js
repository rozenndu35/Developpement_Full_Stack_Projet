import React from 'react'
import './navigation.css'


//https://fonts.google.com/icons?selected=Material+Icons
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconList from '@material-ui/icons/ListSharp'
import IconAjouter from '@material-ui/icons/AddCircle'
import IconNotAccountcircle from '@material-ui/icons/AccountCircleOutlined'
import IconAccountcircle from '@material-ui/icons/AccountCircleRounded'
import { useSelector} from 'react-redux'

import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import { prepareMessageSuccess } from '../Message/PrepareMessage';

export default function  Navigation() {

  const {allCategories} = useSelector((state)=> state.allCatgories)
  const [open, setOpen] = React.useState(false)
  let navigate = useNavigate();
  const dispatch =  useDispatch();
  const categoryElements = allCategories.map(i => 
    <ListItem key={i.id} button onClick={() => navigate("/category/" + i.id)} className="navItem">
    <ListItemText inset primary={i.categoryName} />
    </ListItem>
  )

  /*
   change l'ouverture de la liste de categories
  */
  function handleClick() {
    setOpen(!open)
  }

  /*
   Deconnecte l'utilisateur
  */
   function deconnection() {
    sessionStorage.removeItem('token');
    dispatch(openInfoAction(prepareMessageSuccess("Vous ete deconnecter")))
  }

  return (
    <List component="nav" className="nav" disablePadding>
      <ListItem button onClick={event => navigate("category")} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconList />
        </ListItemIcon>
        <ListItemText primary="Liste Catégorie" />
      </ListItem>
      <ListItem button onClick={handleClick} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconList />
        </ListItemIcon>
        <ListItemText primary="Liste par Catégorie" />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit> 
        <List component="div" disablePadding>
          {categoryElements}
        </List>
      </Collapse>
      <ListItem button onClick={event => navigate("/category/new/newOrUpdate")} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconAjouter />
        </ListItemIcon>
        <ListItemText primary="Ajouter Catégorie" />
      </ListItem>

      <ListItem button onClick={event => navigate("/article/new/newOrUpdate")} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconAjouter />
        </ListItemIcon>
        <ListItemText primary="Ajouter Article" />
      </ListItem>
      <ListItem button onClick={deconnection} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconNotAccountcircle />
        </ListItemIcon>
        <ListItemText primary="Deconnection" />
      </ListItem>
      <ListItem button onClick={event => navigate("/")} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconAccountcircle />
        </ListItemIcon>
        <ListItemText primary="Connection" />
      </ListItem>
    </List>
  )
}