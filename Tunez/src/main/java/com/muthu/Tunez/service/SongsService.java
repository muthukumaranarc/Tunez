package com.muthu.Tunez.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.muthu.Tunez.Repo.SongsRepo;
import com.muthu.Tunez.model.Songs;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SongsService {

    @Autowired
    private SongsRepo data;

    @Autowired
    private CollectionsService collection;

    @Autowired
    private ArtistsService artist;

    public void createSong(List<Songs> input){
        data.saveAll(input);
    }

    public void createSong(Songs song){
        data.save(song);
    }
    
    public boolean deleteById(String id){
        try{
            data.deleteById(id);
            return true;
        }
        catch(Exception e) {
            return false;
        }    
    }
    
    public List<Songs> getAll(int limit){
        List<Songs> out = data.findAll();
        Collections.shuffle(out);
        return out.subList(0, Math.min(limit, out.size()));
    }

    public Songs getById(String id){
        try{
            return data.findById(id).get();
        }
        catch(Exception e){
            return  null;
        }
    }

    public List<Songs> getByString(String input){
        List<Songs> out = new ArrayList<Songs>();

        String songs = (input.charAt(0) == 'C')? collection.getAllSongs(input):
                       (input.charAt(0) == 'A') ? artist.getAllSong(input) : ""; 

        String[] songsId = songs.split("/");
        for(int i=0;i<songsId.length;i++){
            out.add(getById(songsId[i]));
        }
        Collections.shuffle(out);

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

    public ResponseEntity<InputStreamResource> streamAudio(String id) throws IOException {
        String songUrl = getById(id).getUrl();
        
        String url = "https://drive.google.com/uc?export=download&id=" + songUrl;
        @SuppressWarnings("deprecation")
        URL audioUrl = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) audioUrl.openConnection();
        connection.setRequestMethod("GET");

        InputStream inputStream = connection.getInputStream();
        InputStreamResource resource = new InputStreamResource(inputStream);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=audio.mp3")
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .body(resource);

    }
    public ResponseEntity<byte[]> getImage(String songId) throws IOException {
        String imageId = getById(songId).getImage();

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
