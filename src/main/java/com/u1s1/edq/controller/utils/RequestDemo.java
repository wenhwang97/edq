package com.u1s1.edq.controller.utils;

import com.u1s1.edq.entity.DemoData;

import java.io.Serializable;

public class RequestDemo implements Serializable {

    DemoData demoData;
    String comment;

    public DemoData getDemoData() {
        return demoData;
    }

    public void setDemoData(DemoData demoData) {
        this.demoData = demoData;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
