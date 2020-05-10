package com.u1s1.edq.controller;

import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.ElectionData;
import com.u1s1.edq.entity.Polygon;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.service.PolygonService;
import com.u1s1.edq.service.PrecinctService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RequestMapping("/state/{stateId}/county/{countyId}/precinct/{precinctCName}")
@RestController
public class PrecinctController {

    private PrecinctService precinctService;
    private PolygonService polygonService;

    @Autowired
    public PrecinctController(PrecinctService precinctService, PolygonService polygonService) {
        this.precinctService = precinctService;
        this.polygonService = polygonService;
    }

    @GetMapping(value = "/data/demo")
    public DemoData sendPrecinctDemoData(@PathVariable String stateId, @PathVariable String countyId,
                                         @PathVariable String precinctCName) {
        return precinctService.getPrecinctFromMem(stateId, countyId, precinctCName).getDemoData();
    }

    @PutMapping(value = "/data/demo")
    public void receivePrecinctDemoData(@PathVariable String stateId, @PathVariable String countyId,
                                        @PathVariable String precinctCName, @RequestBody DemoData data) {
        precinctService.updatePrecinctDemoData(stateId, countyId, precinctCName, data);
    }

    @GetMapping(value = "/data/type")
    public String sendPrecinctType(@PathVariable String stateId, @PathVariable String countyId,
                                   @PathVariable String precinctCName) {
        return precinctService.getPrecinctFromMem(stateId, countyId, precinctCName).getType().toString();
    }

    @PutMapping(value = "/data/define-ghost")
    public void definePrecinctAsGhost(@PathVariable String stateId, @PathVariable String countyId,
                                      @PathVariable String precinctCName) {
        precinctService.updatePrecinctType(stateId, countyId, precinctCName, PrecinctType.GHOST);
    }

    @PutMapping(value = "/data/undefine-ghost")
    public void undefinePrecinctFromGhost(@PathVariable String stateId, @PathVariable String countyId,
                                          @PathVariable String precinctCName) {
        precinctService.updatePrecinctType(stateId, countyId, precinctCName, PrecinctType.NORMAL);
    }

    @GetMapping(value = "/data/vote/presidential/{year}")
    public ElectionData sendPrecinctPresVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                 @PathVariable String precinctCName, @PathVariable int year) {
        return precinctService.getPrecinctVoteDataFromMem(stateId, countyId, precinctCName, year);
    }

    @PutMapping(value = "/data/vote/presidential/{year}")
    public void receivePrecinctPresVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                            @PathVariable String precinctCName, @PathVariable int year,
                                            @RequestBody ElectionData data) {
        precinctService.updatePrecinctVoteData(stateId, countyId, precinctCName, year, data);
    }

    @GetMapping(value = "/data/neighbors")
    public Set<String> sendPrecinctNeighbors(@PathVariable String stateId, @PathVariable String countyId,
                                             @PathVariable String precinctCName) {
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        Set<String> neighbors = new HashSet<String>();

        for (Precinct neighbor : precinct.getNeighbors()) {
            neighbors.add(neighbor.getCanonicalName());
        }

        return neighbors;
    }

    @PostMapping(value = "/data/neighbors")
    public void receivePrecinctAddedNeighbors(@PathVariable String stateId, @PathVariable String countyId,
                                         @PathVariable String precinctCName, @RequestBody Set<String> neighbors) {
        precinctService.addPrecinctNeighbors(stateId, countyId, precinctCName, neighbors);
    }

    @DeleteMapping(value = "/data/neighbors")
    public void receivePrecinctDeletedNeighbors(@PathVariable String stateId, @PathVariable String countyId,
                                                @PathVariable String precinctCName, @RequestBody Set<String> neighbors) {
        precinctService.removePrecinctNeighbors(stateId, countyId, precinctCName, neighbors);
    }

    @PutMapping(value = "/data/boundaries/{polygonId}")
    public void receivePrecinctNewBoundary(@PathVariable String stateId, @PathVariable String countyId,
                                           @PathVariable String precinctCName, @PathVariable Integer polygonId,
                                           @RequestBody Polygon polygon) {
        precinctService.updatePrecinctPolygons(stateId, countyId, precinctCName, polygonId, polygon);
        polygonService.removePolygon(polygonId);
    }
}
