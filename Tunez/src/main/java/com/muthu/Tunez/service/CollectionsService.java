package com.muthu.Tunez.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.muthu.Tunez.Repo.CollectionsRepo;
import com.muthu.Tunez.model.Collections;

@Service
public class CollectionsService {
    
    @Autowired
    private CollectionsRepo data;

    public void createCollection(List<Collections> collections){
        data.saveAll(collections);
    }

    public void createCollection(Collections collection){
        data.save(collection);
    }

    public boolean deleteById(String collectionId) {
        try{
            data.deleteById(collectionId);
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }

    public List<Collections> getAll(int limit){
        List<Collections> out = data.findAll();
        java.util.Collections.shuffle(out); 
        return out.subList(0, Math.min(limit, out.size()));
    }

    public Collections getById(String id) {
        try{
            return data.findById(id).get();
        }
        catch(Exception e) {
            return null;
        } 
    }

    public ArrayList<String> getAllSongs(String collectionId) {
        try{
            return getById(collectionId).getSongsId();
        }
        catch(Exception e) {
            return null;
        }
    }
    
    public void addSong(String collectionId, String songId){
        Collections collection = getById(collectionId);
        ArrayList<String> songs = collection.getSongsId();
        songs.add(songId);
        collection.setSongsId(songs);
        data.save(collection);
    }

    public void deleteSong(String collectionId, String songId) {
        StringBuilder out = new StringBuilder();

        Collections collection = getById(collectionId);
        ArrayList<String> songs = collection.getSongsId();
        songs.remove(songId);
        collection.setSongsId(songs);
        data.save(collection);
    }

    public ResponseEntity<byte[]> getImage(String collectiontId) throws IOException {
        String imageId = getById(collectiontId).getImage();

        @SuppressWarnings("deprecation")
        URL url = new URL("https://drive.google.com/uc?export=download&id=" + imageId);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        InputStream inputStream = connection.getInputStream();
        byte[] imageBytes = inputStream.readAllBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}
