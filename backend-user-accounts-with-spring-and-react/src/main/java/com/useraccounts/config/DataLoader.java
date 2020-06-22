package com.useraccounts.config;

import com.useraccounts.domain.User;
import com.useraccounts.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void run(ApplicationArguments args) {

        if (userRepository.findAll().size() == 0) {

            List<User> initialUsers = new ArrayList<>();

            initialUsers.add(User.builder()
                    .firstName("Albert")
                    .lastName("Einstein")
                    .email("einstrin@relativity.com")
                    .date(LocalDate.of(1879, Month.MARCH, 14))
                    .build());

            initialUsers.add(User.builder()
                    .firstName("Nikola")
                    .lastName("Tesla")
                    .email("tesla@alternating.com")
                    .date(LocalDate.of(1856, Month.JULY, 10))
                    .build());

            initialUsers.add(User.builder()
                    .firstName("Steve")
                    .lastName("Jobs")
                    .email("jobs@icloud.com")
                    .date(LocalDate.of(1955, Month.FEBRUARY, 24))
                    .build());

            initialUsers.add(User.builder()
                    .firstName("Elon")
                    .lastName("Musk")
                    .email("musk@tesla.com")
                    .date(LocalDate.of(1971, Month.JUNE, 28))
                    .build());

            initialUsers.add(User.builder()
                    .firstName("Mark")
                    .lastName("Zuckerberg")
                    .email("zuckerber@fb.com")
                    .date(LocalDate.of(1984, Month.MAY, 14))
                    .build());

            initialUsers.add(User.builder()
                    .firstName("James")
                    .lastName("Gosling")
                    .email("gosling@java.com")
                    .date(LocalDate.of(1955, Month.MAY, 19))
                    .build());

            initialUsers.add(User.builder()
                    .firstName("Linus")
                    .lastName("Torvalds")
                    .email("torvalds@linux.com")
                    .date(LocalDate.of(1969, Month.DECEMBER, 28))
                    .build());

            initialUsers.add(User.builder()
                    .firstName("Jack")
                    .lastName("Ma")
                    .email("ma@alibaba.com")
                    .date(LocalDate.of(1964, Month.SEPTEMBER, 10))
                    .build());

            userRepository.saveAll(initialUsers);
        }
    }
}
