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

import PropTypes from 'prop-types'

export default function  Navigation({categories, afficherPage}) {
  const [open, setOpen] = React.useState(false)
  
  const categoryElements = categories.map(i => 
    <ListItem key={i.id} button onClick={event => afficherPage(event, "ArticleCategory", i.id)} className="navItem">
    <ListItemText inset primary={i.categoryName} />
    </ListItem>
  )

  /*
   change l'ouverture de la liste de categories
  */
  function handleClick() {
    setOpen(!open)
  }

  return (
    <List component="nav" className="nav" disablePadding>
      <ListItem button onClick={event => afficherPage(event, "ListeCategory")} className="navItem">
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
      <ListItem button onClick={event => afficherPage(event, "AddCategory")} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconAjouter />
        </ListItemIcon>
        <ListItemText primary="Ajouter Catégorie" />
      </ListItem>

      <ListItem button onClick={event => afficherPage(event, "AddArticle")} className="navItem">
        <ListItemIcon className="navItemIcon">
          <IconAjouter />
        </ListItemIcon>
        <ListItemText primary="Ajouter Article" />
      </ListItem>
    </List>
  )
}

Navigation.propTypes = {
  categories: PropTypes.array.isRequired,
  afficherPage: PropTypes.func.isRequired
}