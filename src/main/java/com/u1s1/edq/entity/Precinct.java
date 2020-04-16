package com.u1s1.edq.entity;

import com.u1s1.edq.enums.PrecinctType;

import java.io.Serializable;
import java.util.Collection;

public class Precinct implements Serializable {

    private String id;

    private String name;
    private String district;
    private String state;

    private PrecinctType type;

    private Geometry boundary;
    private ElectionData electionData;
    private DemoData demoData;

    private Collection<Precinct> neighbors;
}
