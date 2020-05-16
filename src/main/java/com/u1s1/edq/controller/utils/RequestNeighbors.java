package com.u1s1.edq.controller.utils;

import java.io.Serializable;
import java.util.Set;

public class RequestNeighbors implements Serializable {

    Set<String> neighbors;
    String comment;

    public Set<String> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(Set<String> neighbors) {
        this.neighbors = neighbors;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
