package com.u1s1.edq.entity;

import java.io.Serializable;

public class ElectionData implements Serializable {

    private int year;
    private int republicanVote;
    private int democraticVote;
    private int libertarianVote;
    private int greenVote;

    public ElectionData(int year, int republicanVote, int democraticVote, int libertarianVote, int greenVote) {
        this.year = year;
        this.republicanVote = republicanVote;
        this.democraticVote = democraticVote;
        this.libertarianVote = libertarianVote;
        this.greenVote = greenVote;
    }


    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getRepublicanVote() {
        return republicanVote;
    }

    public void setRepublicanVote(int republicanVote) {
        this.republicanVote = republicanVote;
    }

    public int getDemocraticVote() {
        return democraticVote;
    }

    public void setDemocraticVote(int democraticVote) {
        this.democraticVote = democraticVote;
    }

    public int getLibertarianVote() {
        return libertarianVote;
    }

    public void setLibertarianVote(int libertarianVote) {
        this.libertarianVote = libertarianVote;
    }

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
