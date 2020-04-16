package com.u1s1.edq.entity;

import java.io.Serializable;
import java.util.List;

public class Geometry implements Serializable {

    private List<double[]> coordinates;

    public Geometry(List<double[]> coordinates) {
        this.coordinates = coordinates;
    }


    public List<double[]> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<double[]> coordinates) {
        this.coordinates = coordinates;
    }

    @Override
    public String toString() {
        return "Geometry{" +
                "coordinates=" + coordinates +
                '}';
    }
}
