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
@Table(name = "author")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Author {
	public Author(Long id, String firstName, String lastName, List<Article> articles) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.articles = articles;
	}
	public Author() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List <Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_author")
	private Long id;
	
	@Column(name = "first_name", nullable=false)
	private String firstName;
	
	@Column(name = "last_name", nullable=false)
	private String lastName;
	
	@OneToMany(fetch = FetchType.LAZY, targetEntity= com.esiea.blogAPI.model.Article.class, mappedBy="author")
	@JsonManagedReference
	@JsonIgnoreProperties("author")
	private List<Article> articles;
}
