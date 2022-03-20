package com.esiea.blogAPI.controller.author;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.service.AuthorService;



@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/public/author")
public class PublicAuthorController {
	
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

	@GetMapping(params ={"lastName", "firstName"})
	public ResponseEntity<Author> getAuthor(@RequestParam("lastName") String lastname, @RequestParam("firstName") String firstname)
	{
		try {
			Author result = authorService.getAuhtorByName(lastname, firstname);
			return new  ResponseEntity<Author>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
