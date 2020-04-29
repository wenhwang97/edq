package com.u1s1.edq.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "CORRECTION_LOGS")
public class CorrectionLog implements Serializable {

    private Integer id;

    private Precinct precinct;
    private LocalDateTime ModifyTime = LocalDateTime.now();
    private String Loginfo;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "precinct_id")
    public Precinct getPrecinct() {
        return precinct;
    }

    public void setPrecinct(Precinct precinct) {
        this.precinct = precinct;
    }

    @Column(name = "correction_time")
    public LocalDateTime getModifyTime(){return ModifyTime;}

    public void setModifyTime(LocalDateTime time){this.ModifyTime=time;}

    @Column(name = "description")
    public String getLoginfo(){return Loginfo;}

    public void setLoginfo(String loginfo) {
        Loginfo = loginfo;
    }

}
