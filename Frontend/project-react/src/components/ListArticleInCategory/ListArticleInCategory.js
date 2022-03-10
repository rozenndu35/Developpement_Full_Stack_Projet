//https://fonts.google.com/icons?selected=Material+Icons
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import * as React from 'react';
import PropTypes from 'prop-types'

export default function ListArticleInCategory({afficherPage, category}) {
    let articleElements = [];
    if(category.articles){
      articleElements = category.articles.map(i => 
        <ListItem  key={i.id}  button className="articleListItem" onClick={event => afficherPage(event, "Article", i.id)}>
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
    }

    return (
        <div className='App-ListArticleInCategory'>
            <h1> category : {category.categoryName}</h1>
            <List>
                {articleElements}
            </List>
        </div>
    )
}
ListArticleInCategory.propTypes = {
  afficherPage: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
}