package com.u1s1.edq.controller.utils;

public class ResponseObject {


    private String id;
    private Object obj;


    public ResponseObject(String id, Object obj) {
        this.id = id;
        this.obj = obj;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }


    @Override
    public String toString() {
        return "ResponseObject{" +
                "id='" + id + '\'' +
                ", obj=" + obj +
                '}';
    }
}
