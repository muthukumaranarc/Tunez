package com.muthu.Tunez.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muthu.Tunez.Repo.ArtistsRepo;
import com.muthu.Tunez.Repo.CollectionsRepo;
import com.muthu.Tunez.Repo.SongsRepo;

@Service
public class SearchService {
    
    @Autowired
    private SongsRepo songs;

    @Autowired
    private CollectionsRepo collections;

    @Autowired
    private ArtistsRepo artists;


    public List<List<?>> serch(String input){

        List<List<?>> out = new ArrayList<List<?>>();
        out.add(songs.findByNameStartingWithIgnoreCase(input));
        out.add(collections.findByNameStartingWithIgnoreCase(input));
        out.add(artists.findByArtistStartingWithIgnoreCase(input));

        return out;
    }

}
