package com.u1s1.edq.repository;

import com.u1s1.edq.entity.County;
import com.u1s1.edq.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CountyRepository extends JpaRepository<County, String> {

    @Query("select c from County c join fetch c.boundary b join fetch b.vertices v where c.state = ?1")
    Set<County> findAllByState(State state);

}
