package com.u1s1.edq.repository;

import com.u1s1.edq.entity.Precinct;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public class PrecinctRepository {


    public Collection<Precinct> getPrecincts(List<String> districts) {

        return null;
    }



    public void updatePrecinctData(Precinct precinct) {

    }



    public void mergePrecincts(Precinct merger, List<Precinct> mergee) {

    }
}
