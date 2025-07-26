package com.muthu.Tunez.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Users")
public class Users {

    @Id
    private String username;
    private String password;
    private String privateCollection;

    public Users() {}

    public Users(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getPrivateCollection() {
        return privateCollection;
    }

    public void setPrivateCollection(String privateCollection) {
        this.privateCollection = privateCollection;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "Users{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", privateCollection='" + privateCollection + '\'' +
                '}';
    }
}
