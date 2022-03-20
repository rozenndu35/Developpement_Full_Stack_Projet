package com.esiea.blogAPI.model;

import static org.mockito.Mockito.mock;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class AuthorTest {
	

	private Long id1 = Long.valueOf(1);
	private Long id2 = Long.valueOf(2);
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
		author2 = new Author(id2, firstName2, lastName2, articles1);
	}

	@Test
	void testGetId() {
		author1.setId(id2);
		Long result1 = author1.getId();
		Long result2 = author2.getId();
		Assertions.assertEquals(id2, result1);
		Assertions.assertEquals(id2, result2);
	}

	@Test
	void testSetId() {
		author1.setId(id1);
		author2.setId(id1);
		Long result1 = author1.getId();
		Long result2 = author2.getId();
		Assertions.assertEquals(id1, result1);
		Assertions.assertEquals(id1, result2);
	}

	@Test
	void testGetFirstName() {
		author1.setFirstName(firstName2);
		String result1 = author1.getFirstName();
		String result2 = author2.getFirstName();
		Assertions.assertEquals(firstName2, result1);
		Assertions.assertEquals(firstName2, result2);
	}

	@Test
	void testSetFirstName() {
		author1.setFirstName(firstName2);
		String result1 = author1.getFirstName();
		String result2 = author2.getFirstName();
		Assertions.assertEquals(firstName2, result1);
		Assertions.assertEquals(firstName2, result2);
	}

	@Test
	void testGetLastName() {
		author1.setLastName(lastName2);
		String result1 = author1.getLastName();
		String result2 = author2.getLastName();
		Assertions.assertEquals(lastName2, result1);
		Assertions.assertEquals(lastName2, result2);
	}

	@Test
	void testSetLastName() {
		author1.setLastName(lastName1);
		author2.setLastName(lastName1);
		String result1 = author1.getLastName();
		String result2 = author2.getLastName();
		Assertions.assertEquals(lastName1, result1);
		Assertions.assertEquals(lastName1, result2);
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

	@Test
	void testEqualsOrNullTrue(){
		boolean result = author2.equalsOrNull(author2);
		Assertions.assertTrue(result);
	}
	@Test
	void testEqualsOrNullNull(){
		author1.setId(author2.getId());
		boolean result = author2.equalsOrNull(author2);
		Assertions.assertTrue(result);
	}
	@Test
	void testEqualsOrNullFalseID(){
		author1.setId(id1);
		boolean result = author2.equalsOrNull(author1);
		Assertions.assertFalse(result);
	}
	@Test
	void testEqualsOrNullFalseFirstName(){
		author1.setId(id2);
		author1.setFirstName(firstName1);
		boolean result = author2.equalsOrNull(author1);
		Assertions.assertFalse(result);
	}
	@Test
	void testEqualsOrNullFalseLastName(){
		author1.setId(id2);
		author1.setLastName(firstName1);
		boolean result = author2.equalsOrNull(author1);
		Assertions.assertFalse(result);
	}
	@Test
	void testEqualsOrNullFalseFirstNameButGoodLastname(){
		author1.setId(id2);
		author1.setFirstName(firstName1);
		author1.setLastName(lastName2);
		boolean result = author2.equalsOrNull(author1);
		Assertions.assertFalse(result);
	}
	@Test
	void testEqualsOrNullFalseLastNameButGoodFirstName(){
		author1.setId(id2);
		author1.setLastName(lastName1);
		author1.setFirstName(firstName2);
		boolean result = author2.equalsOrNull(author1);
		Assertions.assertFalse(result);
	}
	@Test
	void testEqualsOrNullGood(){
		author1.setId(id2);
		author1.setLastName(lastName2);
		author1.setFirstName(firstName2);
		boolean result = author2.equalsOrNull(author1);
		Assertions.assertTrue(result);
	}

	@Test
	void testEqualsOrNullReverseNotId(){
		author1.setLastName(lastName2);
		author1.setFirstName(firstName2);
		boolean result = author1.equalsOrNull(author2);
		Assertions.assertFalse(result);
	}
	@Test
	void testEqualsOrNullReverseNotFirstName(){
		author1.setId(id2);
		author1.setLastName(lastName2);
		boolean result = author1.equalsOrNull(author2);
		Assertions.assertFalse(result);
	}
	@Test
	void testEqualsOrNullReverseNotLastname(){
		author1.setId(id2);
		author1.setFirstName(firstName2);
		boolean result = author1.equalsOrNull(author2);
		Assertions.assertFalse(result);
	}
	@Test
	void testAddArticle(){
		author1.addArticle(article1);
		Assertions.assertEquals(article1, author1.getArticles().get(0));
		Assertions.assertEquals(1, author1.getArticles().size());
	}

	@Test
	void testAddArticleWith2Articles(){
		author1.addArticle(article1);
		author1.addArticle(article2);
		Assertions.assertEquals(article1, author1.getArticles().get(0));
		Assertions.assertEquals(article2, author1.getArticles().get(1));
		Assertions.assertEquals(2, author1.getArticles().size());
	}

	@Test
	void testRemoveArticleWith2Articles(){
		author1.addArticle(article1);
		author1.addArticle(article2);
		author1.removeArticle(article2);
		Assertions.assertEquals(article1, author1.getArticles().get(0));
		Assertions.assertEquals(1, author1.getArticles().size());
	}

}
