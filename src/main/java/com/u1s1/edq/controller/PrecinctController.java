package com.u1s1.edq.controller;

import com.u1s1.edq.controller.utils.*;
import com.u1s1.edq.entity.*;
import com.u1s1.edq.enums.ElectionType;
import com.u1s1.edq.enums.OperationType;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.service.CorrectionLogService;
import com.u1s1.edq.service.CountyService;
import com.u1s1.edq.service.PrecinctService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequestMapping("/state/{stateId}/county/{countyId}/precinct/{precinctCName}")
@RestController
public class PrecinctController {

    private PrecinctService precinctService;
    private CountyService countyService;
    private CorrectionLogService correctionLogService;

    private final String LOG_UPDATE_DEMO_DESC = "Update Precinct '@0' demographic data";
    private final String LOG_ADD_NEIGHBOR_DESC = "Add Precinct '@0' as neighbor to Precinct '@1'";
    private final String LOG_REMOVE_NEIGHBOR_DESC = "Remove Precinct '@0' as neighbor from Precinct '@1'";
    private final String LOG_DEFINE_GHOST_DESC = "Define Precinct '@0' as ghost precinct";
    private final String LOG_UNDEFINE_GHOST_DESC = "Define Precinct '@0' as normal precinct";
    private final String LOG_UPDATE_PRES_VOTE_DESC = "Update Precinct '@0' @1 presidential voting data";
    private final String LOG_UPDATE_CONG_VOTE_DESC = "Update Precinct '@0' @1 congressional voting data in District #@2";
    private final String LOG_UPDATE_POLYGON_DESC = "Update Precinct '@0' boundary's polygon";
    private final String LOG_MERGE_DATA_DESC = "Merge Precinct '@0' data into Precinct '@1'";
    private final String LOG_MERGE_DONUT_DESC = "Merge Precinct '@0' polygon into Precinct '@1'";
    private final String LOG_MERGE_OVERLAP_DESC = "Merge Precinct '@0' polygon overlap into Precinct '@1'";
    private final String LOG_CLOSE_POLYGON_DESC = "Close Precinct '@0' boundary";

    @Autowired
    public PrecinctController(PrecinctService precinctService, CountyService countyService,
                              CorrectionLogService correctionLogService) {
        this.precinctService = precinctService;
        this.countyService = countyService;
        this.correctionLogService = correctionLogService;
    }

    @GetMapping(value = "/data/demo")
    public DemoData sendPrecinctDemoData(@PathVariable String stateId, @PathVariable String countyId,
                                         @PathVariable String precinctCName) {
        return precinctService.getPrecinctFromMem(stateId, countyId, precinctCName).getDemoData();
    }

    @PutMapping(value = "/data/demo")
    public void receivePrecinctDemoData(@PathVariable String stateId, @PathVariable String countyId,
                                        @PathVariable String precinctCName, @RequestBody RequestDemo data) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();
        String desc = LOG_UPDATE_DEMO_DESC;
        desc = desc.replace("@0", precinct.getName());

        precinctService.updatePrecinctDemoData(stateId, countyId, precinctCName, data.getDemoData());

