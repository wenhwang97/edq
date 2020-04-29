package com.u1s1.edq.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "DEMO_DATA")
public class DemoData implements Serializable, Cloneable {

    private Integer id;

    private int totalPop;
    private int whitePop;
    private int blackPop;
    private int hispanicPop;
    private int asianPop;

    @GeneratedValue(strategy = GenerationType.AUTO)
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
    public int getHispanicPop() {
        return hispanicPop;
    }

    public void setHispanicPop(int latinPop) {
        this.hispanicPop = latinPop;
    }

    @Column(name = "asian_population")
    public int getAsianPop() {
        return asianPop;
    }

    public void setAsianPop(int asianPop) {
        this.asianPop = asianPop;
    }

    @Override
    public DemoData clone() throws CloneNotSupportedException {
        DemoData data = new DemoData();
        data.setId(id);
        data.setTotalPop(totalPop);
        data.setWhitePop(whitePop);
        data.setBlackPop(blackPop);
        data.setHispanicPop(hispanicPop);
        data.setAsianPop(asianPop);
        return data;
    }
}
