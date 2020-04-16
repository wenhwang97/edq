package com.u1s1.edq.entity;

import java.io.Serializable;

public class District implements Serializable {

    private String id;

    private String name;
    private String state;
    private Geometry boundary;
    private DemoData demoData;
    private ElectionData electionData;

    public District(String id, String name, String state, Geometry boundary, DemoData demoData, ElectionData electionData) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.boundary = boundary;
        this.demoData = demoData;
        this.electionData = electionData;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Geometry getBoundary() {
        return boundary;
    }

    public void setBoundary(Geometry boundary) {
        this.boundary = boundary;
    }

    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    public ElectionData getElectionData() {
        return electionData;
    }

    public void setElectionData(ElectionData electionData) {
        this.electionData = electionData;
    }

    @Override
    public String toString() {
        return "DistrictEntity{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", state='" + state + '\'' +
                ", boundary=" + boundary +
                ", demoData=" + demoData +
                ", electionData=" + electionData +
                '}';
    }
}
