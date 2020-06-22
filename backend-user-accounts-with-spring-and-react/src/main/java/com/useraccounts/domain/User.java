package com.useraccounts.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Positive
    private Long id;

    @NotBlank
    @Size(min = 2, max = 40, message = "First Name must be between 2 and 40 characters")
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 40, message = "Last Name must be between 2 and 40 characters")
    private String lastName;

    @Column(unique = true)
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}$", message = "Invalid email address pattern")
    @Size(min = 6, max = 30, message = "Email must be between 6 and 30 characters")
    @NotBlank
    private String email;

    @NotNull
    @PastOrPresent(message = "Date of birth should not be in the future")
    private LocalDate date;
}