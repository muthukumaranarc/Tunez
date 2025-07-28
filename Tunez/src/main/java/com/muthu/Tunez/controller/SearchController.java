package com.muthu.Tunez.controller;

import java.util.List;

import com.muthu.Tunez.model.Songs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.muthu.Tunez.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService service;
    
    @GetMapping("/{input}")
    public List<List<?>> search(@PathVariable("input") String input){
        return service.search(input);
    }

    @GetMapping("/get/category/{category}")
    public List<Songs> getSongByCategory(@PathVariable("category") String category){
        return service.getByCategory(category);
    }

    @GetMapping("/get/artist/{artist}")
    public List<Songs> getSongByArtist(@PathVariable("artist") String artist){
        return service.getByArtist(artist);
    }

}
