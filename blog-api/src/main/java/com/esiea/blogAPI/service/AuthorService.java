package com.esiea.blogAPI.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.repository.AuthorRepository;


@Service
public class AuthorService {
	@Autowired
	private AuthorRepository authorRepository;
	
	public Iterable<Author> getAuthors(){
		return authorRepository.findAll();
	}

	public Author getAuthor(long id) throws NotFoundException {
		Optional<Author> result = authorRepository.findById(id);
		if(result.isPresent())
			return result.get();
		else
			throw new NotFoundException();
	}

	public Author create(Author author) throws NotAllowedException {
		if(author.getId() == null)
			return authorRepository.save(author);
		throw new NotAllowedException();
	}
}
