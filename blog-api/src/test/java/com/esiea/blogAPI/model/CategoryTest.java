package com.esiea.blogAPI.model;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class CategoryTest {
	
	private Long id1 = Long.valueOf(0);
	private Long id2 = Long.valueOf(1);
	private String categoryName1 = "categoryName1";
	private String categoryName2 = "categoryName2";
	@Mock
	private Article article1 = mock(Article.class);
	@Mock
	private Article article2 = mock(Article.class);
	@Mock
	private Article article3 = mock(Article.class);
	private List<Article> articles1;
	private List<Article> articles2;
	private Category category1;
	private Category category2;

	@BeforeEach
	void setUp() throws Exception {
		articles1 = new ArrayList<>();
		articles2 = new ArrayList<>();
		articles1.add(article1);
		articles1.add(article2);
		articles2.add(article1);
		articles2.add(article2);
		articles2.add(article3);
		category1 = new Category();
		category2 = new Category(id1, categoryName1 ,articles1);
	}

	@Test
	void testGetId() {
		category1.setId(id1);
		Long result1 = category1.getId();
		Long result2 = category2.getId();
		Assertions.assertEquals(id1, result1);
		Assertions.assertEquals(id1, result2);
	}

	@Test
	void testSetId() {
		category1.setId(id2);
		category2.setId(id2);
		Long result1 = category1.getId();
		Long result2 = category2.getId();
		Assertions.assertEquals(id2, result1);
		Assertions.assertEquals(id2, result2);
	}

	@Test
	void testGetCategoryName() {
		category1.setCategoryName(categoryName1);
		String result1 = category1.getCategoryName();
		String result2 = category2.getCategoryName();
		Assertions.assertEquals(categoryName1, result1);
		Assertions.assertEquals(categoryName1, result2);
	}

	@Test
	void testSetCategoryName() {
		category1.setCategoryName(categoryName2);
		category2.setCategoryName(categoryName2);
		String result1 = category1.getCategoryName();
		String result2 = category2.getCategoryName();
		Assertions.assertEquals(categoryName2, result1);
		Assertions.assertEquals(categoryName2, result2);
	}

	@Test
	void testGetArticles() {
		category1.setArticles(articles1);
		List<Article> result1 = category1.getArticles();
		List<Article> result2 = category2.getArticles();
		Assertions.assertEquals(articles1.size(), result1.size());
		Assertions.assertEquals(articles1.size(), result2.size());
	}

	@Test
	void testSetArticles() {
		category1.setArticles(articles2);
		category2.setArticles(articles2);
		List<Article> result1 = category1.getArticles();
		List<Article> result2 = category2.getArticles();
		Assertions.assertEquals(articles2.size(), result1.size());
		Assertions.assertEquals(articles2.size(), result2.size());
	}
}
