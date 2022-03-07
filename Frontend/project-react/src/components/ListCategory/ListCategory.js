
//https://fonts.google.com/icons?selected=Material+Icons
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import PropTypes from 'prop-types'

export default function ListCategory({categories ,afficherPage}) {

    const categoryElements = categories.map(i => 
        <ListItem key={i.id}  button className="navItem" onClick={event => afficherPage(event, "ArticleCategory", i.id)}>
        <ListItemText inset primary={i.name} />
        </ListItem>
      )

    return (
        <div className='App-ListCategory'>
            <h2>Liste des categorie disponible</h2>
            <List>
                {categoryElements}
            </List>
        </div>
    )
}

ListCategory.propTypes = {
    categories: PropTypes.array.isRequired,
    afficherPage: PropTypes.func.isRequired
  }