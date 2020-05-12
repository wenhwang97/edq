package com.u1s1.edq.controller;

import com.u1s1.edq.controller.utils.ResponseList;
import com.u1s1.edq.controller.utils.ResponseObject;
import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.service.CountyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RequestMapping("/state/{stateId}/county/{countyId}")
@RestController
public class CountyController {

    private CountyService countyService;

    @Autowired
    public CountyController(CountyService countyService) {
        this.countyService = countyService;
    }

    @GetMapping(value = "/show-precincts")
    public Set<ResponseList> sendPrecincts(@PathVariable String stateId, @PathVariable String countyId) {

        County county = countyService.getCountyFromMem(stateId, countyId);
        if (county.getPrecincts().size() == 0) {
            countyService.initPrecincts(county);
        }
        Set<ResponseList> response = new HashSet<ResponseList>();

        for (Precinct precinct : county.getPrecincts()) {
            ResponseList reslist = new ResponseList(precinct.getCanonicalName());
            if (precinct.getType() == PrecinctType.GHOST) {
                reslist.getObjs().add(null);
                reslist.getObjs().add(null);
            }
            else {
                reslist.getObjs().add(precinct.getDemoData());
                reslist.getObjs().add(precinct.getElectionData());
            }
            reslist.getObjs().add(precinct.getBoundary());
            response.add(reslist);
        }

        return response;
    }

}
