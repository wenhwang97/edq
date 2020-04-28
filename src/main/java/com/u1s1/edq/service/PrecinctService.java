package com.u1s1.edq.service;

import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.ElectionData;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.enums.ElectionType;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.repository.PrecinctRepository;
import com.u1s1.edq.service.cache.CachedContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrecinctService {

    private PrecinctRepository precinctRepo;
    private CachedContainer cachedContainer;

    @Autowired
    public PrecinctService(PrecinctRepository precinctRepo, CachedContainer cachedContainer) {
        this.precinctRepo = precinctRepo;
        this.cachedContainer = cachedContainer;
    }

    public Precinct getPrecinctFromMem(String stateId, String countyId, String precinctId) {
        return cachedContainer.findPrecinct(stateId, countyId, precinctId);
    }

    public void updatePrecinctDemoData(String stateId, String countyId, String precinctId, DemoData data) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctId);
        precinct.setDemoData(data);
        precinctRepo.save(precinct);
    }

    public void updatePrecinctType(String stateId, String countyId, String precinctId, PrecinctType type) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctId);
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

    public ElectionData getPrecinctVoteDataFromMem(String stateId, String countyId, String precinctId, int year) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctId);
        for (ElectionData electionData : precinct.getElectionData()) {
            if (electionData.getYear() == year) {
                return electionData;
            }
        }

        return null;
    }

    public void updatePrecinctVoteData(String stateId, String countyId, String precinctId, int year, ElectionData data) {
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctId);
        for (ElectionData electionData : precinct.getElectionData()) {
            if (electionData.getYear() == year) {
                electionData.setDemocraticVote(data.getDemocraticVote());
                electionData.setRepublicanVote(data.getRepublicanVote());
                electionData.setLibertarianVote(data.getLibertarianVote());
                electionData.setGreenVote(data.getGreenVote());
                break;
            }
        }

        precinctRepo.save(precinct);
    }
}
