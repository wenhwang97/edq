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

    private LocalDateTime ModifyTime = LocalDateTime.now();

    private String precinctCName;

    private OperationType type;
    private GeoPolygon oldPolygon;
    private GeoPolygon newPolygon;
    private String description;
    private String comment;

    @GeneratedValue(strategy = GenerationType.AUTO)
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
    @JoinColumn(name = "old_polygon_id")
    public GeoPolygon getOldPolygon() {
        return oldPolygon;
    }

    public void setOldPolygon(GeoPolygon oldPolygon) {
        this.oldPolygon = oldPolygon;
    }

    @OneToOne
    @JoinColumn(name = "new_polygon_id")
    public GeoPolygon getNewPolygon() {
        return newPolygon;
    }

    public void setNewPolygon(GeoPolygon newPolygon) {
        this.newPolygon = newPolygon;
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
