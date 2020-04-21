package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "COUNTY")
@Entity
public class County implements Serializable {

    private String id;

    private String name;
    private State state;
    private DemoData demoData;

    private List<Polygon> boundary = new ArrayList<Polygon>();
    private List<ElectionData> presidentialElectionData = new ArrayList<ElectionData>();
    private List<ElectionData> congressionalElectionData = new ArrayList<ElectionData>();

    private Set<Precinct> precincts = new HashSet<Precinct>();


    @Id
    @Column(name = "county_id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne
    @JoinColumn(name = "state_id")
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    @OneToOne
    @JoinColumn
    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    @OneToMany
    @JoinColumn
    public List<Polygon> getBoundary() {
        return boundary;
    }

    public void setBoundary(List<Polygon> boundary) {
        this.boundary = boundary;
    }

    @OneToMany
    @JoinColumn
    public List<ElectionData> getPresidentialElectionData() {
        return presidentialElectionData;
    }

    public void setPresidentialElectionData(List<ElectionData> presidentialElectionData) {
        this.presidentialElectionData = presidentialElectionData;
    }

    @OneToMany
    @JoinColumn
    public List<ElectionData> getCongressionalElectionData() {
        return congressionalElectionData;
    }

    public void setCongressionalElectionData(List<ElectionData> congressionalElectionData) {
        this.congressionalElectionData = congressionalElectionData;
    }


    @OneToMany
    @JoinColumn
    public Set<Precinct> getPrecincts() {
        return precincts;
    }

    public void setPrecincts(Set<Precinct> precincts) {
        this.precincts = precincts;
    }
}
