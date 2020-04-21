package com.u1s1.edq.service;

import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.ElectionData;
import com.u1s1.edq.enums.ElectionType;
import com.u1s1.edq.repository.CountyRepository;
import com.u1s1.edq.service.cache.CachedContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CountyService {


    private CountyRepository countyRepo;
    private CachedContainer cachedContainer;

    @Autowired
    public CountyService(CountyRepository countyRepo, CachedContainer cachedContainer) {
        this.countyRepo = countyRepo;
        this.cachedContainer = cachedContainer;
    }


    public County getCounty(String stateId, String countyId) {
        return cachedContainer.findCounty(stateId, countyId);
    }


    public void updateCountyDemoData(String stateId, String countyId, DemoData demoData) {
        County county = cachedContainer.findCounty(stateId, countyId);
        county.setDemoData(demoData);
        countyRepo.save(county);
    }


    public ElectionData getElectionData(String stateId, String countyId, ElectionType type, int year) {

        County county = cachedContainer.findCounty(stateId, countyId);

        if (type == ElectionType.CONGRESSIONAL) {
            for (ElectionData electionData : county.getCongressionalElectionData()) {
                if (year == electionData.getYear()) return electionData;
            }

            return null;
        }
        else if (type == ElectionType.PRESIDENTIAL) {
            for (ElectionData electionData : county.getPresidentialElectionData()) {
                if (year == electionData.getYear()) return electionData;
            }

            return null;
        }
        else {
            return null;
        }
    }

    public void updateElectionData(String stateId, String countyId,
                               ElectionType type, int year, ElectionData data) {

        County county = cachedContainer.findCounty(stateId, countyId);

        if (type == ElectionType.CONGRESSIONAL) {
            for (ElectionData electionData : county.getCongressionalElectionData()) {
                if (year == electionData.getYear()) electionData = data;
            }
        }
        else if (type == ElectionType.PRESIDENTIAL) {
            for (ElectionData electionData : county.getPresidentialElectionData()) {
                if (year == electionData.getYear()) electionData = data;
            }
        }
        else {
            return;
        }

        countyRepo.save(county);
    }
}
