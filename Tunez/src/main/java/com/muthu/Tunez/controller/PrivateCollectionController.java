package com.muthu.Tunez.controller;

import com.muthu.Tunez.model.PrivateCollection;
import com.muthu.Tunez.service.PrivateCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/privateCollection")
public class PrivateCollectionController {

    @Autowired
    private PrivateCollectionService service;

    @GetMapping("/get/all")
    public List<PrivateCollection> getAllCollection(){
        return service.getCollections();
    }

    @PostMapping("/create")
    public void createNewCollection(@RequestBody PrivateCollection collection) {
        service.createCollection(collection);
    }

    @GetMapping("/get/{collectionName}")
    public PrivateCollection getCollection(@PathVariable("collectionName") String collectionName) {
        return service.getSpecificCollection(collectionName);
    }

    @PostMapping("/add/song")
    public void addNewSong(@RequestBody ArrayList<String> input) {
        service.addSong(input.getFirst(), input.getLast() );
    }

    @DeleteMapping("/delete/song")
    public void deleteSong(@RequestBody ArrayList<String> input) {
        service.deleteSong(input.getFirst(), input.getLast());
    }

    //Give the input like => oldname@newname
    @PostMapping("/update/name/{collectionNames}")
    public void updateName(@PathVariable("collectionNames") String collectionNames) {
        service.UpdateCollectionName(collectionNames);
    }

    @DeleteMapping("delete/{collectionName}")
    public void deleteCollection(@PathVariable("collectionName") String collectionName) {
        service.deleteCollection(collectionName);
    }

}


