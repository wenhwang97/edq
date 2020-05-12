package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "STATES")
public class State implements Serializable {

    private String id;

    private String name;

    private Set<County> counties = new HashSet<County>();
    private Set<NationalPark> parks = new HashSet<NationalPark>();
    private Set<Error> errors = new HashSet<Error>();
    // later districts...

    @Id
    @Column(name = "state_id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Transient
    public Set<County> getCounties() {
        return counties;
    }

    public void setCounties(Set<County> counties) {
        this.counties = counties;
    }

    @Transient
    public Set<NationalPark> getParks() {
        return parks;
    }

    public void setParks(Set<NationalPark> parks) {
        this.parks = parks;
    }

    @Transient
    public Set<Error> getErrors() {
        return errors;
    }

    public void setErrors(Set<Error> errors) {
        this.errors = errors;
    }
}
