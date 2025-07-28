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

import com.muthu.Tunez.Repo.ArtistsRepo;
import com.muthu.Tunez.model.Artists;

@Service
public class ArtistsService {

    @Autowired
    private ArtistsRepo data;

    public void createArtist(List<Artists> artists){
        data.saveAll(artists);
    }

    public void createArtist(Artists artist){
        data.save(artist);
    }
    
    public boolean deleteById(String id) {
        try{
            data.deleteById(id);
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }

    public List<Artists> getAll(int limit){
        List<Artists> out = data.findAll();
        java.util.Collections.shuffle(out); 
        return out.subList(0, Math.min(limit, out.size()));
    }

    public Artists getById(String id){
            return (data.findById(id).isPresent()) ? data.findById(id).get(): null;
    }

    public ArrayList<String> getAllSong(String artistId){
        System.out.println(getById(artistId));
        return getById(artistId).getSongsId();
    }

    public void addSong(String artistId, String songId) {
        Artists artist = getById(artistId);
        ArrayList<String> songs = artist.getSongsId();
        songs.add(songId);
        artist.setSongsId(songs);
        data.save(artist);
    }

    public void deleteSong(String artistId, String songId) {
        Artists artist = getById(artistId);
        ArrayList<String> songs = artist.getSongsId();
        songs.remove(songId);
        artist.setSongsId(songs);
        data.save(artist);
    }

    public ResponseEntity<byte[]> getImage(String artistId) throws IOException {
        String imageId = getById(artistId).getImage();

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
