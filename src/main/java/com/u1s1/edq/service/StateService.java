package com.u1s1.edq.service;


import com.u1s1.edq.service.utils.CachedContainer;
import com.u1s1.edq.entity.State;
import com.u1s1.edq.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StateService {


    private StateRepository stateRepo;
    private CachedContainer cachedContainer;


    @Autowired
    public StateService(StateRepository stateRepo, CachedContainer cachedContainer) {
        this.stateRepo = stateRepo;
        this.cachedContainer = cachedContainer;
    }


    public void fetchState(String stateId) {

        State state = stateRepo.findStateById(stateId);
        if (cachedContainer.putState(state)) {
            // when success...
        }
        else {
            // when failed...
        }

    }

    public State getState(String stateId) {
        return cachedContainer.findState(stateId);
    }
}
