package com.muthu.Tunez.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Artists") 
public class Artists {
    @Id
    private String id;
    private String artist;
    private String songsId;
    private String image;

    public Artists(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getSongsId() {
        return songsId;
    }

    public void setSongsId(String songsId) {
        this.songsId = songsId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}