package com.muthu.Tunez.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Collections")
public class Collections {
    @Id
    private String id;
    private String name;
    private String songsId;
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