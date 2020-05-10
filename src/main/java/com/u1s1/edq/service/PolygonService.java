package com.u1s1.edq.service;

import com.u1s1.edq.repository.PolygonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PolygonService {

    private PolygonRepository polygonRepo;

    @Autowired
    public PolygonService(PolygonRepository polygonRepo) {
        this.polygonRepo = polygonRepo;
    }

    @Transactional
    public void removePolygon(Integer polygonId) {
        polygonRepo.deleteById(polygonId);
    }
}
