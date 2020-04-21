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

    private List<CountyPolygon> boundary = new ArrayList<CountyPolygon>();
    private List<CountyElectionData> electionData = new ArrayList<CountyElectionData>();

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "demo_data")
    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "county")
    public List<CountyPolygon> getBoundary() {
        return boundary;
    }

    public void setBoundary(List<CountyPolygon> boundary) {
        this.boundary = boundary;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "county")
    public List<CountyElectionData> getElectionData() {
        return electionData;
    }

    public void setElectionData(List<CountyElectionData> electionData) {
        this.electionData = electionData;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "county")
    public Set<Precinct> getPrecincts() {
        return precincts;
    }

    public void setPrecincts(Set<Precinct> precincts) {
        this.precincts = precincts;
    }
}
