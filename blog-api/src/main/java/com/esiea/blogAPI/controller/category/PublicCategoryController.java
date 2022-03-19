package com.esiea.blogAPI.controller.category;

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
@RequestMapping("api/public/category")
public class PublicCategoryController {
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
}
