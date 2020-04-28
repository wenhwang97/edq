package com.u1s1.edq.controller;

import com.u1s1.edq.controller.utils.ResponseObject;
import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.State;
import com.u1s1.edq.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RequestMapping("/state/{stateId}")
@RestController
public class StateController {

    private StateService stateService;

    @Autowired
    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping(value = "")
    public Boolean selectState(@PathVariable String stateId) {

        if (stateService.getStateFromDB(stateId)) {
            return Boolean.TRUE;
        }

        return Boolean.FALSE;
    }

    @GetMapping(value = "/show-counties")
    public Set<ResponseObject> sendCounties(@PathVariable String stateId) {

        State state = stateService.getStateFromMem(stateId);
        System.out.println(state);
        Set<ResponseObject> response = new HashSet<ResponseObject>();

        for(County county : state.getCounties()) {
            response.add(new ResponseObject(county.getId(), county.getBoundary()));
        }

        return response;
    }

}
