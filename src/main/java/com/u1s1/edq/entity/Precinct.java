package com.u1s1.edq.entity;

import com.u1s1.edq.enums.PrecinctType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PRECINCTS")
public class Precinct implements Serializable {

    private String canonicalName;

    private String name;
    private PrecinctType type;
    private DemoData demoData;

    private List<Polygon> boundary = new ArrayList<Polygon>();
    private List<ElectionData> electionData = new ArrayList<ElectionData>();
    private List<Precinct> neighbors = new ArrayList<Precinct>();

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    @Column(name = "cname", nullable = false)
    public String getCanonicalName() {
        return canonicalName;
    }

    public void setCanonicalName(String canonicalName) {
        this.canonicalName = canonicalName;
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "precinct_id")
    @Fetch(FetchMode.JOIN)
    public List<Polygon> getBoundary() {
        return boundary;
    }

    public void setBoundary(List<Polygon> boundary) {
        this.boundary = boundary;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "precinct_id")
    public List<ElectionData> getElectionData() {
        return electionData;
    }

    public void setElectionData(List<ElectionData> electionData) {
        this.electionData = electionData;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "precinct_neighbors",
            joinColumns = @JoinColumn(name = "precinct_cname"),
            inverseJoinColumns = @JoinColumn(name = "neighbor_cname"))
    public List<Precinct> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(List<Precinct> neighbors) {
        this.neighbors = neighbors;
    }

}
