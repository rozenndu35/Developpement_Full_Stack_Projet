//https://fonts.google.com/icons?selected=Material+Icons
import Typography from '@material-ui/core/Typography'

import * as React from 'react';

export default function Article(props) {
    return (
        <div className='App-ListArticleInCategory'>
            <h1> Article : {props.article.title}</h1>
            <Typography
                sx={{ display: 'flex' }}
                component="span"
                variant="body2"
              >
                {props.article.author.firstName} {props.article.author.lastName} - {props.article.publicationDate}
              </Typography>
              {props.article.content}
        </div>
    )
}