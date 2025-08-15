package com.muthu.Tunez.service;

import com.muthu.Tunez.Repo.PrivateCollectionRepo;
import com.muthu.Tunez.model.PrivateCollection;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrivateCollectionService {

    @Autowired
    private PrivateCollectionRepo data;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private HttpServletRequest request;

    public List<PrivateCollection> getCollections() {
        return data.findAllByUsername(jwtService.getCurrentUsername(request));
    }

    public String createCollection(PrivateCollection coll) {
        String collName = coll.getCollectionName();
        for(PrivateCollection current : getCollections()) {
            if(current.getCollectionName().equals(collName)) return "Collection is already exist in this user";
        }
        coll.setUsername(jwtService.getCurrentUsername(request));
        data.save(coll);
        return "Collection created!";
    }

    public PrivateCollection getSpecificCollection(String collectionName) {
        List<PrivateCollection> collections = getCollections();
        for(PrivateCollection coll: collections) {
            if(coll.getCollectionName().equals(collectionName)) {
                return coll;
            }
        }
        return null;
    }

    //Give the input like => oldname@newname
    public void UpdateCollectionName(String collectionNames) {
        List<PrivateCollection> collections = getCollections();
        String[] name = collectionNames.split("@");
        PrivateCollection coll = getSpecificCollection(name[0]);
        coll.setCollectionName(name[1]);
        data.save(coll);
    }

    public void addSong(String collectionName, String  songId) {
        PrivateCollection collection = getSpecificCollection(collectionName);
        ArrayList<String> songs = collection.getSongsId();
        songs.add(songId);
        System.out.println(collectionName + " " + songId);
        data.save(collection);
    }

    public void deleteSong(String collectionName, String songId) {
        PrivateCollection collection = getSpecificCollection(collectionName);
        ArrayList<String> songs = collection.getSongsId();
        songs.remove(songId);

    }

    public String deleteCollection(String collectionName) {
        try{
            data.delete(getSpecificCollection(collectionName));
            return "Collection deleted!";
        }
        catch (Exception e) {
            return "Collection not exist!";
        }
    }

    public boolean deleteCollectionByUserName(String userName) {
        try{
            List<PrivateCollection> list = data.findAllByUsername(userName);
            for(PrivateCollection val : list) {
                data.delete(val);
            }
            return true;
        }
        catch (Exception e) {
            return false;
        }

    }
}
