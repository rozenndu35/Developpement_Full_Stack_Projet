package com.esiea.blogAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.service.AuthorService;



@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/private/author")
public class AuthorController {
	
	@Autowired
	private AuthorService authorService;
	
	@GetMapping("")
	public Iterable <Author> getAuthors(){
		return authorService.getAuthors();
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Author> getAuthor(@PathVariable("id") long id)
	{
		try {
			Author result = authorService.getAuthor(id);
			return new  ResponseEntity<Author>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("")
	public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
		try {
			Author result =  authorService.save(author);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<Author>replaceAuthor(@RequestBody Author author) {
		try {
			Author result =  authorService.replace(author);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}catch(NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
	}
}
