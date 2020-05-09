package com.u1s1.edq.entity;


import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "POLYGONS")
public class Polygon implements Serializable, Cloneable {

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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "polygon_id")
    public List<GeoVertex> getVertices() {
        return vertices;
    }

    public void setVertices(List<GeoVertex> vertices) {
        this.vertices = vertices;
    }

    @Override
    public Polygon clone() throws CloneNotSupportedException {
        Polygon polygon = new Polygon();
        polygon.setId(id);
        for (GeoVertex vertex : vertices) {
            polygon.getVertices().add(vertex.clone());
        }
        return polygon;
    }
}
