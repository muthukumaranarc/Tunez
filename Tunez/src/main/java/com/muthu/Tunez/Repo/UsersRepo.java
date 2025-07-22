package com.muthu.Tunez.Repo;

import com.muthu.Tunez.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends MongoRepository<Users, String> {
    Users findByUsername(String username);
}
