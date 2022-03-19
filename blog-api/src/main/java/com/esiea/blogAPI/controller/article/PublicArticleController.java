package com.esiea.blogAPI.controller.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esiea.blogAPI.exception.AuthorNotFoundException;
import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.CategoryNotFoundException;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.service.ArticleService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/public/article")
public class PublicArticleController {
	@Autowired
	private ArticleService articleService;
	
	@GetMapping("")
	public Iterable <Article> getArticles(){
		return articleService.getArticles();
	}
	@GetMapping("{id}")
	public ResponseEntity<Article> getArticle(@PathVariable("id") long id)
	{
		try {
			Article result = articleService.getArticle(id);
			return new  ResponseEntity<Article>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
