package com.esiea.blogAPI.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.blogAPI.exception.AuthorNotFoundException;
import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.CategoryNotFoundException;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.model.Category;
import com.esiea.blogAPI.repository.ArticleRepository;

/**
 * Service permettant d'accèder et de modifier les articles stockés dans la base de donnée
 */
@Service
public class ArticleService {
	@Autowired
	private ArticleRepository articleRepository;
	@Autowired
	private AuthorService authorService;
	@Autowired
	private CategoryService categoryService;
	

	public Iterable<Article> getArticles(){
		return articleRepository.findAll();
	}
	
	public Article getArticle(Long id) throws NotFoundException {
		Optional<Article> result = articleRepository.findById(id);
		if(result.isPresent())
			return result.get();
		else
			throw new NotFoundException();
	}

	public Article save(Article article) throws NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
		if(article.getId() == null)
		{
			setAuthorAndCategory(article, article, true);
			return articleRepository.save(article);
		}
		throw new NotAllowedException();
	}

	/**
	 * Permet de remplacer l'ensemble des données d'un article par de nouvelles données
	 * @param newArticle : article contenant les nouvelles données.
	 * Si l'id de l'auteur ou de la catégorie sont données, l'article sera asscié à l'auteur/catégorie
	 * Si tous les atributs de l'auteur ou de la catégorie sont complétés à l'éxections des ID, un nouvel ID/Catégorie sera créer
	 */
	public Article replace(Article newArticle) throws NotFoundException, NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
		Article repoArticle = this.getArticle(newArticle.getId());
		repoArticle.setTitle(newArticle.getTitle());
		repoArticle.setContent(newArticle.getContent());
		repoArticle.setPublicationDate(newArticle.getPublicationDate());
		this.setAuthorAndCategory(repoArticle, newArticle, true);
		return articleRepository.save(repoArticle);
	}
	
	/**
	 * Permet si besoin de générer pour l'insertion/modification d'un article, un auteur ou une catégorie 
	 * @param RepoArticle Article prééxistant ou Artilce à ajouter
	 * @param newArticle Article à ajouter
	 * @param force Défini si la modification des valeurs prééxistantes doit-être ou non forcée (si les données sont identiques, on ne fait rien)
	 * @throws NotAllowedException Echec de la sauvegarde dans la base de données
	 * @throws AuthorNotFoundException Si un ID est défini, mais que le nom/prenom de l'auteur ne correspond pas et ne sont pas nul, lève cette exception
	 * @throws CategoryNotFoundException Si un ID est défini, mais que le nom de la catégorie ne correspond pas et n'est pas nul, lève cette exception
	 */
	private void setAuthorAndCategory(Article RepoArticle, Article newArticle, boolean force) throws NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
		if(force || newArticle.getAuthor() != null && (!RepoArticle.getAuthor().equalsOrNull(newArticle.getAuthor())))
		{
			try {
				Author author = this.authorService.CreateAuthorIfNotExist(newArticle.getAuthor());
				RepoArticle.setAuthor(author);
			}catch(NotFoundException e) {
				throw new AuthorNotFoundException();
			}
		}
		if(force || newArticle.getCategory() != null && (!RepoArticle.getCategory().equalsOrNull(newArticle.getCategory())))
		{
			try {
				Category category = this.categoryService.CreateCategoryIfNotExist(newArticle.getCategory());
				RepoArticle.setCategory(category);
			}catch(NotFoundException e) {
				throw new CategoryNotFoundException();
			}
		}

	}

	/**
	 * Patche un article
	 * @param newArticle Contient les données à modifiées. 
	 * Si l'id de l'auteur ou de la catégorie sont données, l'article sera asscié à l'auteur/catégorie
	 * Si tous les atributs de l'auteur ou de la catégorie sont complétés à l'éxections des ID, un nouvel ID/Catégorie sera créer
	 * @return L'article patché
	 * @throws NotFoundException Si l'article n'éxiste pas
	 * @throws NotAllowedException Echec de la sauvegarde dans la base de données
	 * @throws AuthorNotFoundException un ID est défini, mais que le nom/prenom de l'auteur ne correspond pas et ne sont pas nul, lève cette exception
	 * @throws CategoryNotFoundException Si un ID est défini, mais que le nom de la catégorie ne correspond pas et n'est pas nul, lève cette exception
	 */
	public Article patch(Article newArticle) throws NotFoundException, NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
		Article currentArticle = this.getArticle(newArticle.getId());
		if(newArticle.getTitle() != null && !newArticle.getTitle().equals(currentArticle.getTitle()))
			currentArticle.setTitle(newArticle.getTitle());
		if(newArticle.getContent() != null && !newArticle.getContent().equals(currentArticle.getContent()))
			currentArticle.setContent(newArticle.getContent());
		if(newArticle.getPublicationDate() != null && !newArticle.getPublicationDate().equals(currentArticle.getPublicationDate()))
			currentArticle.setPublicationDate(newArticle.getPublicationDate());
		setAuthorAndCategory(currentArticle, newArticle, false);
		return articleRepository.save(currentArticle);
	}

	public void delete(long id) throws NotFoundException {
		try {
			articleRepository.deleteById(id);
		}catch(EmptyResultDataAccessException e) {
			throw new NotFoundException();
		}
	}
}
