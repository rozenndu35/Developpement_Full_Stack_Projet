package com.esiea.blogAPI.controller.article;

import com.esiea.blogAPI.exception.AuthorNotFoundException;
import com.esiea.blogAPI.exception.CategoryNotFoundException;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/private/article")
public class PrivateArticleController {
	@Autowired
	private ArticleService articleService;

	@PostMapping("")
	public ResponseEntity<Article> createArticle(@RequestBody Article article) {
		try {
			Article result =  articleService.save(article);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		} catch (AuthorNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		} catch (CategoryNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<Article>replaceArticle(@RequestBody Article article) {
		try {
			Article result =  articleService.replace(article);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}catch(NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		} catch (AuthorNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		} catch (CategoryNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}
	
	@PatchMapping("")
	public ResponseEntity<Article> patchArticle(@RequestBody Article article){
		try {
			Article result = articleService.patch(article);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT); 
		} catch (AuthorNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT); 
		} catch (CategoryNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT); 
		}
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteArticle(@PathVariable("id") long id)
	{
		try {
			articleService.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
