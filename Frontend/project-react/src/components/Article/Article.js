//https://fonts.google.com/icons?selected=Material+Icons
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconDelete from '@material-ui/icons/Delete'
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

import * as React from 'react';

export default function Article({article, setMessageInfo, setOpenInfo, setSeverityInfo, setArticleStatus}) {
    /*
    supprime l'article selectionner 
    @param id l'id de la categorie
  */
    function deleteArticle()
    {
      fetch('http://localhost:9000/api/private/article/' + article.id, {
        method: "DELETE",
        headers: {
          'Content-Type':'application/json',
        },
      })
      .then(res => {
        setMessageInfo("Article supprimer");
        setOpenInfo(true);
        setSeverityInfo("success");
        setArticleStatus("deleted");
      })
      .catch(e => {
        setMessageInfo("Erreur : " + e.toString());
        setOpenInfo(true);
        setSeverityInfo("error");
      });
    };

  function dateinString(){
    let jour = article.publicationDate.split('T')[0]
    return jour
  }

    return (
        <div className='App-ListArticleInCategory'>
            <Card>
              <CardHeader
                title={article.title}
                subheader={article.author !== null ? article.author.firstName + " " +article.author.lastName + " - " + dateinString() : dateinString()}
              />
              <CardContent>
                <Typography variant="body2" color="textPrimary">
                {article.content}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="Delete Article"
                  onClick={deleteArticle}
                >
                  <IconDelete />
                </IconButton>
              </CardActions>
            </Card>
        </div>
    )
}
