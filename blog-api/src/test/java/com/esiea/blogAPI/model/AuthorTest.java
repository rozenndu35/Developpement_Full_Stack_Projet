package com.esiea.blogAPI.model;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class AuthorTest {
	
	private Long id1 = Long.valueOf(0);
	private Long id2 = Long.valueOf(1);
	private String firstName1 = "firstName1";
	private String firstName2 = "firstName2";
	private String lastName1 = "lastName1";
	private String lastName2 = "lastName2";
	@Mock
	private Article article1 = mock(Article.class);
	@Mock
	private Article article2 = mock(Article.class);
	@Mock
	private Article article3 = mock(Article.class);
	private List<Article> articles1;
	private List<Article> articles2;
	private Author author1;
	private Author author2;

	@BeforeEach
	void setUp() throws Exception {
		articles1 = new ArrayList<>();
		articles2 = new ArrayList<>();
		articles1.add(article1);
		articles1.add(article2);
		articles2.add(article1);
		articles2.add(article2);
		articles2.add(article3);
		author1 = new Author();
		author2 = new Author(id1, firstName1, lastName1, articles1);
	}

	@Test
	void testGetId() {
		author1.setId(id1);
		Long result1 = author1.getId();
		Long result2 = author2.getId();
		Assertions.assertEquals(id1, result1);
		Assertions.assertEquals(id1, result2);
	}

	@Test
	void testSetId() {
		author1.setId(id2);
		author2.setId(id2);
		Long result1 = author1.getId();
		Long result2 = author2.getId();
		Assertions.assertEquals(id2, result1);
		Assertions.assertEquals(id2, result2);
	}

	@Test
	void testGetFirstName() {
		author1.setFirstName(firstName1);
		String result1 = author1.getFirstName();
		String result2 = author2.getFirstName();
		Assertions.assertEquals(firstName1, result1);
		Assertions.assertEquals(firstName1, result2);
	}

	@Test
	void testSetFirstName() {
		author1.setFirstName(firstName1);
		String result1 = author1.getFirstName();
		String result2 = author2.getFirstName();
		Assertions.assertEquals(firstName1, result1);
		Assertions.assertEquals(firstName1, result2);
	}

	@Test
	void testGetLastName() {
		author1.setLastName(lastName1);
		String result1 = author1.getLastName();
		String result2 = author2.getLastName();
		Assertions.assertEquals(lastName1, result1);
		Assertions.assertEquals(lastName1, result2);
	}

	@Test
	void testSetLastName() {
		author1.setLastName(lastName2);
		author2.setLastName(lastName2);
		String result1 = author1.getLastName();
		String result2 = author2.getLastName();
		Assertions.assertEquals(lastName2, result1);
		Assertions.assertEquals(lastName2, result2);
	}

	@Test
	void testGetArticles() {
		author1.setArticles(articles1);
		List<Article> result1 = author1.getArticles();
		List<Article> result2 = author2.getArticles();
		Assertions.assertEquals(articles1.size(), result1.size());
		Assertions.assertEquals(articles1.size(), result2.size());
	}

	@Test
	void testSetArticle() {
		author1.setArticles(articles2);
		author2.setArticles(articles2);
		List<Article> result1 = author1.getArticles();
		List<Article> result2 = author2.getArticles();
		Assertions.assertEquals(articles2.size(), result1.size());
		Assertions.assertEquals(articles2.size(), result2.size());
	}

}
