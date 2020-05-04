package com.u1s1.edq.service;

import com.u1s1.edq.entity.County;
import com.u1s1.edq.repository.CountyRepository;
import com.u1s1.edq.service.cache.CachedContainer;
import com.u1s1.edq.entity.State;
import com.u1s1.edq.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class StateService {

    private StateRepository stateRepo;
    private CountyRepository countyRepo;
    private CachedContainer cachedContainer;

    @Autowired
    public StateService(StateRepository stateRepo, CountyRepository countyRepo, CachedContainer cachedContainer) {
        this.stateRepo = stateRepo;
        this.countyRepo = countyRepo;
        this.cachedContainer = cachedContainer;
    }

    public boolean getStateFromDB(String stateId) {
        if (cachedContainer.hasState(stateId)) {
            return true;
        }

        State state = stateRepo.findStateById(stateId);
        if (state != null) {
            cachedContainer.putState(state);
            return true;
        }
        else {
            return false;
        }
    }

    public State getStateFromMem(String stateId) {
        return cachedContainer.findState(stateId);
    }

    public void initCounties(State state) {
        state.setCounties(countyRepo.findAllByState(state));
    }
}
