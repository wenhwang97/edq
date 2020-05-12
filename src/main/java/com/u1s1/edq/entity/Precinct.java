package com.u1s1.edq.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.u1s1.edq.enums.PrecinctType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "PRECINCTS")
public class Precinct implements Serializable {

    private String canonicalName;
    private County county;

    private String name;
    private PrecinctType type;
    private DemoData demoData;

    private Set<GeoPolygon> boundary = new HashSet<GeoPolygon>();
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "county_id")
    @JsonIgnore
    public County getCounty() {
        return county;
    }

    public void setCounty(County county) {
        this.county = county;
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public PrecinctType getType() {
        return type;
    }

    public void setType(PrecinctType type) {
        this.type = type;
    }

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "demo_data")
    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "precinct_id")
    public Set<GeoPolygon> getBoundary() {
        return boundary;
    }

    public void setBoundary(Set<GeoPolygon> boundary) {
        this.boundary = boundary;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "precinct_id")
    public List<ElectionData> getElectionData() {
        return electionData;
    }

    public void setElectionData(List<ElectionData> electionData) {
        this.electionData = electionData;
    }

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "precinct_neighbors",
            joinColumns = @JoinColumn(name = "precinct_cname"),
            inverseJoinColumns = @JoinColumn(name = "neighbor_cname"))
    public List<Precinct> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(List<Precinct> neighbors) {
        this.neighbors = neighbors;
    }

    public Precinct removeFromNeighbor(String precinctCName) {
        Precinct neighbor = null;
        for (int i = 0; i < this.neighbors.size(); i++) {
            neighbor = this.neighbors.get(i);
            if (neighbor.getCanonicalName().equals(precinctCName)) {
                neighbor.getNeighbors().remove(this);
                this.neighbors.remove(neighbor);
                return neighbor;
            }
        }

        return null;
    }

    public GeoPolygon removeFromBoundaries(GeoPolygon poly) {
        Iterator<GeoPolygon> it = this.boundary.iterator();
        while (it.hasNext()) {
            GeoPolygon geoPolygon = it.next();
            if (geoPolygon.getId().equals(poly.getId())) {
                it.remove();
                return geoPolygon;
            }
        }

        return null;
    }

}
