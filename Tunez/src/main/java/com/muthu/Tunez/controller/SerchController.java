package com.muthu.Tunez.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.muthu.Tunez.service.SearchService;

@RestController
@RequestMapping("/search")
public class SerchController {

    @Autowired
    private SearchService service;
    
    @GetMapping("/{input}")
    public List<List<?>> search(@PathVariable String input){
        return service.serch(input);
    }

}
