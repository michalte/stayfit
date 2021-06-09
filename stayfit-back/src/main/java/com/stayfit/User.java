package com.stayfit;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 45)
    @Email(message = "Niepoprawny adres e-mail")
    @NotBlank
    @NotNull
    private String email;

    @Column(nullable = false, length = 64)
    @Size(min = 8, message = "Hasło musi zawierać co najmniej 8 znaków")
    @NotBlank
    private String password;

    @Column(name = "first_name", nullable = false, length = 20)
    @Size(max = 20, message = "Imię nie może zawierać więcej niż 20 znaków")
    @NotBlank(message = "Imię nie może być puste")
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 30)
    @Size(max = 30, message = "Nazwisko nie może zawierać więcej niż 30 znaków")
    @NotBlank(message = "Nazwisko nie może być puste")
    private String lastName;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    List<Meal> userMeals;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    List<MealEaten> userHistory;

    @Column(name = "userBMI")
    Double userBMI;

    public List<Meal> getUserMeals() {
        return userMeals;
    }

    public void setUserMeals(List<Meal> userMeals) {
        this.userMeals = userMeals;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Double getUserBMI() {
        return userBMI;
    }

    public void setUserBMI(Double userBMI) {
        this.userBMI = userBMI;
    }

    public User() {
    }

    public User(Long id, String email, String password, String firstName, String lastName, Double userBMI) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userBMI = userBMI;
    }
}
