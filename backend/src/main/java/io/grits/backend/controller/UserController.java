//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.controller;

import io.grits.backend.model.User;
import io.grits.backend.repository.UserRepository;
import io.grits.backend.request.UserDataRequest;
import io.grits.backend.response.UserResponse;
import io.grits.backend.service.UserService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/user" })
public class UserController
{
  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;

  public UserController()
  {
  }

  @PostMapping({ "/register" })
  public ResponseEntity<String> postUser(@RequestBody UserDataRequest user)
  {
    if(!userRepository.existsByUserName(user.getUserName()))
    {
      userService.save(user);
      return ResponseEntity.ok("Success !!!");
    }
    else
    {
      return ResponseEntity.ok("Fail !!!");
    }
  }

  @PutMapping({ "/update" })
  public ResponseEntity<String> putUser(@RequestBody UserDataRequest userDataRequest)
  {
    userService.update(userDataRequest);
    return ResponseEntity.ok("Success");
  }

  @GetMapping({ "/getUserByCustomerId" })
  public ResponseEntity<List<UserResponse>> getUserByCustomerId(@RequestParam("customerId") Long customerId)
  {
    return ResponseEntity.ok(userService.getUserByCustomerId(customerId));
  }

  @GetMapping({ "/getUserById" })
  public ResponseEntity<UserResponse> getUserById(@RequestParam("userId") Long userId)
  {
    return ResponseEntity.ok(userService.getUserById(userId));
  }

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteRawMaterial(@RequestParam("userId") Long userId)
  {
    userRepository.deleteById(userId);
    return ResponseEntity.ok("Success !!!");
  }
}
