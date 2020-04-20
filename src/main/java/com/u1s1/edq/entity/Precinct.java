package com.u1s1.edq.entity;

import com.u1s1.edq.enums.PrecinctType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "PRECINCT")
@Entity
public class Precinct implements Serializable {

    private String id;

    private String name;
    private String canonicalName;
    private County county;
    private State state;

    private PrecinctType type;

    private DemoData demoData;

    private List<GeoVertex> boundary = new ArrayList<GeoVertex>();
    private List<ElectionData> presidentialElectionData = new ArrayList<ElectionData>();
    private List<ElectionData> congressionalElectionData = new ArrayList<ElectionData>();

    private Set<Precinct> neighbors = new HashSet<Precinct>();


    @Id
    @Column(name = "precinct_id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(nullable = false)
    public String getCanonicalName() {
        return canonicalName;
    }

    public void setCanonicalName(String canonicalName) {
        this.canonicalName = canonicalName;
    }

    @ManyToOne
    @JoinColumn(nullable = false)
    public County getCounty() {
        return county;
    }

    public void setCounty(County county) {
        this.county = county;
    }

    @ManyToOne
    @JoinColumn(nullable = false)
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    @Column(nullable = false)
    public PrecinctType getType() {
        return type;
    }

    public void setType(PrecinctType type) {
        this.type = type;
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
    public Set<Precinct> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(Set<Precinct> neighbors) {
        this.neighbors = neighbors;
    }
}
