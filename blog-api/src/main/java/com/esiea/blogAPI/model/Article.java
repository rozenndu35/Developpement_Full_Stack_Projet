package com.esiea.blogAPI.model;





import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "article")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
	
	@Column(name= "publication_date")
	private Timestamp publicationDate;
	
	@Column(name = "content")
	private String content;
	
	@ManyToOne (cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JoinColumn(name="id_author", nullable=false)
	@JsonIgnoreProperties("articles")
	private Author author;
	
	@ManyToOne(cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JoinColumn(name="id_category", nullable=false)
	@JsonIgnoreProperties("articles")
	private Category category;
	
}
