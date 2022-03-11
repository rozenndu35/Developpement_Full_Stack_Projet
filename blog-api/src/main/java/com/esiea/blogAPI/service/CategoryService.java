package com.esiea.blogAPI.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.model.Category;
import com.esiea.blogAPI.repository.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;

	public Iterable<Category> getCategories(){
		return categoryRepository.findAll();
	}

	public Category getCategory(long id) throws NotFoundException {
		Optional<Category> result = categoryRepository.findById(id);
		if(result.isPresent())
			return result.get();
		else
			throw new NotFoundException();
	}
	
	public Category CreateCategoryIfNotExist(Category category) throws NotAllowedException, NotFoundException {
		Category currentCategory;
		if(category.getId() == null)
			currentCategory = this.save(category);
		else {
			currentCategory = this.getCategory(category.getId());
			if (!currentCategory.equalsOrNull(category))
				throw new NotFoundException();
		}
		return currentCategory;
	}

	public Category save(Category author) throws NotAllowedException {
		if(author.getId() == null)
			return categoryRepository.save(author);
		throw new NotAllowedException();
	}

	public Category replace(Category category) throws NotFoundException, NotAllowedException {
		this.getCategory(category.getId());
		return categoryRepository.save(category);
	}
	

	public Category patch(Category newCategory) throws NotFoundException, CantModifyItem {
		Category currentCategory = this.getCategory(newCategory.getId());
		if(newCategory.getCategoryName() != null && !newCategory.getCategoryName().equals(currentCategory.getCategoryName()))
			currentCategory.setCategoryName(newCategory.getCategoryName());
		if(newCategory.getArticles() != null && !newCategory.getArticles().equals(currentCategory.getArticles()))
			throw new CantModifyItem();
		return categoryRepository.save(currentCategory);
	}

	public void delete(long id) throws NotFoundException {
		try {
			categoryRepository.deleteById(id);
		}catch(EmptyResultDataAccessException e) {
			throw new NotFoundException();
		}
	}
}
