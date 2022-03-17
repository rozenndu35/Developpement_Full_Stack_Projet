package com.esiea.blogAPI.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.esiea.blogAPI.model.Author;

import java.util.Optional;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {

    public Iterable<Author> findByLastNameAndFirstName(String lastName, String firstName);
}
