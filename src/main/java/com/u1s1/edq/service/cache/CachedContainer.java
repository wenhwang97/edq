package com.u1s1.edq.service.cache;

import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.Precinct;
import com.u1s1.edq.entity.State;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
public class CachedContainer {


    private Map<String, State> stateContainer;


    public CachedContainer() {
        stateContainer = new HashMap<String, State>();
    }


    public boolean putState(State state) {
        if (stateContainer.get(state.getId()) == null) {
            stateContainer.put(state.getId(), state);

            System.out.println("[Cached Container] Adding state successfully.");
            return true;
        }

        System.err.println("[Cached Container] Adding state failed. \"" + state.getName() + "\" already exists.");
        return false;
    }

    public State findState(String id) {
        return stateContainer.get(id);
    }

    public County findCounty(String stateId, String countyId) {
        State state = findState(stateId);
        if (state == null) return null;

        Set<County> counties = state.getCounties();
        if (counties.size() == 0) return null;

        for (County county : counties) {
            if (county.getId().equals(countyId)) {
                return county;
            }
        }

        return null;
    }

    public Precinct findPrecinct(String stateId, String countyId, String precinctCName) {
        County county = findCounty(stateId, countyId);
        if (county == null) return null;

        Set<Precinct> precincts = county.getPrecincts();
        if (precincts.size() == 0) return null;

        for (Precinct precinct : precincts) {
            if (precinct.getCanonicalName().equals(precinctCName)) {
                return precinct;
            }
        }

        return null;
    }

    public boolean hasState(String id) {
        if (stateContainer.get(id) != null) {
            return true;
        }

        return false;
    }

}
