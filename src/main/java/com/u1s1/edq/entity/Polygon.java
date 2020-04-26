package com.u1s1.edq.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Table(name = "POLYGON")
@Entity
public class Polygon implements Serializable {

    private Integer id;

    private List<GeoVertex> vertices = new ArrayList<GeoVertex>();


    @GeneratedValue(strategy = GenerationType.AUTO)
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
}
