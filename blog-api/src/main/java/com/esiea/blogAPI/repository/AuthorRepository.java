package com.esiea.blogAPI.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.esiea.blogAPI.model.Author;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {

}
