package com.esiea.blogAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.repository.ArticleRepository;

@Service
public class ArticleService {
	@Autowired
	private ArticleRepository articleRepository;
	
	public Iterable<Article> getArticle(){
		return articleRepository.findAll();
	}
}
