package com.u1s1.edq.service;

import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.CountyElectionData;
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


    public CountyElectionData getElectionData(String stateId, String countyId, ElectionType type, int year) {

        County county = cachedContainer.findCounty(stateId, countyId);

        for (CountyElectionData electionData : county.getElectionData()) {
            if (year == electionData.getYear() && electionData.getType() == type) return electionData;
        }

        return null;
    }

    public void updateElectionData(String stateId, String countyId,
                               ElectionType type, int year, CountyElectionData data) {

        County county = cachedContainer.findCounty(stateId, countyId);

        for (CountyElectionData electionData : county.getElectionData()) {
            if (year == electionData.getYear() && electionData.getType() == type) electionData = data;
        }

        countyRepo.save(county);
    }
}
