package com.u1s1.edq.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.u1s1.edq.enums.ErrorType;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="ERRORS")
public class Error implements Serializable {

    private Integer id;
    private State state;

    private ErrorType type;
    private String info;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "state_id")
    @JsonIgnore
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    @Enumerated(EnumType.STRING)
    public ErrorType getType() {
        return type;
    }

    public void setType(ErrorType type) {
        this.type = type;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
