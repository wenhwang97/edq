package com.u1s1.edq.controller.utils;

public class ResponseObject {

    private String id;
    private String name;
    private Object obj;

    public ResponseObject(String id, String name, Object obj) {
        this.id = id;
        this.obj = obj;
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

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

}
