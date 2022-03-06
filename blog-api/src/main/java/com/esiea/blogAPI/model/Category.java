package com.esiea.blogAPI.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "category")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Category {
	public Category(Long id, String categoryName, List<Article> articles) {
		super();
		this.id = id;
		this.categoryName = categoryName;
		this.articles = articles;
	}
	
	public Category() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public List<Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_category")
	private Long id;
	
	@Column(name = "category_name", nullable=false)
	private String categoryName;
	
	@JsonIgnoreProperties(value="category", allowSetters = true)
	@OneToMany(fetch = FetchType.LAZY, targetEntity= com.esiea.blogAPI.model.Article.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, mappedBy="category")
	private List<Article> articles;
	
	public boolean equalsOrNull(Category category) {
		if(this.getId().equals(category.getId()))
			if(this.getCategoryName().equals(category.getCategoryName()) || category.getCategoryName() == null)
				return true;
		return false;
	}
}
