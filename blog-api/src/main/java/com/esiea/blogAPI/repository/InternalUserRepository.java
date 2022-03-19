package com.esiea.blogAPI.repository;

import com.esiea.blogAPI.model.InternalUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InternalUserRepository extends CrudRepository<InternalUser, Long> {
    public InternalUser findByUsername(String username);

    /*
    @Query(value= "Select count(id) FROM Users where username = :username")
    public Long count(@Param("username") String username);
     */
}
