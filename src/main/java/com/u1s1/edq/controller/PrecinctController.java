package com.u1s1.edq.controller;

import com.u1s1.edq.repository.DistrictRepository;
import com.u1s1.edq.repository.PrecinctRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class PrecinctController {


    private DistrictRepository districtRepo;
    private PrecinctRepository precinctRepo;

    @Autowired
    public PrecinctController(DistrictRepository districtRepo, PrecinctRepository precinctRepo) {
        this.districtRepo = districtRepo;
        this.precinctRepo = precinctRepo;
    }
}
