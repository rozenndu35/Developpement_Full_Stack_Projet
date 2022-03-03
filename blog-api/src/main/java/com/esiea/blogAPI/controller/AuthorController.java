package com.esiea.blogAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
