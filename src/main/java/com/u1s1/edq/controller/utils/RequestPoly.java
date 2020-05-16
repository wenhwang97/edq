package com.u1s1.edq.controller.utils;

import com.u1s1.edq.entity.GeoPolygon;

import java.io.Serializable;

public class RequestPoly implements Serializable {

    GeoPolygon polygon;
    String comment;

    public GeoPolygon getPolygon() {
        return polygon;
    }

    public void setPolygon(GeoPolygon polygon) {
        this.polygon = polygon;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
