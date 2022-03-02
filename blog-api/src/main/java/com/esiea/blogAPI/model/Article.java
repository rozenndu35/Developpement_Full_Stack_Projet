package com.esiea.blogAPI.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "article")
public class Article {
	public Article(Long id, String title, String publicationDate, String content, Author author, Article article) {
		super();
		this.id = id;
		this.title = title;
		this.publicationDate = publicationDate;
		this.content = content;
		this.author = author;
		this.article = article;
	}
	public Article() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPublicationDate() {
		return publicationDate;
	}

	public void setPublicationDate(String publicationDate) {
		this.publicationDate = publicationDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_article")
	private Long id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name= "publicationDate")
	private String publicationDate;
	
	@Column(name = "content")
	private String content;
	
	@ManyToOne
	@JoinColumn(name="id_author", nullable=false)
	private Author author;
	
	@ManyToOne
	@JoinColumn(name="id_category", nullable=false)
	private Article article;
}
