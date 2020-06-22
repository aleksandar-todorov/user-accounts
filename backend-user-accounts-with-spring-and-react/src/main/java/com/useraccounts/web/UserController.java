package com.useraccounts.web;

import com.useraccounts.domain.User;
import com.useraccounts.repository.UserRepository;
import com.useraccounts.service.UserService;
import javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllSortedUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id) throws NotFoundException {

        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new NotFoundException("id-" + id);
        }

        return user.get();
    }

    @DeleteMapping("/users/{id}")
    @Transactional
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {

        Long removedUsers = userRepository.removeById(id);

        if (removedUsers > 0) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/users/add")
    public ResponseEntity<Object> createUser(@RequestBody User user) {

        User createdUser = userRepository.save(user);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdUser.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable long id,
                                             @RequestBody User user) {

        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        user.setId(id);

        userRepository.save(user);

        return ResponseEntity.noContent().build();
    }
}