package com.u1s1.edq.entity;

import javax.persistence.*;

@Table(name = "DEMO_DATA")
@Entity
public class DemoData {

    private Integer id;

    private int totalPop;
    private int whitePop;
    private int blackPop;
    private int latinPop;
    private int asianPop;



    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
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

    @Column(name = "white_population")
    public int getWhitePop() {
        return whitePop;
    }

    public void setWhitePop(int whitePop) {
        this.whitePop = whitePop;
    }

    @Column(name = "black_population")
    public int getBlackPop() {
        return blackPop;
    }

    public void setBlackPop(int blackPop) {
        this.blackPop = blackPop;
    }

    @Column(name = "hispanic_population")
    public int getLatinPop() {
        return latinPop;
    }

    public void setLatinPop(int latinPop) {
        this.latinPop = latinPop;
    }

    @Column(name = "asian_population")
    public int getAsianPop() {
        return asianPop;
    }

    public void setAsianPop(int asianPop) {
        this.asianPop = asianPop;
    }

    @Override
    public String toString() {
        return "DemoDataRepository{" +
                "totalPop=" + totalPop +
                ", whitePop=" + whitePop +
                ", blackPop=" + blackPop +
                ", latinPop=" + latinPop +
                ", asianPop=" + asianPop +
                '}';
    }
}
