package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Table(name = "COUNTY")
@Entity
public class County implements Serializable {

    private String id;

    private State state;
    private DemoData demoData;

    private List<GeoVertex> boundary;
    private List<ElectionData> presidentialElectionData;
    private List<ElectionData> congressionalElectionData;

    private Set<Precinct> precincts;


    @Id
    @Column(name = "county_id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(nullable = false)
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    @OneToOne
    @JoinColumn(nullable = false)
    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    @OneToMany
    @JoinColumn(nullable = false)
    public List<GeoVertex> getBoundary() {
        return boundary;
    }

    public void setBoundary(List<GeoVertex> boundary) {
        this.boundary = boundary;
    }

    @OneToMany
    @JoinColumn(nullable = false)
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
