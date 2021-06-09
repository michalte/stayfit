package com.stayfit;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
public class AppController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ProductsRepo productsRepo;
    @Autowired
    private MealsRepo mealsRepo;
    @Autowired
    private MealsEatenRepo mealsEatenRepo;

    @PostMapping("/register")
    public ResponseEntity<String> processRegister(@RequestBody @Valid User user) throws Exception {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        user.setFirstName(user.getFirstName().substring(0, 1).toUpperCase() + user.getFirstName().substring(1).toLowerCase());
        user.setLastName(user.getLastName().substring(0, 1).toUpperCase() + user.getLastName().substring(1).toLowerCase());

        if (Utils.validate(user.getEmail())) {
            userRepo.save(user);
            return new ResponseEntity<>("Zostałeś zarejestrowany", HttpStatus.OK);
        }
        return new ResponseEntity<>("Niepoprawny format adresu email", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/logIn")
    public ResponseEntity<User> logIn(@RequestBody UserCredentials userCredentials) {
        return new ResponseEntity<>(userRepo.findByEmail(userCredentials.getUsername()),  HttpStatus.OK);
    }

    @GetMapping("/products")
    public List<Product> returnAllTheProducts() {
        return productsRepo.findAll();
    }

    @GetMapping("/productCategories")
    public List<String> returnCategories() {
        return productsRepo.getCategories();
    }

    @PostMapping("/addMeal")
    public Meal saveMeal(@RequestBody Meal meal) {
        Meal newMeal = new Meal();
        newMeal.setName(meal.getName());
        newMeal.setDate(meal.getDate());
        newMeal.setOwner(userRepo.findById(meal.getOwner().getId()).get());
        newMeal.setProductList(new ArrayList<MealProduct>());
        newMeal.setActive(true);
        newMeal.getProductList().addAll((meal.getProductList()
                .stream()
                .map(mealProduct -> {
                    Product product = productsRepo.findByProductId(mealProduct.getProduct().productId);
                    MealProduct newMealProduct = new MealProduct();
                    newMealProduct.setProduct(product);
                    newMealProduct.setMeal(newMeal);
                    newMealProduct.setProductWeight(mealProduct.getProductWeight());
                    return newMealProduct;
                })
                .collect(Collectors.toList())
        ));
        return mealsRepo.save(newMeal);
    }
/*    @GetMapping("/myMeals")
    public List<Meal> returnMeals(@RequestParam Long userId){
      return mealsRepo.getMeals(userId);
    }*/
    @GetMapping("/myMeals")
    public List<Meal> returnMeals(@RequestParam Long userId){
        List<Meal> fullList = mealsRepo.findByOwner(userRepo.findById(userId).get());
        fullList = fullList.stream().filter(o -> o.active).collect(Collectors.toList());
        return fullList;
}

    @GetMapping("/logout")
    public ResponseEntity logOut(HttpSession session) {
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }
    @PostMapping("/eatMeal")
    public MealEaten eatenMeal (@RequestBody MealEaten mealEaten){
        MealEaten newMealEaten = new MealEaten();
        newMealEaten.setDate(mealEaten.getDate());
        newMealEaten.setOwner(userRepo.findById(mealEaten.getOwner().getId()).get());
        newMealEaten.setMeal(mealsRepo.findById(mealEaten.getMeal().getMealId()).get());
        newMealEaten.setActive(true);

        return mealsEatenRepo.save(newMealEaten);
    }

    @PutMapping("/deleteMeal")
    public Meal deleteMeal(@RequestBody Meal meal){
        Meal newMeal = mealsRepo.findById(meal.getMealId()).get();
        newMeal.setActive(false);
        return mealsRepo.save(newMeal);
    }

    @GetMapping("/myMealsHistory")
    public List<MealEaten> returnMealsHistory(@RequestParam Long userId){
        List<MealEaten> fullList = mealsEatenRepo.findByOwner(userRepo.findById(userId).get());
        fullList = fullList.stream().filter(o -> o.active).collect(Collectors.toList());
        return fullList;
    }
//    @GetMapping("/myBMI")
//    public User returnBMI(@RequestParam Long userId){
//        User userBMI = userRepo.findById(userId).get();
//        userBMI.getUserBMI();
//        return userBMI;
//    }

    @PutMapping("/deleteEatenMeal")
    public MealEaten deleteEatenMeal(@RequestBody MealEaten mealEaten){
        MealEaten newMealEaten = mealsEatenRepo.findById(mealEaten.getMealEatenId()).get();
        newMealEaten.setActive(false);
        return mealsEatenRepo.save(newMealEaten);
    }

    @PutMapping("/updateUserBmi")
    public User updateUserBmi(@RequestBody BmiInput bmiInput){
        User updatedUser = userRepo.findById(bmiInput.getUserId()).get();
        updatedUser.setUserBMI(bmiInput.getUserBmi());
        return userRepo.save(updatedUser);
    }
}