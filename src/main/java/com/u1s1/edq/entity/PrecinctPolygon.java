package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Table(name = "PRECINCT_POLYGON")
@Entity
public class PrecinctPolygon implements Serializable {

    private Integer id;

    private Precinct precinct;

    private List<PrecinctGeoVertex> vertices = new ArrayList<PrecinctGeoVertex>();


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "precinct_id")
    public Precinct getPrecinct() {
        return precinct;
    }

    public void setPrecinct(Precinct precinct) {
        this.precinct = precinct;
    }

    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.REMOVE}, mappedBy = "polygon")
    public List<PrecinctGeoVertex> getVertices() {
        return vertices;
    }

    public void setVertices(List<PrecinctGeoVertex> vertices) {
        this.vertices = vertices;
    }
}
