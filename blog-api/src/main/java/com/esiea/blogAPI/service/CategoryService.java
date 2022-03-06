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
		else
			currentCategory = this.getCategory(category.getId());
			if(!currentCategory.equalsOrNull(category))
				throw new NotFoundException();
		return currentCategory;
	}

	public Category save(Category author) throws NotAllowedException {
		if(author.getId() == null)
			return categoryRepository.save(author);
		throw new NotAllowedException();
	}

	public Category replace(Category author) throws NotFoundException, NotAllowedException {
		this.getCategory(author.getId());
		return categoryRepository.save(author);
	}
	

	public Category patch(Category newCategory) throws NotFoundException, CantModifyItem {
		Category currendAuthor = this.getCategory(newCategory.getId());
		if(newCategory.getCategoryName() != null && newCategory.getCategoryName() != currendAuthor.getCategoryName())
			currendAuthor.setCategoryName(newCategory.getCategoryName());
		if(newCategory.getArticles() != null && !newCategory.getArticles().equals(currendAuthor.getArticles()))
			throw new CantModifyItem();
		categoryRepository.save(currendAuthor);
		return currendAuthor;
	}

	public void delete(long id) throws NotFoundException {
		try {
			categoryRepository.deleteById(id);
		}catch(EmptyResultDataAccessException e) {
			throw new NotFoundException();
		}
	}
}