        correctionLogService.addDataLog(state, precinctCName, OperationType.UPDATE_DEMO, desc, data.getComment(), dateTime);
    }

    @GetMapping(value = "/data/type")
    public String sendPrecinctType(@PathVariable String stateId, @PathVariable String countyId,
                                   @PathVariable String precinctCName) {
        return precinctService.getPrecinctFromMem(stateId, countyId, precinctCName).getType().toString();
    }

    @PutMapping(value = "/data/define-ghost")
    public void definePrecinctAsGhost(@PathVariable String stateId, @PathVariable String countyId,
                                      @PathVariable String precinctCName, @RequestBody RequestComment comment) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();
        String desc = LOG_DEFINE_GHOST_DESC;
        desc = desc.replace("@0", precinct.getName());

        precinctService.updatePrecinctType(stateId, countyId, precinctCName, PrecinctType.GHOST);

        correctionLogService.addDataLog(state, precinctCName, OperationType.EDIT_GHOST, desc, comment.getComment(), dateTime);
    }

    @PutMapping(value = "/data/undefine-ghost")
    public void undefinePrecinctFromGhost(@PathVariable String stateId, @PathVariable String countyId,
                                          @PathVariable String precinctCName, @RequestBody RequestComment comment) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();
        String desc = LOG_UNDEFINE_GHOST_DESC;
        desc = desc.replace("@0", precinct.getName());

        precinctService.updatePrecinctType(stateId, countyId, precinctCName, PrecinctType.NORMAL);

        correctionLogService.addDataLog(state, precinctCName, OperationType.EDIT_GHOST, desc, comment.getComment(), dateTime);
    }

    @GetMapping(value = "/data/vote/presidential/{year}")
    public ElectionData sendPrecinctPresVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                 @PathVariable String precinctCName, @PathVariable int year) {
        return precinctService.getPrecinctVoteDataFromMem(stateId, countyId, precinctCName, year);
    }

    @PutMapping(value = "/data/vote/presidential/{year}")
    public void receivePrecinctPresVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                            @PathVariable String precinctCName, @PathVariable int year,
                                            @RequestBody RequestVote data) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();
        String desc = new String(LOG_UPDATE_PRES_VOTE_DESC.toString());
        desc = desc.replace("@0", precinct.getName());
        desc = desc.replace("@1", year + "");

        precinctService.updatePrecinctVoteData(stateId, countyId, precinctCName, ElectionType.PRESIDENTIAL, -1, year, data.getData());

        correctionLogService.addDataLog(state, precinctCName, OperationType.EDIT_PRES_VOTE, desc, data.getComment(), dateTime);
    }

    @GetMapping(value = "/data/vote/congressional/{dist}/{year}")
    public ElectionData sendPrecinctCongVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                                 @PathVariable String precinctCName, @PathVariable int dist,
                                                 @PathVariable int year) {
        return precinctService.getPrecinctVoteDataFromMem(stateId, countyId, precinctCName, year);
    }

    @PutMapping(value = "/data/vote/congressional/{dist}/{year}")
    public void receivePrecinctCongVoteData(@PathVariable String stateId, @PathVariable String countyId,
                                            @PathVariable String precinctCName, @PathVariable int dist,
                                            @PathVariable int year, @RequestBody RequestVote data) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();
        String desc = LOG_UPDATE_CONG_VOTE_DESC;
        desc = desc.replace("@0", precinct.getName());
        desc = desc.replace("@1", year + "");
        desc = desc.replace("@2", dist + "");

        precinctService.updatePrecinctVoteData(stateId, countyId, precinctCName, ElectionType.CONGRESSIONAL, dist, year, data.getData());

        correctionLogService.addDataLog(state, precinctCName, OperationType.EDIT_CONG_VOTE, desc, data.getComment(), dateTime);
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
                                         @PathVariable String precinctCName, @RequestBody RequestNeighbors neighbors) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();

        precinctService.addPrecinctNeighbors(stateId, countyId, precinctCName, neighbors.getNeighbors());

        for (String neighbor : neighbors.getNeighbors()) {
            String desc = LOG_ADD_NEIGHBOR_DESC;
            desc = desc.replace("@0", neighbor);
            desc = desc.replace("@1", precinct.getName());
            correctionLogService.addDataLog(state, precinctCName, OperationType.EDIT_NEIGHBOR, desc, neighbors.getComment(), dateTime);
        }
    }

    @DeleteMapping(value = "/data/neighbors")
    public void receivePrecinctDeletedNeighbors(@PathVariable String stateId, @PathVariable String countyId,
                                                @PathVariable String precinctCName, @RequestBody RequestNeighbors neighbors) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();

        precinctService.removePrecinctNeighbors(stateId, countyId, precinctCName, neighbors.getNeighbors());

        for (String neighbor : neighbors.getNeighbors()) {
            String desc = LOG_REMOVE_NEIGHBOR_DESC;
            desc = desc.replace("@0", neighbor);
            desc = desc.replace("@1", precinct.getName());
            correctionLogService.addDataLog(state, precinctCName, OperationType.EDIT_NEIGHBOR, desc, neighbors.getComment(), dateTime);
        }
    }

    @PutMapping(value = "/data/boundaries/{geoPolygonId}")
    public void receivePrecinctNewBoundary(@PathVariable String stateId, @PathVariable String countyId,
                                           @PathVariable String precinctCName, @PathVariable Integer geoPolygonId,
                                           @RequestBody RequestPoly geoPolygon) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();
        String desc = LOG_UPDATE_POLYGON_DESC;

        List<GeoPolygon> polygons = precinctService.updatePrecinctPolygons(stateId, countyId, precinctCName, geoPolygonId, geoPolygon.getPolygon());

        desc = desc.replace("@0", precinct.getName());
        if (polygons.size() == 2) {
            correctionLogService.addPolygonLog(state, precinctCName, OperationType.EDIT_BOUNDARY, polygons.get(0), polygons.get(1), desc, geoPolygon.getComment(), dateTime);
        }
    }

    @PutMapping(value = "/data/merge-data/{mergeeCountyId}/{mergeePrecinctId}")
    public void mergePrecinctData(@PathVariable String stateId, @PathVariable String countyId,
                                  @PathVariable String precinctCName, @PathVariable String mergeeCountyId,
                                  @PathVariable String mergeePrecinctId, @RequestBody RequestComment comment) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct merger = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        Precinct mergee = precinctService.getPrecinctFromMem(stateId, mergeeCountyId, mergeePrecinctId);
        State state = merger.getCounty().getState();
        String desc = LOG_MERGE_DATA_DESC;
        desc = desc.replace("@0", mergee.getName());
        desc = desc.replace("@1", merger.getName());

        precinctService.mergePrecinctData(stateId, countyId, precinctCName, mergeeCountyId, mergeePrecinctId);

        correctionLogService.addDataLog(state, precinctCName, OperationType.MERGE_DATA, desc, comment.getComment(), dateTime);
    }

    @PutMapping(value = "/data/merge-donut/{mergeeCountyId}/{mergeePrecinctId}/{polygonId}")
    public List<ResponseObject> mergePrecinctPolygonDonut(@PathVariable String stateId, @PathVariable String countyId,
                                                          @PathVariable String precinctCName,
                                                          @PathVariable String mergeeCountyId,
                                                          @PathVariable String mergeePrecinctId,
                                                          @PathVariable Integer polygonId,
                                                          @RequestBody RequestComment comment) {
        if (precinctCName.equals(mergeePrecinctId)) {
            return null;
        }

        LocalDateTime dateTime = LocalDateTime.now();
        Precinct merger = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        Precinct mergee = precinctService.getPrecinctFromMem(stateId, mergeeCountyId, mergeePrecinctId);
        State state = merger.getCounty().getState();
        String desc = LOG_MERGE_DONUT_DESC;
        desc = desc.replace("@0", mergee.getName());
        desc = desc.replace("@1", merger.getName());

        List<GeoPolygon> polygons = precinctService.mergeGeoPolygonDonut(stateId, countyId, precinctCName, mergeeCountyId, mergeePrecinctId, polygonId);
        if (polygons.size() == 2) {
            desc += " removing polygon ID#" + polygonId + " and hole ID#" + polygons.get(1).getId();
        }

        List<ResponseObject> response = new ArrayList<ResponseObject>();
        response.add(new ResponseObject(precinctCName, null, precinctService.getPrecinctFromMem(stateId, countyId, precinctCName).getBoundary()));

        if (mergee.getBoundary().size() == 0) {
            desc += " and remove merged precinct";
            response.add(new ResponseObject(mergeePrecinctId , null, null));
        }
        else {
            response.add(new ResponseObject(mergeePrecinctId, null, precinctService.getPrecinctFromMem(stateId, mergeeCountyId, mergeePrecinctId).getBoundary()));
        }

        correctionLogService.addPolygonLog(state, precinctCName, OperationType.MERGE_POLY, polygons.get(0), polygons.get(1), desc, comment.getComment(), dateTime);

        return response;
    }

    @PutMapping(value = "/data/merge-overlap/{mergeeCountyId}/{mergeePrecinctId}/{xPos}/{yPos}")
    public ResponseObject mergePrecinctPolygonOverlap(@PathVariable String stateId, @PathVariable String countyId,
                                                      @PathVariable String precinctCName,
                                                      @PathVariable String mergeeCountyId,
                                                      @PathVariable String mergeePrecinctId,
                                                      @PathVariable double xPos,
                                                      @PathVariable double yPos,
                                                      @RequestBody RequestComment comment) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct merger = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        Precinct mergee = precinctService.getPrecinctFromMem(stateId, mergeeCountyId, mergeePrecinctId);
        State state = merger.getCounty().getState();

        GeoPolygon polygon = precinctService.mergeGeoPolygonOverlap(stateId, mergeeCountyId, mergeePrecinctId, xPos, yPos);

        String desc = LOG_MERGE_OVERLAP_DESC;
        desc = desc.replace("@0", mergee.getName());
        desc = desc.replace("@1", merger.getName());
        desc += " and removing polygon ID#" + polygon.getId();

        correctionLogService.addPolygonLog(state, precinctCName, OperationType.MERGE_POLY, polygon, null, desc, comment.getComment(), dateTime);

        return new ResponseObject(mergee.getCanonicalName(), mergee.getName(), mergee.getBoundary());
    }

    @PutMapping(value = "/data/close-boundary")
    public ResponseObject closeUnclosedPrecinctPolygon(@PathVariable String stateId, @PathVariable String countyId,
                                                       @PathVariable String precinctCName,
                                                       @RequestBody RequestComment comment) {
        LocalDateTime dateTime = LocalDateTime.now();
        Precinct precinct = precinctService.getPrecinctFromMem(stateId, countyId, precinctCName);
        State state = precinct.getCounty().getState();
        String desc = LOG_CLOSE_POLYGON_DESC;
        desc = desc.replace("@0", precinct.getName());

        precinctService.closeGeoPolygon(stateId, countyId, precinctCName);

        correctionLogService.addDataLog(state, precinctCName, OperationType.CLOSE_POLYGON, desc, comment.getComment(), dateTime);

        return new ResponseObject(precinct.getCanonicalName(), precinct.getName(), precinct.getBoundary());
    }
}
