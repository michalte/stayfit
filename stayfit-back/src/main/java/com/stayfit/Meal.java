package com.stayfit;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long mealId;

    @Column(name = "nazwa")
    String name;

    @Column(name = "data_utworzenia")
    Date date;

    @ManyToOne
    @JoinColumn(name="id")
    User owner;

    @Column(name = "active")
    Boolean active;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    List<MealProduct> productList;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    List<MealEaten> listOfMealsEatenIncludingThisMeal;

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Meal(Long mealId, String name, Date date, User owner, Boolean active, List<MealProduct> productList) {
        this.mealId = mealId;
        this.name = name;
        this.date = date;
        this.owner = owner;
        this.active = active;
        this.productList = productList;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public String getName() {
        return name;
    }

    public Date getDate() {
        return date;
    }

    public List<MealProduct> getProductList() {
        return productList;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setProductList(List<MealProduct> productList) {
        this.productList = productList;
    }

    public Meal() {
    }
}
