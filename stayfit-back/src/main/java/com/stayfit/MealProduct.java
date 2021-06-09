package com.stayfit;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class MealProduct {
    @EmbeddedId
    MealProductKey id = new MealProductKey();

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @MapsId("mealId")
    @JsonIgnore
    @JoinColumn(name = "meal_id")
    Meal meal;

    Double productWeight;

    public MealProduct(MealProductKey id, Product product, Meal meal, Double productWeight) {
        this.id = id;
        this.product = product;
        this.meal = meal;
        this.productWeight = productWeight;
    }

    public MealProduct() {
    }

    public MealProductKey getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public Meal getMeal() {
        return meal;
    }

    public Double getProductWeight() {
        return productWeight;
    }

    public void setId(MealProductKey id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    public void setProductWeight(Double product_weight) {
        this.productWeight = product_weight;
    }
}
