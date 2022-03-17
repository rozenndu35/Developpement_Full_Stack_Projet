//https://fonts.google.com/icons?selected=Material+Icons
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconDelete from '@material-ui/icons/Delete'
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

import * as React from 'react';

export default function Article(props) {
  function dateinString(){
    let jour = props.article.publicationDate.split('T')[0]
    return jour
  }

    return (
        <div className='App-ListArticleInCategory'>
            <Card>
              <CardHeader
                title={props.article.title}
                subheader={props.article.author !== null ? props.article.author.firstName + " " +props.article.author.lastName + " - " + dateinString() : dateinString()}
              />
              <CardContent>
                <Typography variant="body2" color="textPrimary">
                {props.article.content}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="Delete Article"
                  onClick={props.deleteSubmitArticle}
                >
                  <IconDelete />
                </IconButton>
              </CardActions>
            </Card>
        </div>
    )
}
