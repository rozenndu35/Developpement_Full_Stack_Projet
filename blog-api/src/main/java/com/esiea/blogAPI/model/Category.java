package com.esiea.blogAPI.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "category")
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
	@Column(name = "id_article")
	private Long id;
	
	@Column(name = "categoryName", nullable=false)
	private String categoryName;
	
	@OneToMany(cascade= { CascadeType.PERSIST,CascadeType.MERGE}, mappedBy="category")
	private List<Article> articles;
}
