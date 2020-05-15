package com.u1s1.edq.controller.utils;

import java.util.ArrayList;
import java.util.List;

public class ResponseList {

    private String id;
    private String name;
    private List<Object> objs;

    public ResponseList(String id, String name) {
        this.id = id;
        this.name = name;
        this.objs = new ArrayList<Object>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Object> getObjs() {
        return objs;
    }

    public void setObjs(List<Object> objs) {
        this.objs = objs;
    }

}
