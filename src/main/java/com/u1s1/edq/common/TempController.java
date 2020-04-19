package com.u1s1.edq.common;

import com.u1s1.edq.entity.*;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.service.utils.CachedContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@RestController
public class TempController {

    @Autowired
    CachedContainer container;
    long i;

    public TempController() {
    }


    @PostMapping("/test/add-con")
    public void testingCon(@RequestBody CountyGeoTemp conTemp) {
        State state = new State();
        state.setId("ri");
        state.setName("Rhode Island");
        state.setCounties(new HashSet<County>());

        County county = new County();

        {
            county.setId(state.getId() + "_" + conTemp.getCounty());
            county.setName(conTemp.getCounty());

            DemoData demoData = new DemoData();
            demoData.setId(0);
            demoData.setTotalPop(100);
            demoData.setWhitePop(10);
            demoData.setBlackPop(9);
            demoData.setLatinPop(8);
            demoData.setAsianPop(7);

            county.setDemoData(demoData);
            county.setBoundary(new ArrayList<GeoVertex>());

            i = 0;
            for (double[] pos : conTemp.getGeometry().getCoordinates().get(0)) {
                GeoVertex geo = new GeoVertex();
                geo.setId(i++);
                geo.setX_pos(pos[0]);
                geo.setY_pos(pos[1]);
                county.getBoundary().add(geo);
            }

            ElectionData electionData = new ElectionData();
            electionData.setId(10);
            electionData.setYear(2016);
            electionData.setDemocraticVote(100);
            electionData.setRepublicanVote(125);
            electionData.setLibertarianVote(150);
            electionData.setGreenVote(175);

            county.setPresidentialElectionData(new ArrayList<ElectionData>());
            county.getPresidentialElectionData().add(electionData);
            county.setPrecincts(new HashSet<Precinct>());
        }

        state.getCounties().add(county);

        container.putState(state);
    }

    @PostMapping("/test/add-pre")
    public void testingPre(@RequestBody List<PrecinctGeoTemp> preTemp) {

        State state = container.findState("ri");
        County county = container.findCounty("ri", "ri_Kent");

        for (PrecinctGeoTemp temp : preTemp) {
            Precinct precinct = new Precinct();
            precinct.setId(temp.getProperties().getPrecinct());
            precinct.setName(temp.getProperties().getName());
            precinct.setCanonicalName(temp.getProperties().getCounty() + "_" + temp.getProperties().getName());
            precinct.setType(PrecinctType.NORMAL);

            DemoData demoData = new DemoData();
            demoData.setId(Long.parseLong(temp.getProperties().getPrecinct()));
            demoData.setTotalPop(100);
            demoData.setWhitePop(10);
            demoData.setBlackPop(9);
            demoData.setLatinPop(8);
            demoData.setAsianPop(7);

            precinct.setDemoData(demoData);
            precinct.setBoundary(new ArrayList<GeoVertex>());

            for (double[] pos : temp.getGeometry().getCoordinates().get(0)) {
                GeoVertex geo = new GeoVertex();
                geo.setId(i++);
                geo.setX_pos(pos[0]);
                geo.setY_pos(pos[1]);
                precinct.getBoundary().add(geo);
            }

            ElectionData electionData = new ElectionData();
            electionData.setId(Long.parseLong(temp.getProperties().getPrecinct()));
            electionData.setYear(2016);
            electionData.setDemocraticVote(Integer.parseInt(temp.getProperties().getDem()));
            electionData.setRepublicanVote(Integer.parseInt(temp.getProperties().getRep()));
            electionData.setLibertarianVote(Integer.parseInt(temp.getProperties().getLib()));
            electionData.setGreenVote(Integer.parseInt(temp.getProperties().getGrn()));

            precinct.setPresidentialElectionData(new ArrayList<ElectionData>());
            precinct.getPresidentialElectionData().add(electionData);


            precinct.setState(container.findState("ri"));
            precinct.setCounty(county);

            county.getPrecincts().add(precinct);

        }

        System.out.println("Done");
    }
}
