package com.esiea.blogAPI.model;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.sql.Timestamp;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;

class ArticleTest {


	
	@Mock
	private Author author1 = mock(Author.class);
	@Mock
	private Author author2 = mock(Author.class);
	@Mock
	private Category category1 = mock(Category.class);
	@Mock
	private Category category2 = mock(Category.class);
	private Article article1;
	private Article article2;
	private Long id1 = Long.valueOf(0);
	private Long id2 = Long.valueOf(1);
	private String title1 = "title1";
	private String title2 = "title2";
	private Timestamp publicationDate1 = Timestamp.valueOf("2022-01-01 00:00:00");
	private Timestamp publicationDate2 = Timestamp.valueOf("2021-05-05 00:00:00");
	private String content1 = "content1";
	private String content2 = "content2";
	
	@BeforeEach
	void setUp() throws Exception {
		System.out.println("1");
		article1 = new Article();
		article2 = new Article(id1, title1, publicationDate1, content1, author1, category1);
	}
	
	@Test
	void testGetId() {
		article1.setId(id1);
		Long result1 = article1.getId();
		Long result2 = article2.getId();
		Assertions.assertEquals(id1, result1);
		Assertions.assertEquals(id1, result2);
	}

	@Test
	void testSetId() {
		article1.setId(id2);
		article2.setId(id2);
		Long result1 = article1.getId();
		Long result2 = article2.getId();
		Assertions.assertEquals(id2, result1);
		Assertions.assertEquals(id2, result2);
	}

	@Test
	void testGetTitle() {
		article1.setTitle(title1);
		String result1 = article1.getTitle();
		String result2 = article2.getTitle();
		Assertions.assertEquals(title1, result1);
		Assertions.assertEquals(title1, result2);
	}

	@Test
	void testSetTitle() {
		article1.setTitle(title2);
		article2.setTitle(title2);
		String result1 = article1.getTitle();
		String result2 = article2.getTitle();
		Assertions.assertEquals(title2, result1);
		Assertions.assertEquals(title2, result2);
	}

	@Test
	void testGetPublicationDate() {
		article1.setPublicationDate(publicationDate1);
		Timestamp result1 = article1.getPublicationDate();
		Timestamp result2 = article2.getPublicationDate();
		Assertions.assertEquals(publicationDate1, result1);
		Assertions.assertEquals(publicationDate1, result2);
	}

	@Test
	void testSetPublicationDate() {
		article1.setPublicationDate(publicationDate2);
		article2.setPublicationDate(publicationDate2);
		Timestamp result1 = article1.getPublicationDate();
		Timestamp result2 = article2.getPublicationDate();
		Assertions.assertEquals(publicationDate2, result1);
		Assertions.assertEquals(publicationDate2, result2);
	}

	@Test
	void testGetContent() {
		article1.setContent(content1);
		String result1 = article1.getContent();
		String result2 = article2.getContent();
		Assertions.assertEquals(content1, result1);
		Assertions.assertEquals(content1, result2);
	}

	@Test
	void testSetContent() {
		article1.setContent(content2);
		article2.setContent(content2);
		String result1 = article1.getContent();
		String result2 = article2.getContent();
		Assertions.assertEquals(content2, result1);
		Assertions.assertEquals(content2, result2);
	}

	@Test
	void testGetAuthor() {
		when(author1.toString()).thenReturn("true");
		article1.setAuthor(author1);
		Author result1 = article1.getAuthor();
		Author result2 = article2.getAuthor();
		Assertions.assertEquals("true", result1.toString());
		Assertions.assertEquals("true", result2.toString());
	}

	@Test
	void testSetAuthor() {
		when(author1.toString()).thenReturn("false");
		when(author2.toString()).thenReturn("true");
		article1.setAuthor(author2);
		article2.setAuthor(author2);
		Author result1 = article1.getAuthor();
		Author result2 = article2.getAuthor();
		Assertions.assertEquals("true", result1.toString());
		Assertions.assertEquals("true", result2.toString());
	}

	@Test
	void testGetCategory() {
		when(category1.toString()).thenReturn("true");
		when(category2.toString()).thenReturn("false");
		article1.setCategory(category1);
		Category result1 = article1.getCategory();
		Category result2 = article2.getCategory();
		Assertions.assertEquals("true", result1.toString());
		Assertions.assertEquals("true", result2.toString());
	}

	@Test
	void testSetCategory() {
		when(category1.toString()).thenReturn("false");
		when(category2.toString()).thenReturn("true");
		article1.setCategory(category2);
		article2.setCategory(category2);
		Category result1 = article1.getCategory();
		Category result2 = article2.getCategory();
		Assertions.assertEquals("true", result1.toString());
		Assertions.assertEquals("true", result2.toString());
	}
}
