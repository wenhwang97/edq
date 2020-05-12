package com.u1s1.edq.repository;

import com.u1s1.edq.entity.Error;
import com.u1s1.edq.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface ErrorRepository extends JpaRepository<Error, Integer> {

    @Query("select e from Error e where e.state = ?1")
    Set<Error> findAllByState(State state);
}
