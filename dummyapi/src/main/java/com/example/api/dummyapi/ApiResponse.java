package com.example.api.dummyapi;

import java.util.List;

public class ApiResponse {
    private List<User> users;

    public List<User> getUsers() 
    { 
    	return users; 
    }
    public void setUsers(List<User> users) 
    { 
    	this.users = users; 
    }
}

