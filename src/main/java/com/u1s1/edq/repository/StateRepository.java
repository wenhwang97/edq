package com.u1s1.edq.repository;

import com.u1s1.edq.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepository extends JpaRepository<State, String> {

    State findStateById(String stateId);
}
