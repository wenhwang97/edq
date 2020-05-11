package com.u1s1.edq.repository;

import com.u1s1.edq.entity.NationalPark;
import com.u1s1.edq.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface NationalParkRepository extends JpaRepository<NationalPark, Integer> {

    @Query("select p from NationalPark p join fetch p.boundary b join fetch b.vertices v where p.state = ?1")
    Set<NationalPark> findAllByState(State state);
}
