package io.grits.backend.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.grits.backend.model.User;
import io.grits.backend.repository.CustomerRepository;
import io.grits.backend.repository.UserRepository;
import io.grits.backend.repository.UserRoleRepository;
import io.grits.backend.request.UserDataRequest;
import io.grits.backend.response.UserResponse;

@Service
public class UserService
{

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserRoleRepository userRoleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private CustomerRepository customerRepository;

  public void save(UserDataRequest userDataRequest)
  {
    User user = new User();
    user.setUserRole(userRoleRepository.getOne(userDataRequest.getRoleId()));
    user.setUserName(userDataRequest.getUserName());
    user.setPassword(passwordEncoder.encode(userDataRequest.getPassword()));
    user.setEmail(userDataRequest.getEmail());
    user.setCustomer(customerRepository.getOne(userDataRequest.getCustomerId()));
    user.setCreatedDate(new Date());
    user.setActive(true);

    userRepository.save(user);
  }

  public void update(UserDataRequest userDataRequest)
  {
    User oldUser = userRepository.getOne(userDataRequest.getUserId());
    oldUser.setUserRole(userRoleRepository.getOne(userDataRequest.getRoleId()));
    oldUser.setUserName(userDataRequest.getUserName());
    oldUser.setPassword(passwordEncoder.encode(userDataRequest.getPassword()));
    oldUser.setEmail(userDataRequest.getEmail());
    oldUser.setCustomer(customerRepository.getOne(userDataRequest.getCustomerId()));
    oldUser.setUpdatedDate(new Date());
    oldUser.setActive(true);
  }

  public List<UserResponse> getUserByCustomerId(Long customerId)
  {
    return userRepository.findByCustomer(customerRepository.getOne(customerId)).stream()
      .map(user -> new UserResponse(user.getCustomer().getCustomerId(),
                                    user.getUserRole().getRoleId(),
                                    user.getUserId(),
                                    user.getUserName(),
                                    user.getPassword(),
                                    user.getEmail()))
      .collect(Collectors.toList());
  }

  public UserResponse getUserById(Long userId)
  {
    User user = userRepository.getOne(userId);
    return new UserResponse(user.getCustomer().getCustomerId(),
                            user.getUserRole().getRoleId(),
                            user.getUserId(),
                            user.getUserName(),
                            user.getPassword(),
                            user.getEmail());
  }
}
