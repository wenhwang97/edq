package com.u1s1.edq.controller;

import com.u1s1.edq.controller.utils.ResponseObject;
import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.ElectionData;
import com.u1s1.edq.entity.GeoPolygon;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.service.CountyService;
import com.u1s1.edq.service.GeoPolygonService;
import com.u1s1.edq.service.PrecinctService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequestMapping("/state/{stateId}/county/{countyId}/precinct/{precinctCName}")
@RestController
public class PrecinctController {

    private PrecinctService precinctService;
    private CountyService countyService;
    private GeoPolygonService geoPolygonService;

    @Autowired
    public PrecinctController(PrecinctService precinctService, CountyService countyService, GeoPolygonService geoPolygonService) {
        this.precinctService = precinctService;
        this.countyService = countyService;
        this.geoPolygonService = geoPolygonService;
    }

    @DeleteMapping(value = "")
    public void removePrecinct(@PathVariable String stateId, @PathVariable String countyId,
                               @PathVariable String precinctCName) {
        countyService.removePrecinctFromCounty(stateId, countyId, precinctCName);
        precinctService.removePrecinct(precinctCName);
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

    @PutMapping(value = "/data/boundaries/{geoPolygonId}")
    public void receivePrecinctNewBoundary(@PathVariable String stateId, @PathVariable String countyId,
                                           @PathVariable String precinctCName, @PathVariable Integer geoPolygonId,
                                           @RequestBody GeoPolygon geoPolygon) {
        precinctService.updatePrecinctPolygons(stateId, countyId, precinctCName, geoPolygonId, geoPolygon);
        geoPolygonService.removePolygon(geoPolygonId);
    }

    @PutMapping(value = "/data/merge-data/{mergeeCountyId}/{mergeePrecinctId}")
    public void mergePrecinctData(@PathVariable String stateId, @PathVariable String countyId,
                                  @PathVariable String precinctCName, @PathVariable String mergeeCountyId,
                                  @PathVariable String mergeePrecinctId) {
        precinctService.mergePrecinctData(stateId, countyId, precinctCName, mergeeCountyId, mergeePrecinctId);
    }

    @PutMapping(value = "/data/merge-donut/{mergeeCountyId}/{mergeePrecinctId}/{polygonId}")
    public List<ResponseObject> mergePrecinctPolygonDonut(@PathVariable String stateId, @PathVariable String countyId,
                                                          @PathVariable String precinctCName, @PathVariable String mergeeCountyId,
                                                          @PathVariable String mergeePrecinctId, @PathVariable Integer polygonId) {
        Integer removedHole = precinctService.mergeGeoPolygonDonut(stateId, countyId, precinctCName, mergeeCountyId, mergeePrecinctId, polygonId);
        if (removedHole != null) {
            geoPolygonService.removePolygon(polygonId);
            geoPolygonService.removePolygon(removedHole);
        }

        List<ResponseObject> response = new ArrayList<ResponseObject>();
        response.add(new ResponseObject(precinctCName, null, precinctService.getPrecinctFromMem(stateId, countyId, precinctCName).getBoundary()));

        Precinct mergee = precinctService.getPrecinctFromMem(stateId, mergeeCountyId, mergeePrecinctId);
        if (mergee.getBoundary().size() == 0) {
            precinctService.removePrecinct(mergeePrecinctId);
            response.add(new ResponseObject(mergeePrecinctId , null, null));
        }
        else {
            response.add(new ResponseObject(mergeePrecinctId, null, precinctService.getPrecinctFromMem(stateId, mergeeCountyId, mergeePrecinctId).getBoundary()));
        }

        return response;
    }
}
