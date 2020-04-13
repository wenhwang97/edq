package com.u1s1.edq.entity;

public class DemoData {

    private int totalPop;
    private int whitePop;
    private int blackPop;
    private int latinPop;
    private int asianPop;

    public DemoData(int totalPop, int whitePop, int blackPop, int latinPop, int asianPop) {
        this.totalPop = totalPop;
        this.whitePop = whitePop;
        this.blackPop = blackPop;
        this.latinPop = latinPop;
        this.asianPop = asianPop;
    }

    // Setter methods later implementing...
    public int getTotalPop() {
        return totalPop;
    }

    public int getWhitePop() {
        return whitePop;
    }

    public int getBlackPop() {
        return blackPop;
    }

    public int getLatinPop() {
        return latinPop;
    }

    public int getAsianPop() {
        return asianPop;
    }

    @Override
    public String toString() {
        return "DemoData{" +
                "totalPop=" + totalPop +
                ", whitePop=" + whitePop +
                ", blackPop=" + blackPop +
                ", latinPop=" + latinPop +
                ", asianPop=" + asianPop +
                '}';
    }
}
