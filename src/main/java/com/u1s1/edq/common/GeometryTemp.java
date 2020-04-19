package com.u1s1.edq.common;

import java.util.List;

public class GeometryTemp {

    private String type;
    private List<List<double[]>> coordinates;

    public GeometryTemp() {
    }

    public GeometryTemp(String type, List<List<double[]>> coordinates
    ) {
        this.type = type;
        this.coordinates = coordinates;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<List<double[]>> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<List<double[]>> coordinates) {
        this.coordinates = coordinates;
    }
}
