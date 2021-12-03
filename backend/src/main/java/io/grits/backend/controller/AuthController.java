//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.controller;

import io.grits.backend.model.AuthRequest;
import io.grits.backend.model.User;
import io.grits.backend.repository.CustomerRepository;
import io.grits.backend.repository.CustomerTypeRepository;
import io.grits.backend.repository.UserRepository;
import io.grits.backend.repository.UserRoleRepository;
import io.grits.backend.request.SignUpRequest;
import io.grits.backend.response.JwtResponse;
import io.grits.backend.service.CustomUserDetailsService;
import io.grits.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/auth" })
public class AuthController
{
  @Autowired
  private JwtUtil jwtUtil;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private CustomerRepository customerRepository;
  @Autowired
  private UserRoleRepository userRoleRepository;
  @Autowired
  private CustomerTypeRepository customerTypeRepository;
  @Autowired
  private CustomUserDetailsService customUserDetailsService;

  public AuthController()
  {
  }

  @PostMapping({ "/signin" })
  public ResponseEntity<?> login(@RequestBody AuthRequest authRequest)
  {
    try
    {
      Authentication authentication = this.authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = this.jwtUtil.generateToken(authRequest.getUserName());
      User user = this.userRepository.findByUserName(authRequest.getUserName());
      return ResponseEntity
        .ok(new JwtResponse(jwt,
                            user.getUserName(),
                            user.getUserId(),
                            "Grits",
                            user.getUserRole().getRoleName(),
                            user.getCustomer() == null ? null : user.getCustomer().getCustomerType().getTypeName(),
                            user.getCustomer() != null ? user.getCustomer().getCustomerId() : null));
    }
    catch (AuthenticationException var5)
    {
      return ResponseEntity.badRequest().body("username/password incorrect");
    }
  }

  @PostMapping({ "/singup" })
  public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest)
  {
    if (this.userRepository.existsByUserName(signUpRequest.getUserName()))
    {
      return ResponseEntity.badRequest().body("Error: User name is already taken!");
    }
    else if (this.customerRepository.existsByCustomerName(signUpRequest.getCustomerName()))
    {
      return ResponseEntity.badRequest().body("Error: Customer name is already taken");
    }
    else
    {
      this.customUserDetailsService.saveCustomer(signUpRequest);
      return ResponseEntity.ok("Success: Successfully registered");
    }
  }
}
