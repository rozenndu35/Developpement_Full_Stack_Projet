package com.esiea.blogAPI.controller.author;

import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/private/author")
public class PrivateAuthorController {
	
	@Autowired
	private AuthorService authorService;
	
	@GetMapping("")
	public Iterable <Author> getAuthors(){
		return authorService.getAuthors();
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
	
	@PatchMapping("")
	public ResponseEntity<Author> patchAuthor(@RequestBody Author author){
		try {
			Author result = authorService.patch(author);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (CantModifyItem e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<>(HttpStatus.CONFLICT); 
			// Un article doit avoir un auteur, la modfification de l'auteur d'un article doit se faire via une modification de l'article
		}
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteAuthor(@PathVariable("id") long id)
	{
		try {
			authorService.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
