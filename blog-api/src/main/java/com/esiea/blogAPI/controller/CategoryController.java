package com.esiea.blogAPI.controller;

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

import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Category;
import com.esiea.blogAPI.service.CategoryService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/private/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("")
	public Iterable <Category> getCategories(){
		return categoryService.getCategories();
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Category> getCategory(@PathVariable("id") long id)
	{
		try {
			Category result = categoryService.getCategory(id);
			return new  ResponseEntity<Category>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("")
	public ResponseEntity<Category> createCategory(@RequestBody Category Category) {
		try {
			Category result =  categoryService.save(Category);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<Category>replaceCategory(@RequestBody Category Category) {
		try {
			Category result =  categoryService.replace(Category);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}catch(NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@PatchMapping("")
	public ResponseEntity<Category> patchCategory(@RequestBody Category Category){
		try {
			Category result = categoryService.patch(Category);
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
	public ResponseEntity<Object> deleteCategory(@PathVariable("id") long id)
	{
		try {
			categoryService.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
