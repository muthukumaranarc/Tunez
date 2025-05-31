package com.muthu.Tunez.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
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
        try{
            return data.findById(id).get();
        }
        catch(Exception e) {
            return null;
        }
    }

    public String getAllSong(String artistId){
        return getById(artistId).getSongsId();
    }

    public void addSong(String artistId, String songId) {
        Artists artist = getById(artistId);

        String songs = artist.getSongsId();
        songs += "/" + songId;

        artist.setSongsId(songs);
        
    }

    public void deleteSong(String artistId, String songId) {
        StringBuilder out = new StringBuilder();

        Artists artist = getById(artistId);
        String songs = artist.getSongsId();

        String[] songsarray = songs.split("/");

        for(int i=0;i<songsarray.length;i++){

            songsarray[i] = (songsarray[i] == songId) ? null : songsarray[i];

            if(songsarray[i] != null){
                out.append(songsarray[i] + ((i != songsarray.length-1)? "/" : ""));
            }

        }

        artist.setSongsId(out.toString());
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
