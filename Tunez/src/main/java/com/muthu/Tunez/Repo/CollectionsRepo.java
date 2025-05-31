package com.muthu.Tunez.Repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.muthu.Tunez.model.Collections;

@Repository
public interface CollectionsRepo extends MongoRepository<Collections, String>{
    public List<Collections> findByNameStartingWithIgnoreCase(String input);
}
