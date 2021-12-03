//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.controller;

import io.grits.backend.model.UserRole;
import io.grits.backend.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/userrole"})
public class UserRoleController {
  @Autowired
  private UserRoleRepository userRoleRepository;

  public UserRoleController() {
  }

  @PostMapping({"/"})
  public UserRole postUserRole(@RequestBody UserRole userRole) {
    return (UserRole)this.userRoleRepository.save(userRole);
  }
}
