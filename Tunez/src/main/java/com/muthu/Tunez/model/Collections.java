package com.muthu.Tunez.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "Collections")
public class Collections {
    @Id
    private String id;
    private String name;
    private ArrayList<String> songsId;
    private String image;

    public Collections(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<String> getSongsId() {
        return songsId;
    }

    public void setSongsId(ArrayList<String> songsId) {
        this.songsId = songsId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    
}