package com.stayfit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductsRepo extends JpaRepository<Product, Long>{

    @Query(value = "SELECT DISTINCT grupa FROM nutritions", nativeQuery = true)
    List<String> getCategories();

    Product findByProductId(Long id);

}
