package com.u1s1.edq.temp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.u1s1.edq.entity.*;
import com.u1s1.edq.enums.ElectionType;
import com.u1s1.edq.enums.PrecinctType;
import com.u1s1.edq.repository.CountyRepository;
import com.u1s1.edq.repository.StateRepository;
import com.u1s1.edq.service.cache.CachedContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class TempController {

    @Autowired
    CachedContainer container;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    StateRepository stateRepo;

    @Autowired
    CountyRepository countyRepo;

    int i;

    public TempController() {
    }


    @GetMapping("/test/add")
    public void testingCon() throws IOException {
        CountyGeoTemp[] conTemp = new CountyGeoTemp[2];
        conTemp[0] = mapper.readValue(new File("/Users/administrator/Documents/GitHub/edq/src/main/resources/ri_kent.json"), CountyGeoTemp.class);
        conTemp[1] = mapper.readValue(new File("/Users/administrator/Documents/GitHub/edq/src/main/resources/ri_providence.json"), CountyGeoTemp.class);

        String[] nameList = new String[2];
        nameList[0] = "ri_kent";
        nameList[1] = "ri_providence";

        State state = new State();
        state.setId("ri");
        state.setName("Rhode Island");

        i = 0;
        for (int j = 0; j < conTemp.length - 1; j++) {

            County county = new County();

            {
                county.setId(nameList[j]);
                county.setName(conTemp[j].getCounty());

                DemoData demoData = new DemoData();
                demoData.setId(0);
                demoData.setTotalPop(100);
                demoData.setWhitePop(10);
                demoData.setBlackPop(9);
                demoData.setLatinPop(8);
                demoData.setAsianPop(7);
                county.setDemoData(demoData);

                for (List<double[]> polygon : conTemp[j].getGeometry().getCoordinates()) {
                    CountyPolygon poly = new CountyPolygon();
                    poly.setCounty(county);
                    for (double[] pos : polygon) {
                        CountyGeoVertex geo = new CountyGeoVertex();
                        geo.setId(i++);
                        geo.setPolygon(poly);
                        geo.setX_pos(pos[0]);
                        geo.setY_pos(pos[1]);
                        poly.getVertices().add(geo);
                    }
                    county.getBoundary().add(poly);
                }

                CountyElectionData electionData = new CountyElectionData();
                electionData.setId(10);
                electionData.setCounty(county);
                electionData.setType(ElectionType.PRESIDENTIAL);
                electionData.setYear(2016);
                electionData.setDemocraticVote(100);
                electionData.setRepublicanVote(125);
                electionData.setLibertarianVote(150);
                electionData.setGreenVote(175);

                county.getElectionData().add(electionData);
            }

            state.getCounties().add(county);

            container.putState(state);

            testingPre(nameList[j]);
        }

        System.out.println("Done");
    }

    public void testingPre(String con_name) throws IOException {

        PrecinctGeoTemp[] preTemp = mapper.readValue(new File("/Users/administrator/Documents/GitHub/edq/src/main/resources/" + con_name + "_precincts.json"), PrecinctGeoTemp[].class);

        State state = container.findState("ri");
        County county = container.findCounty("ri", con_name);

        for (PrecinctGeoTemp temp : preTemp) {
            Precinct precinct = new Precinct();
            precinct.setId(temp.getProperties().getPrecinct());
            precinct.setName(temp.getProperties().getName());
            precinct.setCanonicalName(temp.getProperties().getCounty() + "_" + temp.getProperties().getName());
            precinct.setType(PrecinctType.NORMAL);

            DemoData demoData = new DemoData();
            demoData.setId(Integer.parseInt(temp.getProperties().getPrecinct()));
            demoData.setTotalPop(100);
            demoData.setWhitePop(10);
            demoData.setBlackPop(9);
            demoData.setLatinPop(8);
            demoData.setAsianPop(7);

            precinct.setDemoData(demoData);

            for (List<double[]> polygon : temp.getGeometry().getCoordinates()) {
                PrecinctPolygon poly = new PrecinctPolygon();
                poly.setPrecinct(precinct);
                for (double[] pos : polygon) {
                    PrecinctGeoVertex geo = new PrecinctGeoVertex();
                    geo.setId(i++);
                    geo.setPolygon(poly);
                    geo.setX_pos(pos[0]);
                    geo.setY_pos(pos[1]);
                    poly.getVertices().add(geo);
                }
                precinct.getBoundary().add(poly);
            }

            PrecinctElectionData electionData = new PrecinctElectionData();
            electionData.setId(Integer.parseInt(temp.getProperties().getPrecinct()));
            electionData.setPrecinct(precinct);
            electionData.setType(ElectionType.PRESIDENTIAL);
            electionData.setYear(2016);
            electionData.setDemocraticVote(Integer.parseInt(temp.getProperties().getDem()));
            electionData.setRepublicanVote(Integer.parseInt(temp.getProperties().getRep()));
            electionData.setLibertarianVote(Integer.parseInt(temp.getProperties().getLib()));
            electionData.setGreenVote(Integer.parseInt(temp.getProperties().getGrn()));

            precinct.getElectionData().add(electionData);


            precinct.setCounty(county);

            county.getPrecincts().add(precinct);

        }
    }

    @GetMapping("/test/save-county")
    public County testingSaveState() {
        County county = container.findCounty("ri", "ri_kent");

        countyRepo.save(county);

        System.out.println("Save OP done");

        return county;
    }
}
