package com.muthu.Tunez.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.RandomAccessFile;

import com.muthu.Tunez.Repo.SongsRepo;
import com.muthu.Tunez.model.Songs;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import java.io.OutputStream;

@Service
public class SongsService {

    @Autowired
    private SongsRepo data;

    private final CollectionsService collection;

    @Autowired
    private ArtistsService artist;

    public SongsService(@Lazy CollectionsService collection) {
        this.collection = collection;
    }

    public void createSong(List<Songs> input){
        data.saveAll(input);
    }

    public void createSong(Songs song){
        data.save(song);
    }
    
    public void deleteById(String id){
            data.deleteById(id);
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

    public ArrayList<String> getByString(String input){

        ArrayList<String> songs = (input.charAt(0) == 'C')? collection.getAllSongs(input):
                       (input.charAt(0) == 'A') ? artist.getAllSong(input) : null;

        if(songs != null) Collections.shuffle(songs);

        return songs;
    }

    public void streamAudio(String id,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {

        // Step 1: Build Google Drive download URL
        String songId = getById(id).getUrl();
        String url = "https://drive.google.com/uc?export=download&id=" + songId;

        // Step 2: Download to temp file
        File tempFile = File.createTempFile("song-", ".mp3");
        try (InputStream in = new URL(url).openStream();
             FileOutputStream out = new FileOutputStream(tempFile)) {
            byte[] buffer = new byte[8192];
            int len;
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
        }

        // Step 3: Handle Range
        long fileLength = tempFile.length();
        String range = request.getHeader("Range");
        long start = 0, end = fileLength - 1;

        if (range != null && range.startsWith("bytes=")) {
            String[] parts = range.replace("bytes=", "").split("-");
            start = Long.parseLong(parts[0]);
            if (parts.length > 1 && !parts[1].isEmpty()) {
                end = Long.parseLong(parts[1]);
            }
        }

        long contentLength = end - start + 1;

        // Step 4: Set response headers
        response.setStatus(HttpServletResponse.SC_PARTIAL_CONTENT);
        response.setHeader("Accept-Ranges", "bytes");
        response.setHeader("Content-Range", "bytes " + start + "-" + end + "/" + fileLength);
        response.setHeader("Content-Length", String.valueOf(contentLength));
        response.setHeader("Content-Type", "audio/mpeg");

        // Step 5: Stream byte range
        try (RandomAccessFile raf = new RandomAccessFile(tempFile, "r");
             OutputStream out = response.getOutputStream()) {
            raf.seek(start);
            byte[] buffer = new byte[8192];
            long bytesToRead = contentLength;
            int len;
            while (bytesToRead > 0 && (len = raf.read(buffer, 0, (int) Math.min(buffer.length, bytesToRead))) != -1) {
                out.write(buffer, 0, len);
                bytesToRead -= len;
            }
        } finally {
            tempFile.delete(); // cleanup temp file
        }
    }

    public ResponseEntity<byte[]> getImage(String songId) throws IOException {
        try {
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
        catch(Exception e){
            return null;
        }
    }
    public ResponseEntity<byte[]> getAnySong() throws IOException {
        return  getImage("S" + ((int)(Math.random() * 65) + 1));
    }

    public void updateAllImageFields(String image) {
        List<Songs> songs = data.findByImage(image);

        for (Songs song : songs) {
            song.setImage("12Kdd5qPIqKLIgdSxCBgtY4g76RWpx8d4");

        }

        data.saveAll(songs); // ✅ Bulk update all changed docs
    }
    
}
