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


    public int getTotalPop() {
        return totalPop;
    }

    public void setTotalPop(int totalPop) {
        this.totalPop = totalPop;
    }

    public int getWhitePop() {
        return whitePop;
    }

    public void setWhitePop(int whitePop) {
        this.whitePop = whitePop;
    }

    public int getBlackPop() {
        return blackPop;
    }

    public void setBlackPop(int blackPop) {
        this.blackPop = blackPop;
    }

    public int getLatinPop() {
        return latinPop;
    }

    public void setLatinPop(int latinPop) {
        this.latinPop = latinPop;
    }

    public int getAsianPop() {
        return asianPop;
    }

    public void setAsianPop(int asianPop) {
        this.asianPop = asianPop;
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
