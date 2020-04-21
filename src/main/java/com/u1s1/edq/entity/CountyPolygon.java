package com.u1s1.edq.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Table(name = "COUNTY_POLYGON")
@Entity
public class CountyPolygon implements Serializable {

    private Integer id;

    private County county;

    private List<CountyGeoVertex> vertices = new ArrayList<CountyGeoVertex>();


    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "county_id")
    public County getCounty() {
        return county;
    }

    public void setCounty(County county) {
        this.county = county;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "polygon")
    public List<CountyGeoVertex> getVertices() {
        return vertices;
    }

    public void setVertices(List<CountyGeoVertex> vertices) {
        this.vertices = vertices;
    }
}
