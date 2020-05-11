package com.u1s1.edq.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "COUNTIES")
public class County implements Serializable {

    private String id;
    private State state;

    private String name;

    private Set<GeoPolygon> boundary = new HashSet<GeoPolygon>();
    private List<ElectionData> electionData = new ArrayList<ElectionData>();

    private Set<Precinct> precincts = new HashSet<Precinct>();

    @Id
    @Column(name = "county_id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "state_id")
    @JsonIgnore
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "county_id")
    public Set<GeoPolygon> getBoundary() {
        return boundary;
    }

    public void setBoundary(Set<GeoPolygon> boundary) {
        this.boundary = boundary;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "county_id")
    public List<ElectionData> getElectionData() {
        return electionData;
    }

    public void setElectionData(List<ElectionData> electionData) {
        this.electionData = electionData;
    }

    @Transient
    public Set<Precinct> getPrecincts() {
        return precincts;
    }

    public void setPrecincts(Set<Precinct> precincts) {
        this.precincts = precincts;
    }
}
