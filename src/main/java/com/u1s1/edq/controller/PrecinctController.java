package com.u1s1.edq.controller;

import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.ElectionData;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.service.PrecinctService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RequestMapping("/state/{stateId}/county/{countyId}/precinct/{precinctId}")
@RestController
public class PrecinctController {

    private PrecinctService precinctService;

    @Autowired
    public PrecinctController(PrecinctService precinctService) {
        this.precinctService = precinctService;
    }

    @GetMapping(value = "/data/demo")
    public DemoData sendPrecinctDemoData(@PathVariable String stateId, @PathVariable String countyId,
                                         @PathVariable String precinctId) {
        return precinctService.getPrecinctFromMem(stateId, countyId, precinctId).getDemoData();
    }

    @PostMapping(value = "/data/demo")
    public void receivePrecinctDemoData(@PathVariable String stateId, @PathVariable String countyId,
                                        @PathVariable String precinctId, @RequestBody DemoData data) {
        precinctService.updatePrecinctDemoData(stateId, countyId, precinctId, data);
    }

    @GetMapping(value = "/data/type")
    public String sendPrecinctType(@PathVariable String stateId, @PathVariable String countyId,
                                   @PathVariable String precinctId) {
        return precinctService.getPrecinctFromMem(stateId, countyId, precinctId).getType().toString();
    }

    @PostMapping(value = "/data/define-ghost")
    public void definePrecinctAsGhost(@PathVariable String stateId, @PathVariable String countyId,
                                      @PathVariable String precinctId) {
        precinctService.updatePrecinctType(stateId, countyId, precinctId, PrecinctType.GHOST);
    }

    @PostMapping(value = "/data/undefine-ghost")
    public void undefinePrecinctFromGhost(@PathVariable String stateId, @PathVariable String countyId,
                                          @PathVariable String precinctId) {
        precinctService.updatePrecinctType(stateId, countyId, precinctId, PrecinctType.NORMAL);
    }

    @GetMapping(value = "/data/vote/presidential/{year}")
    public ElectionData sendPrecinctPresVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                 @PathVariable String precinctId, @PathVariable int year) {
        return precinctService.getPrecinctVoteDataFromMem(stateId, countyId, precinctId, year);
    }

    @PostMapping(value = "/data/vote/presidential/{year}")
    public void receivePrecinctPresVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                            @PathVariable String precinctId, @PathVariable int year,
                                            @RequestBody ElectionData data) {
        precinctService.updatePrecinctVoteData(stateId, countyId, precinctId, year, data);
    }

    @GetMapping(value = "/data/neighbors")
    public Set<String> sendPrecinctNeighbors(@PathVariable String stateId, @PathVariable String countyId,
                                             @PathVariable String precinctId) {
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctId);
        Set<String> neighbors = new HashSet<String>();

        for (Precinct neighbor : precinct.getNeighbors()) {
            neighbors.add(neighbor.getId());
        }

        return neighbors;
    }
}
