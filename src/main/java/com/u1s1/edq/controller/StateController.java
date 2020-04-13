package com.u1s1.edq.controller;

import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.StateEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StateController {

    @GetMapping(value = "/state/{stateId}")
    public StateEntity selectState(@PathVariable String stateId) {
        // method body here

        return null;
    }

}
