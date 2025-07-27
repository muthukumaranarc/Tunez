package com.muthu.Tunez.Repo;

import com.muthu.Tunez.model.PrivateCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrivateCollectionRepo extends MongoRepository<PrivateCollection, String> {
    public List<PrivateCollection> findAllByUsername(String username);
}
