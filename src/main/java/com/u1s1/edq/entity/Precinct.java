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

    private PrecinctType type;

    private DemoData demoData;

    private List<PrecinctPolygon> boundary = new ArrayList<PrecinctPolygon>();
    private List<PrecinctElectionData> electionData = new ArrayList<PrecinctElectionData>();

//    private Set<Precinct> neighborWith = new HashSet<Precinct>();
//    private Set<Precinct> neighborBy = new HashSet<Precinct>();


    @Id
    @Column(name = "precinct_id")
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

    @Column
    public String getCanonicalName() {
        return canonicalName;
    }

    public void setCanonicalName(String canonicalName) {
        this.canonicalName = canonicalName;
    }

    @ManyToOne
    @JoinColumn(name = "county")
    public County getCounty() {
        return county;
    }

    public void setCounty(County county) {
        this.county = county;
    }

    @Column
    public PrecinctType getType() {
        return type;
    }

    public void setType(PrecinctType type) {
        this.type = type;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "demo_data")
    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "precinct")
    public List<PrecinctPolygon> getBoundary() {
        return boundary;
    }

    public void setBoundary(List<PrecinctPolygon> boundary) {
        this.boundary = boundary;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "precinct")
    public List<PrecinctElectionData> getElectionData() {
        return electionData;
    }

    public void setElectionData(List<PrecinctElectionData> electionData) {
        this.electionData = electionData;
    }

//    @ManyToMany(mappedBy = "neighborBy", cascade = CascadeType.ALL)
//    @JoinTable(name = "NeighborRel",
//            joinColumns = @JoinColumn(name = "selfId"),
//            inverseJoinColumns = @JoinColumn(name = "neighborId"))
//    public Set<Precinct> getNeighborWith() {
//        return neighborWith;
//    }
//
//    public void setNeighborWith(Set<Precinct> neighborWith) {
//        this.neighborWith = neighborWith;
//    }
//
//    @ManyToMany(mappedBy = "neighborWith",cascade = CascadeType.ALL)
//    @JoinTable(name = "NeighborRel",
//            joinColumns = @JoinColumn(name = "neighborId"),
//            inverseJoinColumns = @JoinColumn(name = "selfId"))
//    public Set<Precinct> getNeighborBy() {
//        return neighborBy;
//    }
//
//    public void setNeighborBy(Set<Precinct> neighborBy) {
//        this.neighborBy = neighborBy;
//    }
}
