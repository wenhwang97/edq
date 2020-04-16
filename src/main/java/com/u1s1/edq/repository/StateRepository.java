package com.u1s1.edq.repository;

import com.u1s1.edq.entity.DemoData;
import com.u1s1.edq.entity.State;
import org.springframework.stereotype.Repository;

@Repository
public class StateRepository {


    public State getState(String stateId) {


        return new State("CA", "California", new DemoData(1000, 80, 60, 40, 20));
    }
}
