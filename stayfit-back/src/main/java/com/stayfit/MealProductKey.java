package com.stayfit;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MealProductKey implements Serializable {

    @Column(name = "product_id")
    Long productId;

    @Column(name = "meal_id")
    Long mealId;

    public MealProductKey(Long productId, Long mealId) {
        this.productId = productId;
        this.mealId = mealId;
    }

    public MealProductKey() {
    }

    public Long getProductId() {
        return productId;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MealProductKey that = (MealProductKey) o;
        return Objects.equals(productId, that.productId) && Objects.equals(mealId, that.mealId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, mealId);
    }
}
