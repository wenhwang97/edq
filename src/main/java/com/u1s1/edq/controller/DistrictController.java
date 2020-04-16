package com.u1s1.edq.controller;

import com.u1s1.edq.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping(value = "/state/{stateId}/districts")
public class DistrictController {


    private DistrictRepository districtRepo;

    @Autowired
    public DistrictController(DistrictRepository districtRepo) {
        this.districtRepo = districtRepo;
    }

    //@GetMapping(value = "")
    //public Collection<District> showDistricts(@PathVariable String stateId)


    //@PostMapping(value = "/{districtId}/data/edit-vote")
    //public void editDistrictVoteData(District district, String comment)


    //@PostMapping(value = "/{districtId}/data/edit-demo")
    //public void editDistrictDemoData(District district, String comment)
}
