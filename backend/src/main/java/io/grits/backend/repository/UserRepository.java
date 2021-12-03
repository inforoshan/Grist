//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.repository;

import java.util.List;

import io.grits.backend.model.Customer;
import io.grits.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserName(String username);

  boolean existsByUserName(String username);

  List<User> findByCustomer(Customer customer);
}
