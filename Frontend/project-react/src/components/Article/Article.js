//https://fonts.google.com/icons?selected=Material+Icons
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconDelete from '@material-ui/icons/Delete'
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import APIDeleteArticle from "../../helper/APIDeleteArticle"
import * as React from 'react';
import { prepareMessageError, prepareMessageSuccess } from '../Message/PrepareMessage';
import { useDispatch } from 'react-redux'
import { openInfoAction } from "../../store/storeSlice/messageSlice";
import PropTypes from 'prop-types'

export default function Article({article, setArticleStatus}) {
  const dispatch =  useDispatch();
  /*
    supprime l'article selectionner 
    @param id l'id de la categorie
  */
    function deleteArticle()
    {
      APIDeleteArticle(article.id)
      .then(res => {
        
        setArticleStatus("deleted");
        dispatch(openInfoAction(prepareMessageSuccess("Article supprimée")))
      })
      .catch(e => {
        dispatch(openInfoAction(prepareMessageError(e.toString())))
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

Article.propTypes = {
  article: PropTypes.object.isRequired,
  setArticleStatus: PropTypes.func.isRequired,
}