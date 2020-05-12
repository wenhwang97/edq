package com.u1s1.edq.controller.utils;

import java.util.ArrayList;
import java.util.List;

public class ResponseList {

    private String id;
    private List<Object> objs;

    public ResponseList(String id) {
        this.id = id;
        this.objs = new ArrayList<Object>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Object> getObjs() {
        return objs;
    }

    public void setObjs(List<Object> objs) {
        this.objs = objs;
    }

    @Override
    public String toString() {
        return "ResponseList{" +
                "id='" + id + '\'' +
                ", objs=" + objs +
                '}';
    }
}
