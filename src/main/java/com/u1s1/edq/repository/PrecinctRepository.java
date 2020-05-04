package com.u1s1.edq.repository;

import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.Precinct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface PrecinctRepository extends JpaRepository<Precinct, String> {

    @Query("select p from Precinct p join fetch p.boundary b join fetch b.vertices v where p.county = ?1")
    Set<Precinct> findAllByCounty(County county);


}
