package com.u1s1.edq.controller;

import com.u1s1.edq.entity.State;
import com.u1s1.edq.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class StateController {


    private StateRepository stateRepo;

    @Autowired
    public StateController(StateRepository stateRepo) {
        this.stateRepo = stateRepo;
    }

    @GetMapping(value = "/state/{stateId}")
    public State selectState(@PathVariable String stateId) {
        // method body here

        return stateRepo.getState(stateId);
    }


    // Testing controller method
    @PostMapping(value = "/state/{stateId}/send")
    public void receiveState(@RequestBody State state) {

        System.out.println(state.toString());
    }
}
