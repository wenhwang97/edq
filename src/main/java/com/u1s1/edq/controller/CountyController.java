package com.u1s1.edq.controller;

import com.u1s1.edq.controller.utils.ResponseObject;
import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.Precinct;
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

        County county = countyService.getCountyFromMem(stateId, countyId);
        Set<ResponseObject> response = new HashSet<ResponseObject>();

        for (Precinct precinct : county.getPrecincts()) {
            response.add(new ResponseObject(precinct.getId(), precinct.getBoundary()));
        }

        return response;
    }

    @GetMapping(value = "/data/demo")
    public DemoData sendCountyDemoData(@PathVariable String stateId, @PathVariable String countyId) {

        return countyService.getCountyFromMem(stateId, countyId).getDemoData();
    }

    @PutMapping(value = "/data/demo")
    public void receiveCountyDemoData(@PathVariable String stateId, @PathVariable String countyId,
                                      @RequestBody DemoData demoData) {

        countyService.updateCountyDemoData(stateId, countyId, demoData);
    }

}
