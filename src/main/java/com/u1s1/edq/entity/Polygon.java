package com.u1s1.edq.entity;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "POLYGON")
@Entity
public class Polygon {

    private Integer id;

    private List<GeoVertex> vertices = new ArrayList<GeoVertex>();


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @OneToMany
    @JoinColumn
    public List<GeoVertex> getVertices() {
        return vertices;
    }

    public void setVertices(List<GeoVertex> vertices) {
        this.vertices = vertices;
    }
}
