package com.u1s1.edq.entity;

import java.io.Serializable;

public class State implements Serializable {

    private String id;

    private String name;
    private DemoData demoData;

    public State(String id, String name, DemoData demoData) {
        this.id = id;
        this.name = name;
        this.demoData = demoData;
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

    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    @Override
    public String toString() {
        return "StateEntity{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", demoData=" + demoData +
                '}';
    }
}
