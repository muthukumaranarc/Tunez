package com.muthu.Tunez.controller;

import java.io.IOException;
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

import com.muthu.Tunez.model.Artists;
import com.muthu.Tunez.model.SongInput;
import com.muthu.Tunez.service.ArtistsService;

@RestController
@RequestMapping("/artist")
public class ArtistsController {

    @Autowired
    private ArtistsService service;

    @PostMapping("/create/more")
    public void createArtists(@RequestBody List<Artists> datas){
        service.createArtist(datas);
    }

    @PostMapping("/create")
    public void createArtist(@RequestBody Artists data){
        service.createArtist(data);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteArtist(@PathVariable String id){
        return service.deleteById(id);
    }

    @GetMapping("/get/all/{limit}")
    public List<Artists> getAllArtists(@PathVariable int limit){
        return service.getAll(limit);
    }

    @GetMapping("/get/{id}")
    public Artists getArtistById(@PathVariable String id) {
        return service.getById(id);
    }

    @GetMapping("/get/songs/{artist}")
    public String getAllSongs(@PathVariable String id) {
        return service.getAllSong(id);
    }

    @PostMapping("/add/song")
    public void AddNewSong(@RequestBody SongInput data){
        service.addSong(data.getBlock(), data.getSong());
    }

    @DeleteMapping("/delete/song")
    public void deleteSong(@RequestBody SongInput data) {
        service.deleteSong(data.getBlock(), data.getSong());
    } 

    @GetMapping("/get/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) throws IOException{
        return service.getImage(id);
    }
    
}
