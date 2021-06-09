package com.stayfit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MealsRepo extends JpaRepository<Meal, Long> {

    @Query(value = "SELECT * FROM stayfit.meals WHERE id=:userId", nativeQuery = true)
    List<Meal> getMeals(@Param("userId") Long userId);

    List<Meal> findByOwner(User id);
}
