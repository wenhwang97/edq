package com.u1s1.edq.temp;

public class PropertiesTemp {

    private String precinct;
    private String county;
    private String name;
    private String dem;
    private String rep;
    private String lib;
    private String grn;

    public PropertiesTemp() {
    }

    public PropertiesTemp(String precinct, String county, String name, String dem, String rep, String lib, String grn) {
        this.precinct = precinct;
        this.county = county;
        this.name = name;
        this.dem = dem;
        this.rep = rep;
        this.lib = lib;
        this.grn = grn;
    }

    public String getPrecinct() {
        return precinct;
    }

    public void setPrecinct(String precinct) {
        this.precinct = precinct;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDem() {
        return dem;
    }

    public void setDem(String dem) {
        this.dem = dem;
    }

    public String getRep() {
        return rep;
    }

    public void setRep(String rep) {
        this.rep = rep;
    }

    public String getLib() {
        return lib;
    }

    public void setLib(String lib) {
        this.lib = lib;
    }

    public String getGrn() {
        return grn;
    }

    public void setGrn(String grn) {
        this.grn = grn;
    }
}
