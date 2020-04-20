package com.u1s1.edq.temp;

public class CountyGeoTemp {

    private String county;
    private GeometryTemp geometry;

    public CountyGeoTemp() {
    }

    public CountyGeoTemp(String county, GeometryTemp geometry) {
        this.county = county;
        this.geometry = geometry;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public GeometryTemp getGeometry() {
        return geometry;
    }

    public void setGeometry(GeometryTemp geometry) {
        this.geometry = geometry;
    }
}
