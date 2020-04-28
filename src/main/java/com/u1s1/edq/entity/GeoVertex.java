package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "GEO_VERTEX")
@Entity
public class GeoVertex implements Serializable, Cloneable {

    private Integer id;

    private double x_pos;
    private double y_pos;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    @Override
    public GeoVertex clone() throws CloneNotSupportedException {
        GeoVertex vertex = new GeoVertex();
        vertex.setId(id);
        vertex.setX_pos(x_pos);
        vertex.setY_pos(y_pos);
        return vertex;
    }
}
