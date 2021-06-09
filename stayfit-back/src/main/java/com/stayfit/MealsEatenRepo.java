package com.stayfit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealsEatenRepo extends JpaRepository<MealEaten, Long> {

    List<MealEaten> findByOwner(User user);
}
