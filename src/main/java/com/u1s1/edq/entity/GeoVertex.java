package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Table(name = "GEOMETRY")
@Entity
public class GeoVertex implements Serializable {

    private long id;

    private double x_pos;
    private double y_pos;



    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long getId() {
        return id;
    }

    public void setId(long id) {
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
}
