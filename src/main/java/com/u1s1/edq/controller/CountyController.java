package com.u1s1.edq.controller;

import com.u1s1.edq.controller.utils.ResponseObject;
import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.CountyElectionData;
import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.enums.ElectionType;
import com.u1s1.edq.service.CountyService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Set<ResponseObject> sendPrecincts(@PathVariable String stateId, @PathVariable String countyId) {

        County county = countyService.getCounty(stateId, countyId);
        Set<ResponseObject> response = new HashSet<ResponseObject>();

        for (Precinct precinct : county.getPrecincts()) {
            response.add(new ResponseObject(precinct.getId(), precinct.getBoundary()));
        }

        return response;
    }


    @GetMapping(value = "/data/demo")
    public DemoData sendCountyDemoData(@PathVariable String stateId, @PathVariable String countyId) {

        return countyService.getCounty(stateId, countyId).getDemoData();
    }

    @PostMapping(value = "/data/demo")
    public void receiveCountyDemoData(@PathVariable String stateId, @PathVariable String countyId, DemoData demoData) {

        countyService.updateCountyDemoData(stateId, countyId, demoData);
    }


    @GetMapping(value = "/data/vote/presidential/{year}")
    public CountyElectionData sendCountyPresidentialVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                             @PathVariable int year) {

        return countyService.getElectionData(stateId, countyId, ElectionType.PRESIDENTIAL, year);
    }

    @PostMapping(value = "/data/vote/presidential/{year}")
    public void receiveCountyPresidentialVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                  @PathVariable int year, CountyElectionData data) {

        countyService.updateElectionData(stateId, countyId, ElectionType.PRESIDENTIAL, year, data);
    }


    @GetMapping(value = "/data/vote/congressional/{year}")
    public CountyElectionData sendCountyCongressionalVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                              @PathVariable int year) {

        return countyService.getElectionData(stateId, countyId, ElectionType.CONGRESSIONAL, year);
    }

    @PostMapping(value = "/data/vote/congressional/{year}")
    public void receiveCountyCongressionalVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                  @PathVariable int year, CountyElectionData data) {

        countyService.updateElectionData(stateId, countyId, ElectionType.CONGRESSIONAL, year, data);
    }
}
