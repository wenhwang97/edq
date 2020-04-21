package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Table(name = "COUNTY_GEOMETRY")
@Entity
public class CountyGeoVertex implements Serializable {

    private Integer id;

    private CountyPolygon polygon;

    private double x_pos;
    private double y_pos;


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "polygon_id")
    public CountyPolygon getPolygon() {
        return polygon;
    }

    public void setPolygon(CountyPolygon polygon) {
        this.polygon = polygon;
    }

    public double getX_pos() {
        return x_pos;
    }

    public void setX_pos(double x_pos) {
        this.x_pos = x_pos;
    }

    public double getY_pos() {
        return y_pos;
    }

    public void setY_pos(double y_pos) {
        this.y_pos = y_pos;
    }
}
