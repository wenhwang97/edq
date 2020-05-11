package com.u1s1.edq.controller;

import com.u1s1.edq.controller.utils.ResponseObject;
import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.State;
import com.u1s1.edq.service.CountyService;
import com.u1s1.edq.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@RequestMapping("/state/{stateId}")
@RestController
public class StateController {

    private StateService stateService;
    private CountyService countyService;

    @Autowired
    public StateController(StateService stateService, CountyService countyService) {
        this.stateService = stateService;
        this.countyService = countyService;
    }

    @GetMapping(value = "")
    public ResponseEntity<String> selectState(@PathVariable String stateId) {

        if (stateService.getStateFromDB(stateId)) {
            return ResponseEntity.ok().body("");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to cache state");
    }

    @GetMapping(value = "/show-counties")
    public Set<ResponseObject> sendCounties(@PathVariable String stateId) {

        State state = stateService.getStateFromMem(stateId);
        if (state.getCounties().size() == 0) {
            stateService.initCounties(state);
            Iterator<County> it = state.getCounties().iterator();
            while (it.hasNext()) {
                County county = it.next();
                if (county != null) {
                    countyService.initPrecincts(county);
                }
            }
        }

        Set<ResponseObject> response = new HashSet<ResponseObject>();

        for(County county : state.getCounties()) {
            response.add(new ResponseObject(county.getId(), county.getBoundary()));
        }

        return response;
    }

}
