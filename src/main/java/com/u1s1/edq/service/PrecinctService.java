package com.u1s1.edq.service;

import com.u1s1.edq.entity.*;
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
        if (type == PrecinctType.NORMAL) {
            precinct.setType(PrecinctType.NORMAL);
        }
        else if (type == PrecinctType.GHOST) {
            precinct.setType(PrecinctType.GHOST);
        }
        else {
            System.err.println("Unsupported Precinct Type.");
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

    public void updatePrecinctVoteData(String stateId, String countyId, String precinctCName, int year, ElectionData data) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        for (ElectionData electionData : precinct.getElectionData()) {
            if (electionData.getYear() == year) {
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
            Precinct neighbor = cachedContainer.findPrecinct(stateId, countyId, neighborCName);
            if (neighbor != null) {
                precinct.getNeighbors().remove(neighbor);
                neighbor.getNeighbors().remove(precinct);
                precinctRepo.save(neighbor);
            }
        }

        precinctRepo.save(precinct);
    }

    @Transactional
    public void updatePrecinctPolygons(String stateId, String countyId, String precinctCName, Integer geoPolygonId, GeoPolygon newGeoPolygon) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        GeoPolygon removedGeoPolygon = null;
        for (GeoPolygon geoPolygon : precinct.getBoundary()) {
            if (geoPolygon.getId().equals(geoPolygonId)) {
                precinct.getBoundary().remove(geoPolygon);
                removedGeoPolygon = geoPolygon;
                break;
            }
        }

        if (removedGeoPolygon != null) {
            precinct.getBoundary().add(newGeoPolygon);
            precinctRepo.save(precinct);
        }
    }

    @Transactional
    public Integer mergeGeoPolygonDonut(String stateId, String countyId, String precinctMerger, String precinctMergee,
                                  Integer geoPolygonId) {
        Precinct merger = cachedContainer.findPrecinct(stateId, countyId, precinctMerger);
        Precinct mergee = cachedContainer.findPrecinct(stateId, countyId, precinctMergee);

        GeoPolygon removedGeoPolygon = null;
        for (GeoPolygon geoPolygon : mergee.getBoundary()) {
            if (geoPolygon.getId().equals(geoPolygonId)) {
                mergee.getBoundary().remove(geoPolygon);
                removedGeoPolygon = geoPolygon;
                break;
            }
        }

        if (removedGeoPolygon != null) {
            Integer hole = geoUtils.detectSimilarGeoPolygon(removedGeoPolygon, merger.getBoundary());
            for (GeoPolygon geoPolygon : merger.getBoundary()) {
                if (geoPolygon.getId().equals(hole)) {
                    merger.getBoundary().remove(geoPolygon);
                }
            }

            precinctRepo.save(mergee);
            precinctRepo.save(merger);

            return hole;
        }

        return null;
    }
}
