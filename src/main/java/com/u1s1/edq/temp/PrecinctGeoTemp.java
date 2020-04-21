package com.u1s1.edq.temp;

import java.io.Serializable;

public class PrecinctGeoTemp implements Serializable {

    private PropertiesTemp properties;
    private GeometryTemp geometry;

    public PrecinctGeoTemp() {
    }

    public PrecinctGeoTemp(PropertiesTemp properties, GeometryTemp geometry) {
        this.properties = properties;
        this.geometry = geometry;
    }

    public PropertiesTemp getProperties() {
        return properties;
    }

    public void setProperties(PropertiesTemp properties) {
        this.properties = properties;
    }

    public GeometryTemp getGeometry() {
        return geometry;
    }

    public void setGeometry(GeometryTemp geometry) {
        this.geometry = geometry;
    }
}
