//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.service;

import io.grits.backend.model.Customer;
import io.grits.backend.model.CustomerType;
import io.grits.backend.model.User;
import io.grits.backend.model.UserRole;
import io.grits.backend.repository.CustomerRepository;
import io.grits.backend.repository.CustomerTypeRepository;
import io.grits.backend.repository.UserRepository;
import io.grits.backend.repository.UserRoleRepository;
import io.grits.backend.request.SignUpRequest;
import java.util.ArrayList;
import java.util.Date;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private CustomerRepository customerRepository;
  @Autowired
  private CustomerTypeRepository customerTypeRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private UserRoleRepository userRoleRepository;

  public CustomUserDetailsService() {
  }

  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.userRepository.findByUserName(username);
    return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), new ArrayList());
  }

  @Transactional
  public void saveCustomer(SignUpRequest signUpRequest) {
    Customer customer = new Customer();
    customer.setCatagory(signUpRequest.getCatagory());
    customer.setCustomerName(signUpRequest.getCustomerName());
    customer.setLocation("location");
    customer.setAddress(signUpRequest.getAddress());
    customer.setCustomerType(this.customerTypeRepository.getOne(Long.parseLong(signUpRequest.getCustomerType())));
    customer.setContact(String.valueOf(signUpRequest.getContact()));
    customer.setBackAccountNumber("4563763289672341");
    customer.setBackBranch("colombo");
    customer.setBackName("BOC");
    customer.setCreatedDate(new Date());
    this.customerRepository.save(customer);
    User user = new User();
    user.setUserName(signUpRequest.getUserName());
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(this.passwordEncoder.encode(signUpRequest.getPassword()));
    user.setCustomer(customer);
    user.setUserRole(this.userRoleRepository.getOne(2L));
    user.setActive(true);
    user.setCreatedDate(new Date());
    this.userRepository.save(user);
  }
}
