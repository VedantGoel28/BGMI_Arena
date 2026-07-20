package com.bgmi.platform.repository;

import com.bgmi.platform.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByMobileNumber(String mobileNumber);
    Optional<User> findByEmail(String email);
    boolean existsByMobileNumber(String mobileNumber);
    boolean existsByEmail(String email);
}
