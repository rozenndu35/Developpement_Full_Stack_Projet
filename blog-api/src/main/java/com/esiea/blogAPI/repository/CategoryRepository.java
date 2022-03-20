package com.esiea.blogAPI.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.esiea.blogAPI.model.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {

}
