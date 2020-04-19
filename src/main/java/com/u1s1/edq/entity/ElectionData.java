package com.u1s1.edq.entity;

import com.u1s1.edq.enums.ElectionType;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "ELECTION_DATA")
@Entity
public class ElectionData implements Serializable {

    private long id;

    private int year;
    private int republicanVote;
    private int democraticVote;
    private int libertarianVote;
    private int greenVote;



    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
    public String toString() {
        return "ElectionData{" +
                "year=" + year +
                ", republicanVote=" + republicanVote +
                ", democraticVote=" + democraticVote +
                ", libertarianVote=" + libertarianVote +
                ", greenVote=" + greenVote +
                '}';
    }
}
