package com.esiea.blogAPI.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Article;
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

	public Author save(Author author) throws NotAllowedException {
		if(author.getId() == null)
			return authorRepository.save(author);
		throw new NotAllowedException();
	}

	public Author replace(Author author) throws NotFoundException, NotAllowedException {
		this.getAuthor(author.getId());
		return authorRepository.save(author);
	}
	

	public Author patch(Author newAuthor) throws NotFoundException, CantModifyItem {
		Author currendAuthor = this.getAuthor(newAuthor.getId());
		if(newAuthor.getFirstName() != null && newAuthor.getFirstName() != currendAuthor.getFirstName())
			currendAuthor.setFirstName(newAuthor.getFirstName());
		if(newAuthor.getLastName() != null && !newAuthor.getLastName().equals(currendAuthor.getLastName()))
			currendAuthor.setLastName(newAuthor.getLastName());
		if(newAuthor.getArticles() != null && !newAuthor.getArticles().equals(currendAuthor.getArticles()))
			throw new CantModifyItem();
		authorRepository.save(currendAuthor);
		return currendAuthor;
	}

	public void delete(long id) throws NotFoundException {
		try {
			authorRepository.deleteById(id);
		}catch(EmptyResultDataAccessException e) {
			throw new NotFoundException();
		}
	}
}
