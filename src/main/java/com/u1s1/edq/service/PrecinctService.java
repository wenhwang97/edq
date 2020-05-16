package com.u1s1.edq.service;

import com.u1s1.edq.entity.*;
import com.u1s1.edq.enums.ElectionType;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.repository.DemoDataRepository;
import com.u1s1.edq.repository.ElectionDataRepository;
import com.u1s1.edq.repository.PrecinctRepository;
import com.u1s1.edq.service.cache.CachedContainer;
import com.u1s1.edq.service.utils.GeoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class PrecinctService {

    private PrecinctRepository precinctRepo;
    private DemoDataRepository demoDataRepo;
    private ElectionDataRepository electionDataRepo;

    private CachedContainer cachedContainer;
    private GeoUtils geoUtils;

    @Autowired
    public PrecinctService(PrecinctRepository precinctRepo, DemoDataRepository demoDataRepo,
                           ElectionDataRepository electionDataRepo, CachedContainer cachedContainer, GeoUtils geoUtils) {
        this.precinctRepo = precinctRepo;
        this.demoDataRepo = demoDataRepo;
        this.electionDataRepo = electionDataRepo;
        this.cachedContainer = cachedContainer;
        this.geoUtils = geoUtils;
    }

    public Precinct getPrecinctFromMem(String stateId, String countyId, String precinctCName) {
        return cachedContainer.findPrecinct(stateId, countyId, precinctCName);
    }

    public void removePrecinct(String precinctCName) {
        precinctRepo.deleteById(precinctCName);
    }

    public void updatePrecinctDemoData(String stateId, String countyId, String precinctCName, DemoData data) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);

        precinct.getDemoData().setTotalPop(data.getTotalPop());
        precinct.getDemoData().setWhitePop(data.getWhitePop());
        precinct.getDemoData().setBlackPop(data.getBlackPop());
        precinct.getDemoData().setNativePop(data.getNativePop());
        precinct.getDemoData().setAsianPop(data.getAsianPop());
        precinct.getDemoData().setOtherPop(data.getOtherPop());

        demoDataRepo.save(precinct.getDemoData());
    }

    public void updatePrecinctType(String stateId, String countyId, String precinctCName, PrecinctType type) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        precinct.setType(type);
        if (precinct.getType() == PrecinctType.GHOST) {
            for (ElectionData electionData : precinct.getElectionData()) {
                electionData.setDemocraticVote(-1);
                electionData.setRepublicanVote(-1);
                electionData.setLibertarianVote(-1);
                electionData.setGreenVote(-1);
            }

            precinct.getDemoData().setTotalPop(-1);
            precinct.getDemoData().setWhitePop(-1);
            precinct.getDemoData().setBlackPop(-1);
            precinct.getDemoData().setNativePop(-1);
            precinct.getDemoData().setAsianPop(-1);
            precinct.getDemoData().setNativePop(-1);
            precinct.getDemoData().setOtherPop(-1);
        }

        precinctRepo.save(precinct);
    }

    public ElectionData getPrecinctVoteDataFromMem(String stateId, String countyId, String precinctCName, int year) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        for (ElectionData electionData : precinct.getElectionData()) {
            if (electionData.getYear() == year) {
                return electionData;
            }
        }

        return null;
    }

    public void updatePrecinctVoteData(String stateId, String countyId, String precinctCName, ElectionType type, int dist, int year, ElectionData data) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        for (ElectionData electionData : precinct.getElectionData()) {
            if (electionData.getType() == type && electionData.getYear() == year) {
                if (dist != -1) {
                    if (electionData.getDistNum() != dist) {
                        continue;
                    }
                }
                electionData.setDemocraticVote(data.getDemocraticVote());
                electionData.setRepublicanVote(data.getRepublicanVote());
                electionData.setLibertarianVote(data.getLibertarianVote());
                electionData.setGreenVote(data.getGreenVote());

                electionDataRepo.save(electionData);
                break;
            }
        }
    }

    @Transactional
    public void addPrecinctNeighbors(String stateId, String countyId, String precinctCName, Set<String> neighbors) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        for (String neighborCName : neighbors) {
            Precinct neighbor = cachedContainer.findPrecinct(stateId, countyId, neighborCName);
            if (neighbor != null) {
                precinct.getNeighbors().add(neighbor);
                neighbor.getNeighbors().add(precinct);
                precinctRepo.save(neighbor);
            }
        }

        precinctRepo.save(precinct);
    }

    @Transactional
    public void removePrecinctNeighbors(String stateId, String countyId, String precinctCName, Set<String> neighbors) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        for (String neighborCName : neighbors) {
            Precinct neighbor = precinct.removeFromNeighbor(neighborCName);
            if (neighbor != null) {
                precinctRepo.save(neighbor);
            }
        }

        precinctRepo.save(precinct);
    }

    @Transactional
    public void updatePrecinctPolygons(String stateId, String countyId, String precinctCName, Integer geoPolygonId,
                                       GeoPolygon newGeoPolygon) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        GeoPolygon removedGeoPolygon = null;
        for (GeoPolygon geoPolygon : precinct.getBoundary()) {
            if (geoPolygon.getId().equals(geoPolygonId)) {
                removedGeoPolygon = precinct.removeFromBoundaries(geoPolygon);
                break;
            }
        }

        if (removedGeoPolygon != null) {
            precinct.getBoundary().add(newGeoPolygon);
            precinctRepo.save(precinct);
        }
    }

    public void mergePrecinctData(String stateId, String countyId, String precinctMerger, String countyMergee,
                                  String precinctMergee) {
        Precinct merger = cachedContainer.findPrecinct(stateId, countyId, precinctMerger);
        Precinct mergee = cachedContainer.findPrecinct(stateId, countyMergee, precinctMergee);

        merger.getDemoData().setTotalPop(merger.getDemoData().getTotalPop() + mergee.getDemoData().getTotalPop());
        merger.getDemoData().setWhitePop(merger.getDemoData().getWhitePop() + mergee.getDemoData().getWhitePop());
        merger.getDemoData().setBlackPop(merger.getDemoData().getBlackPop() + mergee.getDemoData().getBlackPop());
        merger.getDemoData().setAsianPop(merger.getDemoData().getAsianPop() + mergee.getDemoData().getAsianPop());
        merger.getDemoData().setNativePop(merger.getDemoData().getNativePop() + mergee.getDemoData().getNativePop());
        merger.getDemoData().setOtherPop(merger.getDemoData().getOtherPop() + mergee.getDemoData().getOtherPop());

        for (ElectionData mergeeData : mergee.getElectionData()) {
            for (ElectionData mergerData : merger.getElectionData()) {
                if (mergeeData.getYear() == mergerData.getYear()) {
                    mergerData.setDemocraticVote(mergerData.getDemocraticVote() + mergeeData.getDemocraticVote());
                    mergerData.setRepublicanVote(mergerData.getRepublicanVote() + mergeeData.getRepublicanVote());
                    mergerData.setLibertarianVote(mergerData.getLibertarianVote() + mergeeData.getLibertarianVote());
                    mergerData.setGreenVote(mergerData.getGreenVote() + mergeeData.getGreenVote());
                }
            }
        }
    }

    @Transactional
    public Integer mergeGeoPolygonDonut(String stateId, String countyId, String precinctMerger, String countyMergee,
                                        String precinctMergee, Integer geoPolygonId) {
        Precinct merger = cachedContainer.findPrecinct(stateId, countyId, precinctMerger);
        Precinct mergee = cachedContainer.findPrecinct(stateId, countyMergee, precinctMergee);

        GeoPolygon removedGeoPolygon = null;
        for (GeoPolygon geoPolygon : mergee.getBoundary()) {
            if (geoPolygon.getId().equals(geoPolygonId)) {
                removedGeoPolygon = mergee.removeFromBoundaries(geoPolygon);
                break;
            }
        }

        if (removedGeoPolygon != null) {
            Integer hole = geoUtils.detectSimilarGeoPolygon(removedGeoPolygon, merger.getBoundary());
            for (GeoPolygon geoPolygon : merger.getBoundary()) {
                if (geoPolygon.getId().equals(hole)) {
                    merger.removeFromBoundaries(geoPolygon);
                    break;
                }
            }

            precinctRepo.save(mergee);
            precinctRepo.save(merger);

            return hole;
        }

        return null;
    }

    public void mergeGeoPolygonOverlap(String stateId, String countyId, String precinctId, double xPos, double yPos) {
        Precinct mergee = cachedContainer.findPrecinct(stateId, countyId, precinctId);
        GeoPolygon removedGeoPolygon = geoUtils.findPolygonByPoint(xPos, yPos, mergee.getBoundary());
        mergee.removeFromBoundaries(removedGeoPolygon);

        precinctRepo.save(mergee);
    }
}
