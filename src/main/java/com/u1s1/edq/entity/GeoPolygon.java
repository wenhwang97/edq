package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "POLYGONS")
public class GeoPolygon implements Serializable, Cloneable {

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
    public GeoPolygon clone() throws CloneNotSupportedException {
        GeoPolygon geoPolygon = new GeoPolygon();
        for (GeoVertex vertex : vertices) {
            geoPolygon.getVertices().add(vertex.clone());
        }
        return geoPolygon;
    }
}
