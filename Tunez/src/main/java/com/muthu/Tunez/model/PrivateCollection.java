package com.muthu.Tunez.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "PrivateCollection")
public class PrivateCollection {

    @Id
    private Integer id;
    private String username;
    private String collectionName;
    private ArrayList<String> songsId;

    public PrivateCollection(){}

    public PrivateCollection(int id, String username, String collectionName, ArrayList<String> songId) {
        this.id = id;
        this.username = username;
        this.collectionName = collectionName;
        this.songsId = songId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public ArrayList<String> getSongsId() {
        return songsId;
    }

    public void setSongsId(ArrayList<String> songsId) {
        this.songsId = songsId;
    }

    @Override
    public String toString() {
        return "PrivateCollection{" +
                "username='" + username + '\'' +
                ", collectionName='" + collectionName + '\'' +
                ", songsId='" + songsId + '\'' +
                '}';
    }
}
