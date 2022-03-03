package com.esiea.blogAPI.repository;


import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.esiea.blogAPI.model.Article;


@Repository
public interface ArticleRepository extends CrudRepository<Article, Long>{

}
