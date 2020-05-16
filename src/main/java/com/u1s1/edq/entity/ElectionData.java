package com.u1s1.edq.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.u1s1.edq.enums.ElectionType;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ELECTION_DATA")
public class ElectionData implements Serializable, Cloneable {

    private Integer id;
    private ElectionType type;
    private Integer distNum;

    private int year;
    private int republicanVote;
    private int democraticVote;
    private int libertarianVote;
    private int greenVote;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @JsonIgnore
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Enumerated(EnumType.STRING)
    public ElectionType getType() {
        return type;
    }

    public void setType(ElectionType type) {
        this.type = type;
    }

    @Column(name = "dist_num", nullable = true)
    public int getDistNum() {
        return distNum;
    }

    public void setDistNum(int distNum) {
        this.distNum = distNum;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @Column(name = "republican_vote")
    public int getRepublicanVote() {
        return republicanVote;
    }

    public void setRepublicanVote(int republicanVote) {
        this.republicanVote = republicanVote;
    }

    @Column(name = "democratic_vote")
    public int getDemocraticVote() {
        return democraticVote;
    }

    public void setDemocraticVote(int democraticVote) {
        this.democraticVote = democraticVote;
    }

    @Column(name = "libertarian_vote")
    public int getLibertarianVote() {
        return libertarianVote;
    }

    public void setLibertarianVote(int libertarianVote) {
        this.libertarianVote = libertarianVote;
    }

    @Column(name = "green_vote")
    public int getGreenVote() {
        return greenVote;
    }

    public void setGreenVote(int greenVote) {
        this.greenVote = greenVote;
    }

    @Override
    public ElectionData clone() throws CloneNotSupportedException {
        ElectionData data = new ElectionData();
        data.setType(type);
        data.setDistNum(new Integer(distNum.intValue()));
        data.setYear(year);
        data.setRepublicanVote(republicanVote);
        data.setDemocraticVote(democraticVote);
        data.setLibertarianVote(libertarianVote);
        data.setGreenVote(greenVote);
        return data;
    }
}
