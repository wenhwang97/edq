package com.u1s1.edq.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "DEMO_DATA")
public class DemoData implements Serializable, Cloneable {

    private Integer id;

    private int totalPop;
    private int whitePop;
    private int blackPop;
    private int nativePop;
    private int asianPop;
    private int otherPop;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @JsonIgnore
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "total_population")
    public int getTotalPop() {
        return totalPop;
    }

    public void setTotalPop(int totalPop) {
        this.totalPop = totalPop;
    }

    @Column(name = "white")
    public int getWhitePop() {
        return whitePop;
    }

    public void setWhitePop(int whitePop) {
        this.whitePop = whitePop;
    }

    @Column(name = "black_or_af_american")
    public int getBlackPop() {
        return blackPop;
    }

    public void setBlackPop(int blackPop) {
        this.blackPop = blackPop;
    }

    @Column(name = "native")
    public int getNativePop() {
        return nativePop;
    }

    public void setNativePop(int nativePop) {
        this.nativePop = nativePop;
    }

    @Column(name = "asian")
    public int getAsianPop() {
        return asianPop;
    }

    public void setAsianPop(int asianPop) {
        this.asianPop = asianPop;
    }

    @Column(name = "other")
    public int getOtherPop() {
        return otherPop;
    }

    public void setOtherPop(int otherPop) {
        this.otherPop = otherPop;
    }
}
