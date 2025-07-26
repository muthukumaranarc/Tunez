package com.muthu.Tunez.model;

public class PassUpdate {
    private String username;
    private String oldPass;
    private String newPass;

    public PassUpdate(){}

    public PassUpdate(String oldPass, String newPass, String username) {
        this.oldPass = oldPass;
        this.newPass = newPass;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOldPass() {
        return oldPass;
    }

    public void setOldPass(String oldPass) {
        this.oldPass = oldPass;
    }

    public String getNewPass() {
        return newPass;
    }

    public void setNewPass(String newPass) {
        this.newPass = newPass;
    }
}
