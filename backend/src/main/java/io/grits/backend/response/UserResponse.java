package io.grits.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse
{
  private Long customerId;
  private Long roleId;
  private Long userId;
  private String userName;
  private String password;
  private String email;
}
