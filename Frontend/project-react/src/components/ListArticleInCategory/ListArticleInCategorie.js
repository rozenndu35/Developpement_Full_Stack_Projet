//https://fonts.google.com/icons?selected=Material+Icons
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import * as React from 'react';

export default function ListArticleInCategorie(props) {

    console.log(props)
    const articleElements = props.articles.map(i => 
        <ListItem  key={i.id}  button className="articleListItem">
         <ListItemText
          primary={i.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'flex' }}
                component="span"
                variant="body2"
              >
                {i.author.firstName} {i.author.lastName} - {i.publicationDate}
              </Typography>
              {i.content}
            </React.Fragment>
          }
        />
        <Divider variant="inset" component="li" />
        </ListItem>
      )
    return (
        <div className='App-ListArticleInCategory'>
            <h1> Categorie : {props.categorie}</h1>
            <List>
                {articleElements}
            </List>
        </div>
    )
}