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
@Table(name = "author")
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

	public void setArticle(List<Article> articles) {
		this.articles = articles;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_article")
	private Long id;
	
	@Column(name = "firstName", nullable=false)
	private String firstName;
	
	@Column(name = "lastName", nullable=false)
	private String lastName;
	
	@OneToMany(cascade= { CascadeType.PERSIST,CascadeType.MERGE}, mappedBy="article")
	private List<Article> articles;
}
