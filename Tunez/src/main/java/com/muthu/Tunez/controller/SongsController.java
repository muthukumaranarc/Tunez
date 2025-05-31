package com.muthu.Tunez.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muthu.Tunez.model.Songs;
import com.muthu.Tunez.service.SongsService;

@RestController
@RequestMapping("/song")
public class SongsController {

    @Autowired
    private SongsService service;

    @PostMapping("/create/more")
    public void CreateSong(@RequestBody List<Songs> data){
        service.createSong(data);
    }

    @PostMapping("/create")
    public void createSong(@RequestBody Songs data){
        service.createSong(data);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteSong(@PathVariable String id) {
        return service.deleteById(id);
    }
    
    @GetMapping("/get/all/{limit}")
    public List<Songs> getAllSongs(@PathVariable int limit) {
        return service.getAll(limit);
    }

    @GetMapping("/get/{id}")
    public Songs getSongById(@PathVariable String id){
        return service.getById(id);
    }

    @GetMapping("/get/category/{category}")
    public List<Songs> getSongByCategory(@PathVariable String category){
        return service.getByCategory(category);
    }

    @GetMapping("/get/artist/{artist}")
    public List<Songs> getSongByArtist(@PathVariable String artist){
        return service.getByArtist(artist);
    }

    @GetMapping("/play/{id}")
    public ResponseEntity<InputStreamResource> streamAudio(@PathVariable String id)  throws IOException{
        return service.streamAudio(id);
    }

    @GetMapping("/shuffle/{input}")
    public List<Songs> getByString(@PathVariable String input) {
        return service.getByString(input);
    }

    @GetMapping("/get/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) throws IOException{
        return service.getImage(id);
    }
}