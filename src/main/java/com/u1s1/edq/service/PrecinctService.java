package com.u1s1.edq.service;

import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.ElectionData;
import com.u1s1.edq.entity.Polygon;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.repository.DemoDataRepository;
import com.u1s1.edq.repository.ElectionDataRepository;
import com.u1s1.edq.repository.PolygonRepository;
import com.u1s1.edq.repository.PrecinctRepository;
import com.u1s1.edq.service.cache.CachedContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class PrecinctService {

    private PrecinctRepository precinctRepo;
    private DemoDataRepository demoDataRepo;
    private ElectionDataRepository electionDataRepo;
    private PolygonRepository polygonRepo;
    private CachedContainer cachedContainer;

    @Autowired
    public PrecinctService(PrecinctRepository precinctRepo, DemoDataRepository demoDataRepo,
                           ElectionDataRepository electionDataRepo, PolygonRepository polygonRepo, CachedContainer cachedContainer) {
        this.precinctRepo = precinctRepo;
        this.demoDataRepo = demoDataRepo;
        this.electionDataRepo = electionDataRepo;
        this.polygonRepo = polygonRepo;
        this.cachedContainer = cachedContainer;
    }

    public Precinct getPrecinctFromMem(String stateId, String countyId, String precinctCName) {
        return cachedContainer.findPrecinct(stateId, countyId, precinctCName);
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
    public void updatePrecinctPolygons(String stateId, String countyId, String precinctCName, Integer polygonId, Polygon newPolygon) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        Polygon removedPolygon = null;
        for (Polygon polygon : precinct.getBoundary()) {
            if (polygon.getId().equals(polygonId)) {
                precinct.getBoundary().remove(polygon);
                removedPolygon = polygon;
                break;
            }
        }

        if (removedPolygon != null) {
            precinct.getBoundary().add(newPolygon);
            precinctRepo.save(precinct);
        }
    }
}
