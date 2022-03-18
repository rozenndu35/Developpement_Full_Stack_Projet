
//https://fonts.google.com/icons?selected=Material+Icons
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types'

export default function ListCategory({categories ,afficherPage}) {

    let navigate = useNavigate();
    const categoryElements = categories.map(i => 
        <ListItem key={i.id}  button className="navItem" onClick={event => navigate("/category/" + i.id)}>
        <ListItemText inset primary={i.categoryName} />
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
  }