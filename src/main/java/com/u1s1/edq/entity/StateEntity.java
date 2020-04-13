package com.u1s1.edq.entity;

import java.io.Serializable;

public class StateEntity implements Serializable {

    private String id;
    private String name;
    private DemoData demoData;

    public StateEntity(String id, String name, DemoData demoData) {
        this.id = id;
        this.name = name;
        this.demoData = demoData;
    }

    // Setter methods later implementing...
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public DemoData getDemoData() {
        return demoData;
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
