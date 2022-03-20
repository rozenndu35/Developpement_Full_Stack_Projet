package com.esiea.blogAPI.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.esiea.blogAPI.model.Author;

import java.util.Optional;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {

    public Optional<Author> findByLastNameAndFirstName(String lastName, String firstName);
}
