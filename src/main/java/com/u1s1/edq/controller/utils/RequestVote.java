package com.u1s1.edq.controller.utils;

import com.u1s1.edq.entity.ElectionData;

import java.io.Serializable;

public class RequestVote implements Serializable {

    ElectionData data;
    String comment;

    public ElectionData getData() {
        return data;
    }

    public void setData(ElectionData data) {
        this.data = data;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
