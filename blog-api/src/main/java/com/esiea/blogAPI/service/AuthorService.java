package com.esiea.blogAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.repository.AuthorRepository;

@Service
public class AuthorService {
	@Autowired
	private AuthorRepository authorRepository;
	
	public Iterable<Author> getAuthors(){
		return authorRepository.findAll();
	}
}
