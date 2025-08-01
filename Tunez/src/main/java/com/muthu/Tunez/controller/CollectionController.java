package com.muthu.Tunez.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muthu.Tunez.model.Collections;
import com.muthu.Tunez.model.SongInput;
import com.muthu.Tunez.service.CollectionsService;

@RestController
@RequestMapping("/collection")
public class CollectionController {

    @Autowired
    private CollectionsService service;

    @PostMapping("/create/more")
    public void createCollections(@RequestBody List<Collections> datas){
        service.createCollection(datas);
    }

    @PostMapping("/create")
    public void createCollection(@RequestBody Collections data){
        service.createCollection(data);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteCollection(@PathVariable("id") String id){
        return service.deleteById(id);
    }

    @GetMapping("/get/all/{limit}")
    public List<Collections> getAllCollections(@PathVariable("limit") int limit){
        return service.getAll(limit);
    }

    @GetMapping("/get/{id}")
    public Collections getCollectionById(@PathVariable("id") String id){
        return service.getById(id);
    }

    @GetMapping("/get/songs/{collection}")
    public ArrayList<String> getAllSongs(@PathVariable("collection") String collection){
        return service.getAllSongs(collection);
    }

    @PostMapping("/add/song")
    public void addNewSong(@RequestBody SongInput data){
        service.addSong(data.getBlock(), data.getSong());
    }

    @DeleteMapping("/delete/song")
    public void deleteSong(@RequestBody SongInput data){
        service.deleteSong(data.getBlock(), data.getSong());
    }

    @GetMapping("/get/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") String id) throws IOException{
        return service.getImage(id);
    }
}
