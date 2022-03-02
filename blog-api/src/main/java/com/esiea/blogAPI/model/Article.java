package com.esiea.blogAPI.model;





import java.sql.Timestamp;

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
	public Article(Long id, String title, Timestamp publicationDate, String content, Author author, Category category) {
		super();
		this.id = id;
		this.title = title;
		this.publicationDate = publicationDate;
		this.content = content;
		this.author = author;
		this.category = category;
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

	public Timestamp getPublicationDate() {
		return publicationDate;
	}

	public void setPublicationDate(Timestamp publicationDate) {
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_article")
	private Long id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name= "publicationDate")
	private Timestamp publicationDate;
	
	@Column(name = "content")
	private String content;
	
	@ManyToOne
	@JoinColumn(name="id_author", nullable=false)
	private Author author;
	
	@ManyToOne
	@JoinColumn(name="id_category", nullable=false)
	private Category category;
}
