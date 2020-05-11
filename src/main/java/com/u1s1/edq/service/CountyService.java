package com.u1s1.edq.service;

import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.repository.CountyRepository;
import com.u1s1.edq.repository.PrecinctRepository;
import com.u1s1.edq.service.cache.CachedContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CountyService {

    private CountyRepository countyRepo;
    private PrecinctRepository precinctRepo;
    private CachedContainer cachedContainer;

    @Autowired
    public CountyService(CountyRepository countyRepo, PrecinctRepository precinctRepo, CachedContainer cachedContainer) {
        this.countyRepo = countyRepo;
        this.precinctRepo = precinctRepo;
        this.cachedContainer = cachedContainer;
    }

    public County getCountyFromMem(String stateId, String countyId) {
        return cachedContainer.findCounty(stateId, countyId);
    }

    public void initPrecincts(County county) {
        county.setPrecincts(precinctRepo.findAllByCounty(county));
    }

    public void removePrecinctFromCounty(String stateId, String countyId, String precinctCName) {
        County county = cachedContainer.findCounty(stateId, countyId);
        Precinct precinct = cachedContainer.findPrecinct(stateId, countyId, precinctCName);
        county.getPrecincts().remove(precinct);
        countyRepo.save(county);
    }

}
