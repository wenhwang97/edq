package com.u1s1.edq.service;

import com.u1s1.edq.repository.GeoPolygonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GeoPolygonService {

    private GeoPolygonRepository polygonRepo;

    @Autowired
    public GeoPolygonService(GeoPolygonRepository polygonRepo) {
        this.polygonRepo = polygonRepo;
    }

    @Transactional
    public void removePolygon(Integer polygonId) {
        polygonRepo.deleteById(polygonId);
    }
}
