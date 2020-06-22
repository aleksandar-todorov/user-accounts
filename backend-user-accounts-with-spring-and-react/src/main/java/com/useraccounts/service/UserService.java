package com.useraccounts.service;

import com.useraccounts.domain.User;
import com.useraccounts.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllSortedUsers() {
        List<User> users = userRepository.findAll();

        users.sort(Comparator.comparing(User::getFirstName)
        .thenComparing(User::getLastName));

        return users;
    }
}
