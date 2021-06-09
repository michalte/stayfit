package com.stayfit;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "eaten_meals")
public class MealEaten {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long mealEatenId;

    @Column(name = "data_utworzenia")
    Date date;

    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name= "id")
    User owner;

    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name = "meal")
    Meal meal;

    @Column(name = "active")
    Boolean active;

    public MealEaten(Long mealEatenId, Date date, User owner, Meal meal, Boolean active) {
        this.mealEatenId = mealEatenId;
        this.date = date;
        this.owner = owner;
        this.meal = meal;
        this.active = active;
    }

    public MealEaten() {
    }

    public Long getMealEatenId() {
        return mealEatenId;
    }

    public void setMealEatenId(Long mealEatenId) {
        this.mealEatenId = mealEatenId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
