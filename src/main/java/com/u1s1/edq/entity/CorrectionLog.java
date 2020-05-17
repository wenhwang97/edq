package com.u1s1.edq.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.u1s1.edq.enums.OperationType;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "CORRECTION_LOGS")
public class CorrectionLog implements Serializable {

    private Integer id;

    private LocalDateTime ModifyTime;

    private State state;
    private String precinctCName;

    private OperationType type;
    private GeoPolygon poly_1;
    private GeoPolygon poly_2;
    private String description;
    private String comment;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "correction_time")
    public LocalDateTime getModifyTime() {
        return ModifyTime;
    }

    public void setModifyTime(LocalDateTime modifyTime) {
        ModifyTime = modifyTime;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "state_id")
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getPrecinctCName() {
        return precinctCName;
    }

    public void setPrecinctCName(String precinctCName) {
        this.precinctCName = precinctCName;
    }

    @Enumerated(EnumType.STRING)
    public OperationType getType() {
        return type;
    }

    public void setType(OperationType type) {
        this.type = type;
    }

    @OneToOne
    @JoinColumn(name = "polygon1_id")
    public GeoPolygon getPoly_1() {
        return poly_1;
    }

    public void setPoly_1(GeoPolygon poly_1) {
        this.poly_1 = poly_1;
    }

    @OneToOne
    @JoinColumn(name = "polygon2_id")
    public GeoPolygon getPoly_2() {
        return poly_2;
    }

    public void setPoly_2(GeoPolygon poly_2) {
        this.poly_2 = poly_2;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
