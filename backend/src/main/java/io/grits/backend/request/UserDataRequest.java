package io.grits.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDataRequest
{
  private Long customerId;
  private Long roleId;
  private Long userId;
  private String userName;
  private String password;
  private String email;
}
