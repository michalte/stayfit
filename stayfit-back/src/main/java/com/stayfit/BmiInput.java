package com.stayfit;

public class BmiInput {
    Long userId;
    Double userBmi;

    public BmiInput(Long userId, Double userBmi) {
        this.userId = userId;
        this.userBmi = userBmi;
    }

    public BmiInput() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getUserBmi() {
        return userBmi;
    }

    public void setUserBmi(Double userBmi) {
        this.userBmi = userBmi;
    }
}
