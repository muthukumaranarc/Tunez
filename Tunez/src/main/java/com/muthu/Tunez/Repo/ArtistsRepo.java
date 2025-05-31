package com.muthu.Tunez.Repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.muthu.Tunez.model.Artists;

@Repository
public interface ArtistsRepo extends MongoRepository<Artists, String> {
    public List<Artists> findByArtistStartingWithIgnoreCase(String input);
}