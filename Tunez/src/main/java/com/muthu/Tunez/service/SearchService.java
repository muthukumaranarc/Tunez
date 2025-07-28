package com.muthu.Tunez.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.muthu.Tunez.model.Songs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muthu.Tunez.Repo.ArtistsRepo;
import com.muthu.Tunez.Repo.CollectionsRepo;
import com.muthu.Tunez.Repo.SongsRepo;

@Service
public class SearchService {
    
    @Autowired
    private SongsRepo data;

    @Autowired
    private CollectionsRepo collections;

    @Autowired
    private ArtistsRepo artists;

    public List<List<?>> search(String input){
        List<List<?>> out = new ArrayList<List<?>>();
        out.add(data.findByNameStartingWithIgnoreCase(input));
        out.add(collections.findByNameStartingWithIgnoreCase(input));
        out.add(artists.findByArtistStartingWithIgnoreCase(input));
        return out;
    }

    public List<Songs> getByCategory(String category) {
        List<Songs> out = data.findAllByCategory(category);
        Collections.shuffle(out);
        return out;
    }

    public List<Songs> getByArtist(String artist) {
        return data.findAllByArtist(artist);
    }
}
