
//https://fonts.google.com/icons?selected=Material+Icons
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';

export default function ListCategory() {
    const {allCategories} = useSelector((state)=> state.allCatgories)
    let navigate = useNavigate();
    const categoryElements = allCategories.map(i => 
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