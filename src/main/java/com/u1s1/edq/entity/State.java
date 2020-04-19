package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Table(name = "STATE")
@Entity
public class State implements Serializable {

    private String id;

    private String name;
    private DemoData demoData;

    private Set<County> counties = new HashSet<County>();
    // later districts...
    // later geographics...



    @Id
    @Column(name = "state_id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToOne
    @JoinColumn(nullable = false)
    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    @OneToMany
    @JoinColumn(nullable = false)
    public Set<County> getCounties() {
        return counties;
    }

    public void setCounties(Set<County> counties) {
        this.counties = counties;
    }


    @Override
    public String toString() {
        return "State{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", demoData=" + demoData +
                ", counties=" + counties +
                '}';
    }
}
