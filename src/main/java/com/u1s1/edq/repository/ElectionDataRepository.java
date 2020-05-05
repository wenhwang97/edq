package com.u1s1.edq.repository;

import com.u1s1.edq.entity.ElectionData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectionDataRepository extends JpaRepository<ElectionData, Integer> {
}
