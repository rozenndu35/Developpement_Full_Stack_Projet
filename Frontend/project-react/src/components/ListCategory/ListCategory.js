
//https://fonts.google.com/icons?selected=Material+Icons
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default function ListCategory(props) {

    const categoryElements = props.categories.map(i => 
        <ListItem key={i.id}  button className="navItem" onClick={event => props.afficherPage(event, "ArticleCategory", i.name)}>
        <ListItemText inset primary={i.name} />
        </ListItem>
      )

    return (
        <div className='App-ListCategory'>
            <List>
                {categoryElements}
            </List>
        </div>
    )
}