package com.muthu.Tunez.Repo;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.muthu.Tunez.model.Songs;

@Repository
public interface SongsRepo extends MongoRepository<Songs, String>{
    public List<Songs> findAllByCategory(String category);
    public List<Songs> findAllByArtist(String artist);
    List<Songs> findByImage(String image);
    public List<Songs> findByNameStartingWithIgnoreCase(String input);
}